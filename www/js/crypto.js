/*
 * crypto.js – CryptEngine
 * Pure-JS cryptographic helpers for crypt3-app.
 * No external dependencies.
 */
(function () {
  'use strict';

  /* =========================================================================
   * 1. MD5  (RFC 1321 – pure JS, no Web Crypto)
   * Input : Uint8Array
   * Output: Uint8Array(16)
   * ======================================================================= */
  const S = [
    7,12,17,22, 7,12,17,22, 7,12,17,22, 7,12,17,22,
    5, 9,14,20, 5, 9,14,20, 5, 9,14,20, 5, 9,14,20,
    4,11,16,23, 4,11,16,23, 4,11,16,23, 4,11,16,23,
    6,10,15,21, 6,10,15,21, 6,10,15,21, 6,10,15,21
  ];

  const K = [
    0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,
    0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,
    0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,
    0x6b901122,0xfd987193,0xa679438e,0x49b40821,
    0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,
    0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,
    0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,
    0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,
    0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,
    0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,
    0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,
    0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,
    0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,
    0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,
    0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,
    0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391
  ];

  function leftRotate(x, c) {
    return (x << c) | (x >>> (32 - c));
  }

  function md5(input) {
    // input must be Uint8Array
    var msgLen = input.length;

    // Pre-processing: adding padding bits
    // message length in bits
    var bitLen = msgLen * 8;

    // append bit '1' (0x80) then zeros, then 64-bit length
    // new length must be ≡ 56 (mod 64)
    var padLen = ((56 - (msgLen + 1) % 64) + 64) % 64;
    var totalLen = msgLen + 1 + padLen + 8;
    var msg = new Uint8Array(totalLen);
    msg.set(input);
    msg[msgLen] = 0x80;
    // append original length in bits as 64-bit little-endian
    var dv = new DataView(msg.buffer);
    // store low 32 bits
    dv.setUint32(totalLen - 8, bitLen >>> 0, true);
    // store high 32 bits (for messages < 512 MB this is 0)
    dv.setUint32(totalLen - 4, Math.floor(bitLen / 0x100000000) >>> 0, true);

    // Initialize hash values
    var a0 = 0x67452301;
    var b0 = 0xefcdab89;
    var c0 = 0x98badcfe;
    var d0 = 0x10325476;

    // Process each 512-bit (64-byte) chunk
    for (var offset = 0; offset < totalLen; offset += 64) {
      // Break chunk into sixteen 32-bit words M[j], little-endian
      var M = new Uint32Array(16);
      for (var j = 0; j < 16; j++) {
        M[j] = dv.getUint32(offset + j * 4, true);
      }

      var A = a0, B = b0, C = c0, D = d0;

      for (var i = 0; i < 64; i++) {
        var F, g;
        if (i < 16) {
          F = (B & C) | (~B & D);
          g = i;
        } else if (i < 32) {
          F = (D & B) | (~D & C);
          g = (5 * i + 1) % 16;
        } else if (i < 48) {
          F = B ^ C ^ D;
          g = (3 * i + 5) % 16;
        } else {
          F = C ^ (B | ~D);
          g = (7 * i) % 16;
        }

        F = (F + A + K[i] + M[g]) >>> 0;
        A = D;
        D = C;
        C = B;
        B = (B + leftRotate(F, S[i])) >>> 0;
      }

      a0 = (a0 + A) >>> 0;
      b0 = (b0 + B) >>> 0;
      c0 = (c0 + C) >>> 0;
      d0 = (d0 + D) >>> 0;
    }

    // Produce the 128-bit digest (little-endian)
    var digest = new Uint8Array(16);
    var out = new DataView(digest.buffer);
    out.setUint32(0, a0, true);
    out.setUint32(4, b0, true);
    out.setUint32(8, c0, true);
    out.setUint32(12, d0, true);
    return digest;
  }

  /* =========================================================================
   * 2. evpBytesToKey  (OpenSSL legacy KDF using MD5)
   *    D_i = MD5(D_{i-1} || password || salt)
   *    Returns { key: Uint8Array, iv: Uint8Array }
   * ======================================================================= */
  function evpBytesToKey(password, salt, keyLen, ivLen) {
    // password & salt are Uint8Array
    var totalLen = keyLen + ivLen;
    var derivedBytes = new Uint8Array(0);
    var dPrev = new Uint8Array(0);

    while (derivedBytes.length < totalLen) {
      // concat D_{i-1} || password || salt
      var toHash = new Uint8Array(dPrev.length + password.length + salt.length);
      toHash.set(dPrev, 0);
      toHash.set(password, dPrev.length);
      toHash.set(salt, dPrev.length + password.length);

      dPrev = md5(toHash);

      // append to derived key material
      var tmp = new Uint8Array(derivedBytes.length + dPrev.length);
      tmp.set(derivedBytes, 0);
      tmp.set(dPrev, derivedBytes.length);
      derivedBytes = tmp;
    }

    return {
      key: derivedBytes.slice(0, keyLen),
      iv:  derivedBytes.slice(keyLen, keyLen + ivLen)
    };
  }

  /* =========================================================================
   * 3. computeKeyHash(pwd)
   *    SHA-1 of (pwd + '\n'), return first 4 hex chars.
   * ======================================================================= */
  async function computeKeyHash(pwd) {
    var enc = new TextEncoder();
    var data = enc.encode(pwd + '\n');
    var hashBuf = await crypto.subtle.digest('SHA-1', data);
    var hashArr = new Uint8Array(hashBuf);
    var hex = '';
    for (var i = 0; i < hashArr.length; i++) {
      hex += ('0' + hashArr[i].toString(16)).slice(-2);
    }
    return hex.slice(0, 4);
  }

  /* =========================================================================
   * Helper: convert a string to Uint8Array (UTF-8)
   * ======================================================================= */
  function strToBytes(s) {
    return new TextEncoder().encode(s);
  }

  /* =========================================================================
   * 4. encrypt(fileData, password)
   *    AES-256-CBC, OpenSSL-compatible envelope.
   *    Returns Uint8Array: 'Salted__' + salt(8) + ciphertext
   * ======================================================================= */
  async function encrypt(fileData, password) {
    // fileData: Uint8Array,  password: string
    var salt = new Uint8Array(8);
    crypto.getRandomValues(salt);

    var pwdBytes = strToBytes(password);
    var derived = evpBytesToKey(pwdBytes, salt, 32, 16);

    var cryptoKey = await crypto.subtle.importKey(
      'raw', derived.key, { name: 'AES-CBC' }, false, ['encrypt']
    );

    var cipherBuf = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: derived.iv },
      cryptoKey,
      fileData
    );

    var cipherArr = new Uint8Array(cipherBuf);
    var header = strToBytes('Salted__');

    var result = new Uint8Array(header.length + salt.length + cipherArr.length);
    result.set(header, 0);
    result.set(salt, header.length);
    result.set(cipherArr, header.length + salt.length);
    return result;
  }

  /* =========================================================================
   * 5. decrypt(encData, password)
   *    Reverse of encrypt.  Returns ArrayBuffer of decrypted data.
   * ======================================================================= */
  async function decrypt(encData, password) {
    // encData: Uint8Array,  password: string
    // Verify 'Salted__' header
    var header = String.fromCharCode.apply(null, encData.slice(0, 8));
    if (header !== 'Salted__') {
      throw new Error('Invalid encrypted data: missing Salted__ header');
    }

    var salt = encData.slice(8, 16);
    var ciphertext = encData.slice(16);

    var pwdBytes = strToBytes(password);
    var derived = evpBytesToKey(pwdBytes, salt, 32, 16);

    var cryptoKey = await crypto.subtle.importKey(
      'raw', derived.key, { name: 'AES-CBC' }, false, ['decrypt']
    );

    try {
      var decrypted = await crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: derived.iv },
        cryptoKey,
        ciphertext
      );
      return decrypted;
    } catch (e) {
      var err = new Error('Decryption failed: incorrect password or corrupted file.');
      err.name = 'OperationError';
      throw err;
    }
  }

  /* =========================================================================
   * 6. compressGzip(data)
   *    data: Uint8Array  →  Uint8Array (gzip compressed)
   * ======================================================================= */
  async function compressGzip(data) {
    var cs = new CompressionStream('gzip');
    var writer = cs.writable.getWriter();
    writer.write(data);
    writer.close();

    var reader = cs.readable.getReader();
    var chunks = [];
    var totalLen = 0;
    while (true) {
      var result = await reader.read();
      if (result.done) break;
      chunks.push(result.value);
      totalLen += result.value.length;
    }

    var out = new Uint8Array(totalLen);
    var off = 0;
    for (var i = 0; i < chunks.length; i++) {
      out.set(chunks[i], off);
      off += chunks[i].length;
    }
    return out;
  }

  /* =========================================================================
   * 7. decompressGzip(data)
   *    data: Uint8Array  →  Uint8Array (decompressed)
   * ======================================================================= */
  async function decompressGzip(data) {
    var ds = new DecompressionStream('gzip');
    var writer = ds.writable.getWriter();
    writer.write(data);
    writer.close();

    var reader = ds.readable.getReader();
    var chunks = [];
    var totalLen = 0;
    while (true) {
      var result = await reader.read();
      if (result.done) break;
      chunks.push(result.value);
      totalLen += result.value.length;
    }

    var out = new Uint8Array(totalLen);
    var off = 0;
    for (var i = 0; i < chunks.length; i++) {
      out.set(chunks[i], off);
      off += chunks[i].length;
    }
    return out;
  }

  /* =========================================================================
   * 8. createTar(name, data)
   *    Create a minimal POSIX ustar tar archive for a single file.
   *    name : string (file name)
   *    data : Uint8Array (file content)
   *    Returns Uint8Array (complete tar archive)
   * ======================================================================= */
  function createTar(name, data) {
    var BLOCK = 512;

    // --- build 512-byte header ---
    var header = new Uint8Array(BLOCK);

    // Helper: write a string into header at offset, up to len bytes
    function writeStr(off, len, str) {
      for (var i = 0; i < len && i < str.length; i++) {
        header[off + i] = str.charCodeAt(i) & 0xFF;
      }
    }

    // Helper: write an octal string (null-terminated) at offset, field len
    function writeOctal(off, len, val) {
      var s = val.toString(8);
      // pad with leading zeros; last byte is NUL
      while (s.length < len - 1) s = '0' + s;
      s = s.slice(-(len - 1)); // truncate if too long
      writeStr(off, len - 1, s);
      header[off + len - 1] = 0; // NUL terminator
    }

    // name (0..99)
    writeStr(0, 100, name);

    // mode (100..107) = '0000644\0'
    writeStr(100, 8, '0000644\0');

    // uid (108..115) = '0000000\0'
    writeStr(108, 8, '0000000\0');

    // gid (116..123) = '0000000\0'
    writeStr(116, 8, '0000000\0');

    // size (124..135) – 12 bytes, octal, NUL terminated
    writeOctal(124, 12, data.length);

    // mtime (136..147) – 12 bytes, octal, current time
    var mtime = Math.floor(Date.now() / 1000);
    writeOctal(136, 12, mtime);

    // typeflag (156) = '0' (regular file)
    header[156] = 0x30; // ASCII '0'

    // magic (257..262) = 'ustar\0'
    writeStr(257, 6, 'ustar\0');

    // version (263..264) = '00'
    writeStr(263, 2, '00');

    // checksum (148..155) – computed over header with checksum field as spaces
    // First fill checksum field with spaces
    for (var ci = 148; ci < 156; ci++) {
      header[ci] = 0x20; // space
    }

    // Sum all bytes
    var chksum = 0;
    for (var si = 0; si < BLOCK; si++) {
      chksum += header[si];
    }

    // Write checksum as 6-digit zero-padded octal + NUL + space
    var chkStr = chksum.toString(8);
    while (chkStr.length < 6) chkStr = '0' + chkStr;
    writeStr(148, 6, chkStr);
    header[154] = 0;    // NUL
    header[155] = 0x20; // space

    // --- data blocks ---
    var dataBlocks = Math.ceil(data.length / BLOCK);
    var dataPadded = new Uint8Array(dataBlocks * BLOCK);
    dataPadded.set(data);

    // --- two trailing 512-byte zero blocks ---
    var trailer = new Uint8Array(BLOCK * 2);

    // Assemble archive
    var archive = new Uint8Array(BLOCK + dataPadded.length + trailer.length);
    archive.set(header, 0);
    archive.set(dataPadded, BLOCK);
    archive.set(trailer, BLOCK + dataPadded.length);

    return archive;
  }

  /* =========================================================================
   * 9. parseTar(data)
   *    Parse a tar archive (supports ustar, pax 'x', GNU long names 'L').
   *    Filters out macOS AppleDouble ._ files.
   *    data   : Uint8Array
   *    Returns: Array of { name: string, data: Blob }
   * ======================================================================= */
  function parseTar(data) {
    var BLOCK = 512;
    var offset = 0;
    var files = [];
    var paxName = null;   // extended name from pax header
    var gnuLongName = null; // long name from GNU 'L' header

    // Helper: read a NUL-terminated string from the buffer
    function readStr(off, len) {
      var end = off + len;
      var s = '';
      for (var i = off; i < end; i++) {
        if (data[i] === 0) break;
        s += String.fromCharCode(data[i]);
      }
      return s;
    }

    // Helper: parse an octal string
    function parseOctal(off, len) {
      var s = readStr(off, len).trim();
      if (s.length === 0) return 0;
      return parseInt(s, 8) || 0;
    }

    // Helper: check if a block is all zeros
    function isZeroBlock(off) {
      for (var i = off; i < off + BLOCK && i < data.length; i++) {
        if (data[i] !== 0) return false;
      }
      return true;
    }

    // Helper: parse pax extended header body to extract path
    function parsePaxBody(bodyBytes) {
      var body = '';
      for (var i = 0; i < bodyBytes.length; i++) {
        body += String.fromCharCode(bodyBytes[i]);
      }
      // Format: "<len> <key>=<value>\n" repeated
      var attrs = {};
      var pos = 0;
      while (pos < body.length) {
        var spaceIdx = body.indexOf(' ', pos);
        if (spaceIdx === -1) break;
        var recLen = parseInt(body.substring(pos, spaceIdx), 10);
        if (isNaN(recLen) || recLen <= 0) break;
        var record = body.substring(pos, pos + recLen);
        var eqIdx = record.indexOf('=');
        if (eqIdx !== -1) {
          var key = record.substring(record.indexOf(' ') + 1, eqIdx);
          var val = record.substring(eqIdx + 1);
          // remove trailing newline
          if (val.length > 0 && val[val.length - 1] === '\n') {
            val = val.slice(0, -1);
          }
          attrs[key] = val;
        }
        pos += recLen;
      }
      return attrs;
    }

    while (offset + BLOCK <= data.length) {
      // Check for end-of-archive (two zero blocks)
      if (isZeroBlock(offset)) {
        break;
      }

      // Read header fields
      var rawName  = readStr(offset, 100);
      var fileSize = parseOctal(offset + 124, 12);
      var typeFlag = String.fromCharCode(data[offset + 156]);
      var magic    = readStr(offset + 257, 6);
      var prefix   = '';

      // ustar prefix
      if (magic === 'ustar' || magic === 'ustar\0') {
        prefix = readStr(offset + 345, 155);
      }

      // Determine the effective file name
      var fileName;
      if (gnuLongName !== null) {
        fileName = gnuLongName;
        gnuLongName = null;
      } else if (paxName !== null) {
        fileName = paxName;
        paxName = null;
      } else {
        fileName = prefix ? prefix + '/' + rawName : rawName;
      }

      // Move past header
      offset += BLOCK;

      // Number of data blocks
      var dataBlocks = Math.ceil(fileSize / BLOCK);

      if (typeFlag === 'x' || typeFlag === 'g') {
        // Pax extended header
        if (offset + fileSize <= data.length) {
          var paxBytes = data.slice(offset, offset + fileSize);
          var paxAttrs = parsePaxBody(paxBytes);
          if (paxAttrs['path']) {
            paxName = paxAttrs['path'];
          }
        }
        offset += dataBlocks * BLOCK;
        continue;
      }

      if (typeFlag === 'L') {
        // GNU long name
        if (offset + fileSize <= data.length) {
          var nameBytes = data.slice(offset, offset + fileSize);
          // Strip trailing NUL
          var nm = '';
          for (var ni = 0; ni < nameBytes.length; ni++) {
            if (nameBytes[ni] === 0) break;
            nm += String.fromCharCode(nameBytes[ni]);
          }
          gnuLongName = nm;
        }
        offset += dataBlocks * BLOCK;
        continue;
      }

      // Only handle regular files (typeFlag '0' or '\0')
      if (typeFlag !== '0' && typeFlag !== '\0' && typeFlag !== '') {
        // Skip directories and other types
        offset += dataBlocks * BLOCK;
        continue;
      }

      // Extract file data
      var fileData = data.slice(offset, offset + fileSize);
      offset += dataBlocks * BLOCK;

      // Filter out macOS AppleDouble resource fork files
      var baseName = fileName.split('/').pop();
      if (baseName.indexOf('._') === 0) {
        continue;
      }

      // Skip entries with empty names or size 0 that look like dirs
      if (fileName === '' || fileName.endsWith('/')) {
        continue;
      }

      files.push({
        name: baseName,
        data: new Blob([fileData])
      });
    }

    return files;
  }

  /* =========================================================================
   * Export
   * ======================================================================= */
  window.CryptEngine = {
    md5:             md5,
    evpBytesToKey:   evpBytesToKey,
    computeKeyHash:  computeKeyHash,
    encrypt:         encrypt,
    decrypt:         decrypt,
    compressGzip:    compressGzip,
    decompressGzip:  decompressGzip,
    createTar:       createTar,
    parseTar:        parseTar
  };

})();
