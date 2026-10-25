#!/usr/bin/env node
/**
 * CryptCat crypto regression test.
 * Covers legacy .crypt3 and CryptCat v2 containers without using network.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import crypto from 'crypto';
import zlib from 'zlib';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import sodium from 'libsodium-wrappers-sumo';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function arrayBufferOf(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

function nodeSubtle() {
  return {
    digest: async (alg, data) => {
      const name = String(alg).toLowerCase().replace('-', '');
      const h = crypto.createHash(name);
      h.update(Buffer.from(data));
      return arrayBufferOf(h.digest());
    },
    importKey: async (_fmt, key, alg) => ({ raw: Buffer.from(key), alg }),
    encrypt: async (params, key, data) => {
      if (params.name === 'AES-CBC') {
        const c = crypto.createCipheriv('aes-256-cbc', key.raw, Buffer.from(params.iv));
        return arrayBufferOf(Buffer.concat([c.update(Buffer.from(data)), c.final()]));
      }
      if (params.name === 'AES-GCM') {
        const c = crypto.createCipheriv('aes-256-gcm', key.raw, Buffer.from(params.iv));
        if (params.additionalData) c.setAAD(Buffer.from(params.additionalData));
        const body = Buffer.concat([c.update(Buffer.from(data)), c.final()]);
        return arrayBufferOf(Buffer.concat([body, c.getAuthTag()]));
      }
      throw new Error('unsupported encrypt algorithm: ' + params.name);
    },
    decrypt: async (params, key, data) => {
      if (params.name === 'AES-CBC') {
        const d = crypto.createDecipheriv('aes-256-cbc', key.raw, Buffer.from(params.iv));
        return arrayBufferOf(Buffer.concat([d.update(Buffer.from(data)), d.final()]));
      }
      if (params.name === 'AES-GCM') {
        const input = Buffer.from(data);
        const d = crypto.createDecipheriv('aes-256-gcm', key.raw, Buffer.from(params.iv));
        if (params.additionalData) d.setAAD(Buffer.from(params.additionalData));
        d.setAuthTag(input.subarray(input.length - 16));
        return arrayBufferOf(Buffer.concat([d.update(input.subarray(0, input.length - 16)), d.final()]));
      }
      throw new Error('unsupported decrypt algorithm: ' + params.name);
    }
  };
}

async function loadCryptoStack() {
  await sodium.ready;
  const ctx = {
    window: {},
    libsodium: sodium,
    crypto: {
      subtle: nodeSubtle(),
      getRandomValues: (arr) => { crypto.randomFillSync(arr); return arr; }
    },
    btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
    atob: (s) => Buffer.from(s, 'base64').toString('binary'),
    TextEncoder: globalThis.TextEncoder,
    TextDecoder: globalThis.TextDecoder,
    Uint8Array,
    ArrayBuffer,
    DataView,
    Blob: class Blob {
      constructor(parts) { this._parts = parts; }
      arrayBuffer() {
        const buf = Buffer.concat(this._parts.map(p => Buffer.from(p)));
        return Promise.resolve(arrayBufferOf(buf));
      }
    }
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const rel of ['www/js/crypto.js', 'www/js/crypto-v2.js', 'www/js/crypto-router.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel });
  }
  return {
    CE: ctx.CryptEngine,
    V2: ctx.CryptCatV2,
    Router: ctx.CryptoRouter
  };
}

async function compressGzipNode(data) {
  return new Uint8Array(await gzip(Buffer.from(data)));
}

async function decompressGzipNode(data) {
  return new Uint8Array(await gunzip(Buffer.from(data)));
}

async function assertPayloadRoundtrip(CE, encryptedBytes, password, expected, fileName, decryptor) {
  const dec = new Uint8Array(await decryptor(encryptedBytes, password));
  const decomp = await decompressGzipNode(dec);
  const files = CE.parseTar(decomp);
  if (files.length !== 1) throw new Error('expected 1 file, got ' + files.length);
  if (files[0].name !== fileName) throw new Error('filename mismatch: ' + files[0].name);
  const outBuf = Buffer.from(await files[0].data.arrayBuffer());
  if (!outBuf.equals(Buffer.from(expected))) throw new Error('roundtrip bytes mismatch');
}

async function expectWrongPasswordFails(label, fn) {
  let ok = false;
  try {
    await fn();
    ok = true;
  } catch (e) {
    if (e.name !== 'OperationError') throw e;
  }
  if (ok) throw new Error(label + ' accepted wrong password');
}

async function main() {
  const { CE, V2, Router } = await loadCryptoStack();
  const password = 'TestPass123!';
  const original = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 1, 2, 3, 4, 5]);
  const fileName = 'test-image.png';
  const tar = CE.createTar(fileName, original);
  const gz = await compressGzipNode(tar);
  const fastArgon = { kdf: 'argon2id', kdfParams: { opslimit: 2, memlimit: 16 * 1024 * 1024 } };

  console.log('1. legacy .crypt3 roundtrip...');
  const legacy = await CE.encrypt(gz, password);
  if (Router.detectFormat(legacy) !== 'v1') throw new Error('legacy detect failed');
  await assertPayloadRoundtrip(CE, legacy, password, original, fileName, (data, pwd) => CE.decrypt(data, pwd));
  await expectWrongPasswordFails('legacy', () => CE.decrypt(legacy, 'wrong'));

  console.log('2. router decrypts legacy...');
  await assertPayloadRoundtrip(CE, legacy, password, original, fileName, async (data, pwd) => {
    const result = await Router.decrypt(data, pwd);
    if (result.format !== 'v1') throw new Error('router legacy format mismatch');
    return result.bytes;
  });

  console.log('3. v2 Argon2id + XChaCha20-Poly1305 roundtrip...');
  const v2x = await V2.encrypt(gz, password, fastArgon);
  if (Router.detectFormat(v2x) !== 'v2') throw new Error('v2 detect failed');
  await assertPayloadRoundtrip(CE, v2x, password, original, fileName, async (data, pwd) => {
    const result = await Router.decrypt(data, pwd);
    if (result.format !== 'v2') throw new Error('router v2 format mismatch');
    return result.bytes;
  });
  await expectWrongPasswordFails('v2 xchacha', () => V2.decrypt(v2x, 'wrong'));

  console.log('4. v2 Argon2id + AES-256-GCM roundtrip...');
  const v2g = await V2.encrypt(gz, password, { ...fastArgon, cipher: 'aes-256-gcm' });
  await assertPayloadRoundtrip(CE, v2g, password, original, fileName, (data, pwd) => V2.decrypt(data, pwd));

  console.log('5. v2 scrypt + AES-256-GCM roundtrip...');
  const v2s = await V2.encrypt(gz, password, { kdf: 'scrypt', cipher: 'aes-256-gcm' });
  await assertPayloadRoundtrip(CE, v2s, password, original, fileName, (data, pwd) => V2.decrypt(data, pwd));

  console.log('6. router default encryption uses v2...');
  const routed = await Router.encrypt(gz, password, { v2: fastArgon });
  if (routed.format !== 'v2' || routed.extension !== '.cryptcat') {
    throw new Error('router default did not produce v2 .cryptcat');
  }

  const kh = await CE.computeKeyHash(password);
  if (!/^[a-f0-9]{4}$/.test(kh)) throw new Error('bad legacy keyhash: ' + kh);

  console.log('\n✅ Crypto regression passed: legacy .crypt3 plus CryptCat v2 AEAD containers.');
}

main().catch((e) => {
  console.error('\n❌ Test failed:', e.message);
  process.exit(1);
});
