/**
 * crypto-v2.js - CryptCat v2 authenticated encryption.
 * Isolated from the legacy .crypt3 OpenSSL-compatible engine.
 */
(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : globalThis;
  var textEncoder = new TextEncoder();
  var textDecoder = new TextDecoder();
  var MAGIC = strToBytes('CRYPTCAT');
  var VERSION = 2;
  var PREFIX_LEN = 14;
  var MAX_HEADER_LEN = 65536;
  var MAX_KDF_MEMLIMIT = 256 * 1024 * 1024;
  var DEFAULT_ARGON2_OPSLIMIT = 3;
  var DEFAULT_ARGON2_MEMLIMIT = 32 * 1024 * 1024;
  var DEFAULT_SCRYPT_OPSLIMIT = 524288;
  var DEFAULT_SCRYPT_MEMLIMIT = 16 * 1024 * 1024;

  function strToBytes(s) {
    return textEncoder.encode(s);
  }

  function bytesToStr(bytes) {
    return textDecoder.decode(bytes);
  }

  function concat(parts) {
    var len = 0;
    for (var i = 0; i < parts.length; i++) len += parts[i].length;
    var out = new Uint8Array(len);
    var off = 0;
    for (var j = 0; j < parts.length; j++) {
      out.set(parts[j], off);
      off += parts[j].length;
    }
    return out;
  }

  function toBytes(data) {
    if (data instanceof Uint8Array) return data;
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    return new Uint8Array(data || []);
  }

  function randomBytes(len) {
    var out = new Uint8Array(len);
    var sodium = root.sodium || root.libsodium;
    if (sodium && typeof sodium.randombytes_buf === 'function') {
      return sodium.randombytes_buf(len, 'uint8array');
    }
    var c = root.crypto || root.msCrypto;
    if (!c || typeof c.getRandomValues !== 'function') {
      throw new Error('Secure random generator unavailable.');
    }
    c.getRandomValues(out);
    return out;
  }

  function b64(bytes) {
    bytes = toBytes(bytes);
    var s = '';
    for (var i = 0; i < bytes.length; i += 0x8000) {
      s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    if (typeof btoa === 'function') return btoa(s);
    return Buffer.from(bytes).toString('base64');
  }

  function fromB64(s) {
    var bin = typeof atob === 'function' ? atob(s) : Buffer.from(s, 'base64').toString('binary');
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 0xff;
    return out;
  }

  function writeU32BE(out, off, value) {
    out[off] = (value >>> 24) & 0xff;
    out[off + 1] = (value >>> 16) & 0xff;
    out[off + 2] = (value >>> 8) & 0xff;
    out[off + 3] = value & 0xff;
  }

  function readU32BE(bytes, off) {
    return ((bytes[off] << 24) | (bytes[off + 1] << 16) | (bytes[off + 2] << 8) | bytes[off + 3]) >>> 0;
  }

  function isV2(data) {
    var bytes = toBytes(data);
    if (bytes.length < PREFIX_LEN) return false;
    for (var i = 0; i < MAGIC.length; i++) {
      if (bytes[i] !== MAGIC[i]) return false;
    }
    return bytes[8] === VERSION;
  }

  function operationError(message) {
    var err = new Error(message || 'Decryption failed: incorrect password or corrupted file.');
    err.name = 'OperationError';
    return err;
  }

  async function sodiumReady() {
    var sodium = root.sodium || root.libsodium;
    if (!sodium) throw new Error('libsodium is unavailable.');
    if (sodium.ready && typeof sodium.ready.then === 'function') await sodium.ready;
    return sodium;
  }

  function validateKdfParams(kdf) {
    if (!kdf || !kdf.id) throw new Error('Missing v2 KDF parameters.');
    if (kdf.memlimit && kdf.memlimit > MAX_KDF_MEMLIMIT) {
      throw new Error('Unsupported KDF memory cost.');
    }
  }

  async function deriveKey(password, kdf) {
    validateKdfParams(kdf);
    var sodium = await sodiumReady();
    var salt = fromB64(kdf.salt);
    var keyLen = kdf.keyBytes || 32;

    if (kdf.id === 'argon2id') {
      return sodium.crypto_pwhash(
        keyLen,
        password,
        salt,
        kdf.opslimit || DEFAULT_ARGON2_OPSLIMIT,
        kdf.memlimit || DEFAULT_ARGON2_MEMLIMIT,
        sodium.crypto_pwhash_ALG_ARGON2ID13,
        'uint8array'
      );
    }

    if (kdf.id === 'scrypt') {
      return sodium.crypto_pwhash_scryptsalsa208sha256(
        keyLen,
        password,
        salt,
        kdf.opslimit || DEFAULT_SCRYPT_OPSLIMIT,
        kdf.memlimit || DEFAULT_SCRYPT_MEMLIMIT,
        'uint8array'
      );
    }

    throw new Error('Unsupported v2 KDF: ' + kdf.id);
  }

  function buildAad(header) {
    var headerBytes = strToBytes(JSON.stringify(header));
    if (headerBytes.length > MAX_HEADER_LEN) throw new Error('v2 header too large.');
    var prefix = new Uint8Array(PREFIX_LEN);
    prefix.set(MAGIC, 0);
    prefix[8] = VERSION;
    prefix[9] = 0;
    writeU32BE(prefix, 10, headerBytes.length);
    return concat([prefix, headerBytes]);
  }

  function parseContainer(data) {
    var bytes = toBytes(data);
    if (!isV2(bytes)) throw new Error('Not a CryptCat v2 file.');
    var headerLen = readU32BE(bytes, 10);
    if (headerLen <= 0 || headerLen > MAX_HEADER_LEN || PREFIX_LEN + headerLen > bytes.length) {
      throw new Error('Invalid CryptCat v2 header.');
    }
    var aadLen = PREFIX_LEN + headerLen;
    var header = JSON.parse(bytesToStr(bytes.slice(PREFIX_LEN, aadLen)));
    if (!header || header.format !== 'cryptcat-v2' || header.version !== VERSION) {
      throw new Error('Unsupported CryptCat v2 file.');
    }
    return {
      header: header,
      aad: bytes.slice(0, aadLen),
      payload: bytes.slice(aadLen)
    };
  }

  async function encryptAesGcm(plain, key, nonce, aad) {
    var c = root.crypto || root.msCrypto;
    if (!c || !c.subtle) throw new Error('Web Crypto AES-GCM unavailable.');
    var cryptoKey = await c.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt']);
    var out = await c.subtle.encrypt(
      { name: 'AES-GCM', iv: nonce, additionalData: aad, tagLength: 128 },
      cryptoKey,
      plain
    );
    return new Uint8Array(out);
  }

  async function decryptAesGcm(payload, key, nonce, aad) {
    var c = root.crypto || root.msCrypto;
    if (!c || !c.subtle) throw new Error('Web Crypto AES-GCM unavailable.');
    var cryptoKey = await c.subtle.importKey('raw', key, { name: 'AES-GCM' }, false, ['decrypt']);
    var out = await c.subtle.decrypt(
      { name: 'AES-GCM', iv: nonce, additionalData: aad, tagLength: 128 },
      cryptoKey,
      payload
    );
    return new Uint8Array(out);
  }

  async function encrypt(plainData, password, options) {
    options = options || {};
    var sodium = await sodiumReady();
    var plain = toBytes(plainData);
    var kdfId = options.kdf || 'argon2id';
    var cipherId = options.cipher || 'xchacha20poly1305';
    var kdfParams = options.kdfParams || {};
    var saltLen = kdfId === 'scrypt'
      ? sodium.crypto_pwhash_scryptsalsa208sha256_SALTBYTES
      : sodium.crypto_pwhash_SALTBYTES;
    var nonceLen = cipherId === 'aes-256-gcm'
      ? 12
      : sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES;

    var kdf = {
      id: kdfId,
      keyBytes: 32,
      salt: b64(randomBytes(saltLen))
    };
    if (kdfId === 'argon2id') {
      kdf.opslimit = kdfParams.opslimit || DEFAULT_ARGON2_OPSLIMIT;
      kdf.memlimit = kdfParams.memlimit || DEFAULT_ARGON2_MEMLIMIT;
    } else if (kdfId === 'scrypt') {
      kdf.opslimit = kdfParams.opslimit || DEFAULT_SCRYPT_OPSLIMIT;
      kdf.memlimit = kdfParams.memlimit || DEFAULT_SCRYPT_MEMLIMIT;
    } else {
      throw new Error('Unsupported v2 KDF: ' + kdfId);
    }

    var nonce = randomBytes(nonceLen);
    var header = {
      format: 'cryptcat-v2',
      version: VERSION,
      kdf: kdf,
      cipher: {
        id: cipherId,
        nonce: b64(nonce),
        tagBytes: 16
      },
      payload: {
        encoding: 'gzip-tar'
      }
    };
    var aad = buildAad(header);
    var key = await deriveKey(password, kdf);
    var payload;
    try {
      if (cipherId === 'xchacha20poly1305') {
        payload = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(plain, aad, null, nonce, key, 'uint8array');
      } else if (cipherId === 'aes-256-gcm') {
        payload = await encryptAesGcm(plain, key, nonce, aad);
      } else {
        throw new Error('Unsupported v2 cipher: ' + cipherId);
      }
    } finally {
      if (key && key.fill) key.fill(0);
    }
    return concat([aad, payload]);
  }

  async function decrypt(encData, password) {
    var sodium = await sodiumReady();
    var parsed = parseContainer(encData);
    var header = parsed.header;
    var nonce = fromB64(header.cipher && header.cipher.nonce);
    var key = await deriveKey(password, header.kdf);
    try {
      if (header.cipher.id === 'xchacha20poly1305') {
        return sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(null, parsed.payload, parsed.aad, nonce, key, 'uint8array');
      }
      if (header.cipher.id === 'aes-256-gcm') {
        return await decryptAesGcm(parsed.payload, key, nonce, parsed.aad);
      }
      throw new Error('Unsupported v2 cipher: ' + header.cipher.id);
    } catch (e) {
      throw operationError();
    } finally {
      if (key && key.fill) key.fill(0);
    }
  }

  async function isAvailable() {
    var sodium = await sodiumReady();
    return !!(sodium.crypto_pwhash && sodium.crypto_aead_xchacha20poly1305_ietf_encrypt);
  }

  root.CryptCatV2 = {
    isV2: isV2,
    parseContainer: parseContainer,
    encrypt: encrypt,
    decrypt: decrypt,
    isAvailable: isAvailable
  };
})();
