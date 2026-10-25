// ============================================================
// Crypt3 App — Main Application Logic
// Works in both browser and Capacitor native environments
// ============================================================
(function() {
  'use strict';

  const isNative = typeof window.Capacitor !== 'undefined' && window.Capacitor.isNativePlatform();
  const platform = isNative ? window.Capacitor.getPlatform() : 'web';
  document.body.classList.add('platform-' + platform);

  const $ = id => document.getElementById(id);
  const dropZone = $('dropZone'), fileInput = $('fileInput'), fileInfo = $('fileInfo'),
        fileName = $('fileName'), fileSize = $('fileSize'), passwordEl = $('password'),
        togglePwd = $('togglePwd'), pwdVerify = $('pwdVerify'), confirmField = $('confirmField'),
        passwordConfirm = $('passwordConfirm'), pwdMatch = $('pwdMatch'),
        btnAction = $('btnAction'), btnText = $('btnText'), progressBar = $('progressBar'),
        progressFill = $('progressFill'), statusEl = $('status'), dropTitle = $('dropTitle'),
        dropHint = $('dropHint'), pwdLabel = $('pwdLabel'), btnModeDecrypt = $('btnModeDecrypt'),
        btnModeEncrypt = $('btnModeEncrypt'), mainCard = $('mainCard'), langSelect = $('langSelect'),
        saveActions = $('saveActions');

  const I18N = window.I18N;
  const Crypto = window.CryptEngine;
  const CryptoRouter = window.CryptoRouter;
  const NativeIO = window.NativeIO;
  const LOCALE_KEY = 'crypt3-locale';
  const LOCALE_SOURCE_KEY = 'crypt3-locale-source';
  const LEGACY_LOCALE_USER_KEY = 'crypt3-locale-user';
  const LOCALE_PREF_VERSION_KEY = 'crypt3-locale-pref-version';
  const LOCALE_PREF_VERSION = '2026-07-05-native-auto-locale';
  const EYE_OPEN_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/></svg>';
  const EYE_CLOSED_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.3 3.7 3.7 2.3l18 18-1.4 1.4-3.05-3.05A12.42 12.42 0 0 1 12 19.5C7 19.5 2.73 16.39 1 12c.8-2.04 2.18-3.78 3.92-5.05L2.3 3.7zm6.04 6.04A3.93 3.93 0 0 0 8 12c0 2.21 1.79 4 4 4 .82 0 1.58-.25 2.21-.66L12.8 13.93A2 2 0 0 1 10.07 11.2L8.34 9.74zM12 4.5c5 0 9.27 3.11 11 7.5a12.89 12.89 0 0 1-3.02 4.35l-2.84-2.84A5.98 5.98 0 0 0 10.5 6.68L8.32 4.5A12.07 12.07 0 0 1 12 4.5zm0 3.5a4 4 0 0 1 4 4c0 .31-.04.61-.1.89L11.11 8.1c.28-.06.58-.1.89-.1z" fill="currentColor"/></svg>';

  let mode = 'decrypt';
  let selectedFile = null;   // browser File object
  let fileKeyHash = null;
  let lastResult = null;     // {name: string, blob: Blob}

  async function init() {
    I18N.setLocale(await resolveStartupLocale());

    buildLangSelect();
    applyLocale();

    if (langSelect) {
      langSelect.addEventListener('change', e => {
        I18N.setLocale(e.target.value);
        storageSet(LOCALE_KEY, e.target.value);
        storageSet(LOCALE_SOURCE_KEY, 'manual');
        storageSet(LEGACY_LOCALE_USER_KEY, '1');
        storageSet(LOCALE_PREF_VERSION_KEY, LOCALE_PREF_VERSION);
        applyLocale();
        const filter = $('langFilter');
        if (filter) filter.value = '';
        resetLangOptions();
      });
    }

    setupLangFilter();

    if (!Crypto || !CryptoRouter) {
      showStatus(I18N.t('errorEngineLoad') || 'CryptEngine failed to load.', 'error');
      btnAction.disabled = true;
      return;
    }
    if (typeof CompressionStream === 'undefined' || typeof DecompressionStream === 'undefined') {
      showStatus(I18N.t('errorCompression') || 'Compression API unavailable.', 'error');
      btnAction.disabled = true;
      return;
    }

    btnModeDecrypt.addEventListener('click', () => setMode('decrypt'));
    btnModeEncrypt.addEventListener('click', () => setMode('encrypt'));

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', e => {
      if (e.target.files.length) handleFile(e.target.files[0]);
      e.target.value = '';
    });

    togglePwd.addEventListener('click', () => setPasswordVisible(passwordEl.type === 'password'));
    setPasswordVisible(false);
    passwordEl.addEventListener('input', () => { updateBtn(); verifyPwd(); checkConfirm(); });
    passwordConfirm.addEventListener('input', () => { updateBtn(); checkConfirm(); });

    btnAction.addEventListener('click', doAction);

    if ($('btnSaveFiles')) $('btnSaveFiles').addEventListener('click', saveToFiles);
    if ($('btnShare')) $('btnShare').addEventListener('click', shareResult);

    setMode('decrypt');
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore private storage errors */ }
  }

  async function resolveStartupLocale() {
    const detectedLocale = await I18N.detectAsync();
    const savedLocale = storageGet(LOCALE_KEY);
    const savedSource = storageGet(LOCALE_SOURCE_KEY);
    const savedVersion = storageGet(LOCALE_PREF_VERSION_KEY);

    if (savedSource === 'manual' &&
        savedVersion === LOCALE_PREF_VERSION &&
        savedLocale &&
        I18N.isKnownLocale(savedLocale)) {
      return savedLocale;
    }

    storageSet(LOCALE_KEY, detectedLocale);
    storageSet(LOCALE_SOURCE_KEY, 'auto');
    storageSet(LOCALE_PREF_VERSION_KEY, LOCALE_PREF_VERSION);
    return detectedLocale;
  }

  function buildLangSelect() {
    if (!langSelect) return;
    langSelect.innerHTML = '';
    const locales = I18N.getLocales();
    for (let i = 0; i < locales.length; i++) {
      const loc = locales[i];
      const opt = document.createElement('option');
      opt.value = loc.code;
      opt.textContent = loc.native;
      opt.dataset.search = (loc.native + ' ' + loc.english + ' ' + loc.code + ' ' + (loc.tags || []).join(' ')).toLowerCase();
      langSelect.appendChild(opt);
    }
    langSelect.value = I18N.getLocale();
  }

  function resetLangOptions() {
    if (!langSelect) return;
    langSelect.querySelectorAll('option').forEach(opt => { opt.hidden = false; });
  }

  function setupLangFilter() {
    const filter = $('langFilter');
    if (!filter || !langSelect) return;
    filter.placeholder = I18N.t('langSearch');
    filter.addEventListener('input', () => {
      const q = filter.value.trim().toLowerCase();
      let firstMatch = null;
      langSelect.querySelectorAll('option').forEach(opt => {
        const hay = opt.dataset.search || opt.textContent.toLowerCase();
        const show = !q || hay.indexOf(q) !== -1;
        opt.hidden = !show;
        if (show && !firstMatch) firstMatch = opt;
      });
      if (!firstMatch && q) langSelect.value = I18N.getLocale();
    });
  }

  function applyLocale() {
    const t = I18N.t.bind(I18N);
    const isRTL = I18N.rtlLocales.includes(I18N.getLocale());
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = I18N.getLocale();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.getAttribute('data-i18n'));
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = t(el.getAttribute('data-i18n-placeholder'));
      if (val) el.placeholder = val;
    });
    refreshModeLabels();
    const filter = $('langFilter');
    if (filter) filter.placeholder = I18N.t('langSearch');
    document.body.classList.add('locale-ready');
  }

  function setMode(m) {
    mode = m;
    selectedFile = null;
    fileKeyHash = null;
    lastResult = null;
    passwordEl.value = '';
    passwordConfirm.value = '';
    setPasswordVisible(false);
    dropZone.classList.remove('has-file');
    fileInfo.classList.remove('show');
    pwdVerify.classList.remove('show', 'match', 'mismatch');
    pwdMatch.classList.remove('show', 'ok', 'no');
    statusEl.classList.remove('show');
    progressBar.classList.remove('show');
    btnAction.classList.remove('loading');
    if (saveActions) saveActions.classList.remove('show');

    if (mode === 'decrypt') {
      btnModeDecrypt.className = 'mode-btn active-decrypt';
      btnModeEncrypt.className = 'mode-btn';
      mainCard.classList.remove('encrypt-mode');
      btnAction.className = 'btn-action decrypt-btn';
      confirmField.classList.remove('show');
      fileInput.accept = '.cryptcat,.crypt3,application/octet-stream';
    } else {
      btnModeEncrypt.className = 'mode-btn active-encrypt';
      btnModeDecrypt.className = 'mode-btn';
      mainCard.classList.add('encrypt-mode');
      btnAction.className = 'btn-action encrypt-btn';
      confirmField.classList.add('show');
      fileInput.accept = 'image/*,video/*,audio/*,.pdf,.txt,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx,*/*';
    }
    refreshModeLabels();
    updateBtn();
  }

  function refreshModeLabels() {
    const t = I18N.t.bind(I18N);
    if (mode === 'decrypt') {
      dropTitle.textContent = t('modeDecrypt');
      pwdLabel.textContent = '🔑 ' + t('pwdLabelDecrypt');
      btnText.textContent = '🔓 ' + t('btnDecrypt');
    } else {
      dropTitle.textContent = t('dropTitleEncrypt');
      pwdLabel.textContent = '🔑 ' + t('pwdLabelEncrypt');
      btnText.textContent = '🔒 ' + t('btnEncrypt');
    }
    dropHint.textContent = t('dropHint');
    passwordEl.placeholder = t('pwdPlaceholder');
    passwordConfirm.placeholder = t('confirmPlaceholder');
  }

  function resolveFileName(file) {
    let name = (file && file.name) ? file.name.trim() : '';
    if (!name && file && file.webkitRelativePath) {
      name = file.webkitRelativePath.split('/').pop();
    }
    if (!name) {
      const mime = (file && file.type) || '';
      if (mime.indexOf('image/') === 0) name = 'image.' + mime.split('/')[1].replace('jpeg', 'jpg');
      else if (mime.indexOf('video/') === 0) name = 'video.' + mime.split('/')[1];
      else if (mime.indexOf('audio/') === 0) name = 'audio.' + mime.split('/')[1];
      else name = 'file_' + Date.now();
    }
    return name;
  }

  function handleFile(file) {
    const t = I18N.t.bind(I18N);
    const name = resolveFileName(file);

    if (mode === 'decrypt' && !/\.(cryptcat|crypt3)$/i.test(name)) {
      showStatus(t('modeDecrypt') + ': ' + t('dropHint'), 'error');
      return;
    }
    if (mode === 'encrypt' && /\.(cryptcat|crypt3)$/i.test(name)) {
      showStatus(t('modeDecrypt') + ': ' + t('dropHint'), 'error');
      return;
    }

    selectedFile = file;
    dropZone.classList.add('has-file');
    dropTitle.textContent = '✓ ' + t('fileSelected');
    fileName.textContent = name;
    fileSize.textContent = '(' + formatBytes(file.size) + ')';
    fileInfo.classList.add('show');
    if (saveActions) saveActions.classList.remove('show');

    if (mode === 'decrypt') {
      const match = name.match(/\.([a-f0-9]{4})\.crypt3$/i);
      fileKeyHash = match ? match[1] : null;
      verifyPwd();
    } else {
      fileKeyHash = null;
      pwdVerify.classList.remove('show', 'match', 'mismatch');
    }
    updateBtn();
  }

  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('File read failed'));
      reader.readAsArrayBuffer(file);
    });
  }

  async function verifyPwd() {
    const t = I18N.t.bind(I18N);
    const pwd = passwordEl.value;
    if (mode !== 'decrypt' || !pwd || !fileKeyHash) {
      pwdVerify.classList.remove('show', 'match', 'mismatch');
      return;
    }
    const hash4 = await Crypto.computeKeyHash(pwd);
    pwdVerify.classList.add('show');
    if (hash4 === fileKeyHash.toLowerCase()) {
      pwdVerify.textContent = '✓ ' + t('pwdFingerprintMatch') + ' (' + hash4 + ')';
      pwdVerify.classList.add('match');
      pwdVerify.classList.remove('mismatch');
    } else {
      pwdVerify.textContent = '⚠ ' + t('pwdFingerprintMismatch') + ' (' + fileKeyHash + ' ≠ ' + hash4 + ')';
      pwdVerify.classList.add('mismatch');
      pwdVerify.classList.remove('match');
    }
  }

  function showDecryptPasswordResult(ok) {
    const t = I18N.t.bind(I18N);
    pwdVerify.textContent = (ok ? '✓ ' : '✗ ') + t(ok ? 'pwdMatch' : 'pwdNoMatch');
    pwdVerify.classList.add('show', ok ? 'match' : 'mismatch');
    pwdVerify.classList.remove(ok ? 'mismatch' : 'match');
  }

  function checkConfirm() {
    const t = I18N.t.bind(I18N);
    if (mode !== 'encrypt') return;
    const p1 = passwordEl.value;
    const p2 = passwordConfirm.value;
    if (!p1 || !p2) {
      pwdMatch.classList.remove('show', 'ok', 'no');
      return;
    }
    pwdMatch.classList.add('show');
    if (p1 === p2) {
      pwdMatch.textContent = '✓ ' + t('pwdMatch');
      pwdMatch.classList.add('ok');
      pwdMatch.classList.remove('no');
    } else {
      pwdMatch.textContent = '✗ ' + t('pwdNoMatch');
      pwdMatch.classList.add('no');
      pwdMatch.classList.remove('ok');
    }
  }

  function updateBtn() {
    if (mode === 'decrypt') {
      btnAction.disabled = !(selectedFile && passwordEl.value.length > 0);
    } else {
      btnAction.disabled = !(selectedFile && passwordEl.value.length > 0 && passwordEl.value === passwordConfirm.value);
    }
  }

  function resolveEncryptOptions() {
    return { allowLegacyFallback: false };
  }

  async function doAction() {
    if (mode === 'decrypt') await doDecrypt();
    else await doEncrypt();
  }

  async function doDecrypt() {
    const t = I18N.t.bind(I18N);
    if (!selectedFile || !passwordEl.value) return;

    btnAction.classList.add('loading');
    btnAction.disabled = true;
    showProgress(0);
    showStatus(t('statusReading'), 'info');

    try {
      showProgress(10);
      const encData = new Uint8Array(await readFileAsArrayBuffer(selectedFile));
      showProgress(20);
      showStatus(t('statusDecrypting'), 'info');

      const decryptedResult = await CryptoRouter.decrypt(encData, passwordEl.value);
      const decrypted = decryptedResult.bytes;
      showProgress(50);
      showStatus(t('statusDecompressing'), 'info');

      const decompressed = await Crypto.decompressGzip(new Uint8Array(decrypted));
      showProgress(75);

      const files = Crypto.parseTar(decompressed);
      if (files.length === 0) throw new Error(t('errorNoFiles'));
      showProgress(90);
      showDecryptPasswordResult(true);

      const outFile = files[0];
      lastResult = { name: outFile.name, blob: outFile.data };

      await NativeIO.deliver(outFile.name, outFile.data);
      showStatus('✅ ' + t('successDecrypt') + ' ' + outFile.name, 'success');

      if (saveActions) saveActions.classList.add('show');
      showProgress(100);
    } catch (err) {
      const msg = (err && err.name === 'OperationError') ? t('errorDecryptPwd') : (err.message || String(err));
      showDecryptPasswordResult(false);
      showStatus('❌ ' + msg, 'error');
    } finally {
      btnAction.classList.remove('loading');
      updateBtn();
    }
  }

  async function doEncrypt() {
    const t = I18N.t.bind(I18N);
    if (!selectedFile || !passwordEl.value || passwordEl.value !== passwordConfirm.value) return;

    btnAction.classList.add('loading');
    btnAction.disabled = true;
    showProgress(0);
    showStatus(t('statusReading'), 'info');

    try {
      showProgress(10);
      const originalName = resolveFileName(selectedFile);
      const rawData = new Uint8Array(await readFileAsArrayBuffer(selectedFile));
      showProgress(20);
      showStatus(t('statusCompressing'), 'info');

      const tarData = Crypto.createTar(originalName, rawData);
      const gzipped = await Crypto.compressGzip(tarData);
      showProgress(40);

      showStatus(t('statusEncrypting'), 'info');
      const encryptedResult = await CryptoRouter.encrypt(gzipped, passwordEl.value, resolveEncryptOptions());
      const encrypted = encryptedResult.bytes;
      showProgress(75);

      const keyHash = encryptedResult.format === 'v1' ? await Crypto.computeKeyHash(passwordEl.value) : null;
      const outName = encryptedResult.format === 'v2'
        ? originalName + '.cryptcat'
        : originalName + '.tgz.aes-256-cbc.' + keyHash + '.crypt3';
      const outBlob = new Blob([encrypted]);
      lastResult = { name: outName, blob: outBlob };
      showProgress(90);

      await NativeIO.deliver(outName, outBlob);
      showStatus('✅ ' + t('successEncrypt') + ' ' + outName, 'success');

      if (saveActions) saveActions.classList.add('show');
      showProgress(100);
    } catch (err) {
      showStatus('❌ ' + (err.message || String(err)), 'error');
    } finally {
      btnAction.classList.remove('loading');
      updateBtn();
    }
  }

  async function saveToFiles() {
    if (!lastResult) return;
    const t = I18N.t.bind(I18N);
    try {
      await NativeIO.saveToDocuments(lastResult.name, lastResult.blob);
      showStatus('✅ ' + t('fileSaved') + ' ' + lastResult.name, 'success');
    } catch (err) {
      showStatus('❌ ' + (err.message || String(err)), 'error');
    }
  }

  async function shareResult() {
    if (!lastResult) return;
    try {
      await NativeIO.deliver(lastResult.name, lastResult.blob);
    } catch (err) {
      const t = I18N.t.bind(I18N);
      showStatus('❌ ' + (err.message || String(err)), 'error');
    }
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sz = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sz[i];
  }

  function setPasswordVisible(visible) {
    passwordEl.type = visible ? 'text' : 'password';
    togglePwd.innerHTML = visible ? EYE_CLOSED_SVG : EYE_OPEN_SVG;
    togglePwd.classList.toggle('is-visible', visible);
    togglePwd.setAttribute('aria-pressed', visible ? 'true' : 'false');
    togglePwd.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
  }

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = 'status show ' + type;
  }

  function showProgress(pct) {
    progressBar.classList.add('show');
    progressFill.style.width = pct + '%';
    if (pct >= 100) setTimeout(() => progressBar.classList.remove('show'), 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init().catch(console.error); });
  } else {
    init().catch(console.error);
  }
})();
