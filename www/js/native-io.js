/**
 * native-io.js – Capacitor file delivery (iOS / Android)
 * Saves encrypted/decrypted output and opens the system share sheet.
 */
(function () {
  'use strict';

  var FSDirectory = Object.freeze({ Documents: 'DOCUMENTS', Cache: 'CACHE' });

  function isNative() {
    return typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform();
  }

  function getFilesystem() {
    var cap = window.Capacitor;
    if (!cap) return null;
    if (cap.Plugins && cap.Plugins.Filesystem && typeof cap.Plugins.Filesystem.writeFile === 'function') {
      return cap.Plugins.Filesystem;
    }
    if (cap.registerPlugin) {
      return cap.registerPlugin('Filesystem');
    }
    return null;
  }

  function getShare() {
    var cap = window.Capacitor;
    if (!cap || !cap.Plugins) return null;
    return cap.Plugins.Share || null;
  }

  function safeName(name) {
    var n = (name || 'file').replace(/[/\\?%*:|"<>]/g, '_').replace(/\s+/g, '_');
    return n.length > 180 ? n.slice(-180) : n;
  }

  function blobToBytes(blob) {
    if (blob instanceof Uint8Array) return Promise.resolve(blob);
    if (blob instanceof ArrayBuffer) return Promise.resolve(new Uint8Array(blob));
    if (blob instanceof Blob) {
      return blob.arrayBuffer().then(function (buf) { return new Uint8Array(buf); });
    }
    return Promise.resolve(new Uint8Array(blob));
  }

  function bytesToBase64(bytes) {
    var chunk = 0x8000;
    var binary = '';
    for (var i = 0; i < bytes.length; i += chunk) {
      var sub = bytes.subarray(i, Math.min(i + chunk, bytes.length));
      binary += String.fromCharCode.apply(null, sub);
    }
    return btoa(binary);
  }

  function writeFile(directory, path, bytes) {
    var Filesystem = getFilesystem();
    if (!Filesystem) {
      return Promise.reject(new Error('Filesystem plugin unavailable'));
    }
    return Filesystem.writeFile({
      path: path,
      data: bytesToBase64(bytes),
      directory: directory
    });
  }

  function deliverOnNative(name, data) {
    var fileName = safeName(name);
    return blobToBytes(data).then(function (bytes) {
      return writeFile(FSDirectory.Cache, fileName, bytes).then(function (result) {
        var Share = getShare();
        if (Share && result && result.uri) {
          return Share.share({ title: fileName, url: result.uri }).catch(function () {
            return result;
          });
        }
        return writeFile(FSDirectory.Documents, fileName, bytes);
      });
    });
  }

  function deliverOnWeb(name, data) {
    var blob = data instanceof Blob ? data : new Blob([data]);
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
    return Promise.resolve();
  }

  window.NativeIO = {
    isNative: isNative,
    safeName: safeName,
    deliver: function (name, data) {
      if (isNative()) return deliverOnNative(name, data);
      return deliverOnWeb(name, data);
    },
    saveToDocuments: function (name, data) {
      if (!isNative()) return deliverOnWeb(name, data);
      return blobToBytes(data).then(function (bytes) {
        return writeFile(FSDirectory.Documents, safeName(name), bytes);
      });
    }
  };
})();
