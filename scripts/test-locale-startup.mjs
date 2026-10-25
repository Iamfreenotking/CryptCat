#!/usr/bin/env node
/**
 * Startup locale regression tests.
 * Verifies first-run auto locale detection and manual override persistence.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const assetRoot = process.env.CRYPTCAT_ASSET_ROOT || path.join(root, 'www');
const LOCALE_PREF_VERSION = '2026-07-05-native-auto-locale';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function makeClassList(el) {
  const classes = new Set();
  return {
    add: (...names) => {
      names.filter(Boolean).forEach(name => classes.add(name));
      el.className = Array.from(classes).join(' ');
    },
    remove: (...names) => {
      names.forEach(name => classes.delete(name));
      el.className = Array.from(classes).join(' ');
    },
    toggle: (name, force) => {
      const shouldAdd = force === undefined ? !classes.has(name) : Boolean(force);
      if (shouldAdd) classes.add(name);
      else classes.delete(name);
      el.className = Array.from(classes).join(' ');
      return shouldAdd;
    },
    contains: name => classes.has(name)
  };
}

class TestElement {
  constructor(id = '', tagName = 'div') {
    this.id = id;
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.dataset = {};
    this.style = {};
    this.attributes = {};
    this.listeners = {};
    this.className = '';
    this.classList = makeClassList(this);
    this.textContent = '';
    this.value = '';
    this.placeholder = '';
    this.type = 'password';
    this.disabled = false;
    this.hidden = false;
    this.files = [];
  }

  set innerHTML(value) {
    this._innerHTML = value;
    this.children = [];
  }

  get innerHTML() {
    return this._innerHTML || '';
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  querySelectorAll(selector) {
    if (selector === 'option') {
      return this.children.filter(child => child.tagName === 'OPTION');
    }
    return [];
  }

  addEventListener(type, fn) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(fn);
  }

  dispatchEvent(event) {
    const evt = typeof event === 'string' ? { type: event } : event;
    if (!evt.target) evt.target = this;
    if (!evt.preventDefault) evt.preventDefault = () => {};
    (this.listeners[evt.type] || []).forEach(fn => fn(evt));
    return true;
  }

  click() {
    this.dispatchEvent({ type: 'click', target: this });
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name] || null;
  }
}

function makeDocument() {
  const elementIds = [
    'dropZone', 'fileInput', 'fileInfo', 'fileName', 'fileSize', 'password',
    'togglePwd', 'pwdVerify', 'confirmField', 'passwordConfirm', 'pwdMatch',
    'btnAction', 'btnText', 'progressBar', 'progressFill', 'status',
    'dropTitle', 'dropHint', 'pwdLabel', 'btnModeDecrypt', 'btnModeEncrypt',
    'mainCard', 'langSelect', 'saveActions', 'btnSaveFiles', 'btnShare',
    'langFilter'
  ];
  const elements = new Map(elementIds.map(id => [id, new TestElement(id)]));
  const documentListeners = {};

  return {
    readyState: 'complete',
    body: new TestElement('body', 'body'),
    documentElement: { lang: '', dir: '' },
    getElementById: id => elements.get(id) || null,
    createElement: tag => new TestElement('', tag),
    querySelectorAll: () => [],
    addEventListener: (type, fn) => {
      if (!documentListeners[type]) documentListeners[type] = [];
      documentListeners[type].push(fn);
    },
    dispatchEvent: event => {
      const evt = typeof event === 'string' ? { type: event } : event;
      (documentListeners[evt.type] || []).forEach(fn => fn(evt));
    },
    __elements: elements
  };
}

function makeStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    getItem: key => map.has(key) ? map.get(key) : null,
    setItem: (key, value) => { map.set(key, String(value)); },
    removeItem: key => { map.delete(key); },
    clear: () => { map.clear(); },
    __map: map
  };
}

async function loadApp({
  storage = {},
  injectedLocales = null,
  navigatorLanguages = ['en-US'],
  navigatorLanguage = 'en-US'
} = {}) {
  const document = makeDocument();
  const localStorage = makeStorage(storage);
  const window = {
    document,
    navigator: { languages: navigatorLanguages, language: navigatorLanguage },
    localStorage,
    console,
    setTimeout,
    clearTimeout
  };
  window.window = window;
  if (injectedLocales) window.__CRYPT3_SYSTEM_LOCALES__ = injectedLocales;
  window.CryptEngine = {
    computeKeyHash: async () => '0000',
    decompressGzip: async bytes => bytes,
    compressGzip: async bytes => bytes,
    createTar: () => new Uint8Array([1, 2, 3]),
    parseTar: () => []
  };
  window.CryptoRouter = {
    encrypt: async bytes => ({ format: 'v2', bytes }),
    decrypt: async bytes => ({ format: 'v2', bytes })
  };
  window.NativeIO = {
    deliver: async () => {},
    saveToDocuments: async () => {}
  };

  const ctx = {
    window,
    document,
    navigator: window.navigator,
    localStorage,
    CompressionStream: function CompressionStream() {},
    DecompressionStream: function DecompressionStream() {},
    Blob,
    Intl,
    console,
    setTimeout,
    clearTimeout
  };
  vm.createContext(ctx);

  for (const file of [
    'js/locales.js',
    'js/locales-extra.js',
    'js/i18n-extra.js',
    'js/i18n-top100.js',
    'js/i18n.js',
    'js/app.js'
  ]) {
    vm.runInContext(fs.readFileSync(path.join(assetRoot, file), 'utf8'), ctx, { filename: file });
  }

  await waitFor(() => document.body.classList.contains('locale-ready'), 'app locale did not initialize');
  return { window, document, localStorage };
}

async function waitFor(predicate, message) {
  for (let i = 0; i < 40; i++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  throw new Error(message);
}

{
  const { window, document, localStorage } = await loadApp({ injectedLocales: ['ru-RU'] });
  assert(window.I18N.getLocale() === 'ru', 'first launch should use injected Russian locale');
  assert(document.__elements.get('langSelect').value === 'ru', 'language selector should show Russian');
  assert(document.documentElement.lang === 'ru', 'html lang should be Russian');
  assert(localStorage.getItem('crypt3-locale-source') === 'auto', 'first launch locale source should be auto');
}

{
  const { window, localStorage } = await loadApp({
    injectedLocales: ['id-ID'],
    storage: {
      'crypt3-locale': 'zh-Hans',
      'crypt3-locale-source': 'manual'
    }
  });
  assert(window.I18N.getLocale() === 'id', 'stale manual cache should not override native Indonesian');
  assert(localStorage.getItem('crypt3-locale') === 'id', 'auto Indonesian locale should be stored');
  assert(localStorage.getItem('crypt3-locale-source') === 'auto', 'stale manual source should be replaced by auto');
}

{
  const { window, document, localStorage } = await loadApp({
    injectedLocales: ['ru-RU'],
    storage: {
      'crypt3-locale': 'es',
      'crypt3-locale-source': 'manual',
      'crypt3-locale-pref-version': LOCALE_PREF_VERSION
    }
  });
  assert(window.I18N.getLocale() === 'es', 'current manual Spanish choice should persist');
  assert(document.__elements.get('langSelect').value === 'es', 'selector should preserve manual Spanish');
  assert(localStorage.getItem('crypt3-locale-source') === 'manual', 'current manual source should remain manual');
}

{
  const { window, document } = await loadApp({ injectedLocales: ['zh-CN'] });
  const langSelect = document.__elements.get('langSelect');
  const langFilter = document.__elements.get('langFilter');
  assert(window.I18N.getLocale() === 'zh-Hans', 'Chinese launch setup failed');
  langFilter.value = 'Русский';
  langFilter.dispatchEvent({ type: 'input', target: langFilter });
  assert(window.I18N.getLocale() === 'zh-Hans', 'language search must not change active locale');
  assert(langSelect.value === 'zh-Hans', 'language search must not move selector value');
}

console.log('✅ Startup locale tests passed (first-run auto, stale cache reset, manual override, search stability).');
