/**
 * crypto-router.js - Dispatches between legacy .crypt3 and CryptCat v2.
 */
(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : globalThis;
  var Legacy = root.CryptEngine;
  var V2 = root.CryptCatV2;

  function toBytes(data) {
    if (data instanceof Uint8Array) return data;
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    return new Uint8Array(data || []);
  }

  function startsWithAscii(bytes, text) {
    if (bytes.length < text.length) return false;
    for (var i = 0; i < text.length; i++) {
      if (bytes[i] !== text.charCodeAt(i)) return false;
    }
    return true;
  }

  function detectFormat(data) {
    var bytes = toBytes(data);
    if (V2 && V2.isV2(bytes)) return 'v2';
    if (startsWithAscii(bytes, 'Salted__')) return 'v1';
    return 'unknown';
  }

  async function encrypt(data, password, options) {
    options = options || {};
    if (options.format === 'v1') {
      return {
        format: 'v1',
        extension: '.crypt3',
        bytes: await Legacy.encrypt(data, password)
      };
    }
    if (!V2) {
      return {
        format: 'v1',
        extension: '.crypt3',
        fallback: true,
        bytes: await Legacy.encrypt(data, password)
      };
    }
    try {
      return {
        format: 'v2',
        extension: '.cryptcat',
        bytes: await V2.encrypt(data, password, options.v2 || {})
      };
    } catch (e) {
      if (options.allowLegacyFallback === false) throw e;
      return {
        format: 'v1',
        extension: '.crypt3',
        fallback: true,
        bytes: await Legacy.encrypt(data, password)
      };
    }
  }

  async function decrypt(data, password) {
    var bytes = toBytes(data);
    var format = detectFormat(bytes);
    if (format === 'v2') {
      return {
        format: 'v2',
        bytes: await V2.decrypt(bytes, password)
      };
    }
    if (format === 'v1') {
      return {
        format: 'v1',
        bytes: await Legacy.decrypt(bytes, password)
      };
    }
    var err = new Error('Unsupported encrypted file format.');
    err.name = 'OperationError';
    throw err;
  }

  root.CryptoRouter = {
    detectFormat: detectFormat,
    encrypt: encrypt,
    decrypt: decrypt
  };
})();
