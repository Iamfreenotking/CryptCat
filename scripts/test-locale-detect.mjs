#!/usr/bin/env node
/**
 * Locale detection unit tests
 * Run: node scripts/test-locale-detect.mjs
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadI18N({ navigatorLanguages = ['en-US'], navigatorLanguage = 'en-US', capacitorDevice = null, injectedLocales = null } = {}) {
  const localesCode = fs.readFileSync(path.join(root, 'www/js/locales.js'), 'utf8');
  const localesExtraCode = fs.readFileSync(path.join(root, 'www/js/locales-extra.js'), 'utf8');
  const extraCode = fs.readFileSync(path.join(root, 'www/js/i18n-extra.js'), 'utf8');
  const top100Code = fs.readFileSync(path.join(root, 'www/js/i18n-top100.js'), 'utf8');
  const i18nCode = fs.readFileSync(path.join(root, 'www/js/i18n.js'), 'utf8');
  const ctx = {
    window: {},
    navigator: { languages: navigatorLanguages, language: navigatorLanguage },
    Intl
  };
  if (injectedLocales) ctx.window.__CRYPT3_SYSTEM_LOCALES__ = injectedLocales;
  if (capacitorDevice) {
    ctx.window.Capacitor = {
      isNativePlatform: () => true,
      Plugins: { Device: capacitorDevice }
    };
  }
  vm.createContext(ctx);
  vm.runInContext(localesCode, ctx);
  vm.runInContext(localesExtraCode, ctx);
  vm.runInContext(extraCode, ctx);
  vm.runInContext(top100Code, ctx);
  vm.runInContext(i18nCode, ctx);
  ctx.window.I18N.__titleOverrides = ctx.window.I18N_TITLE_OVERRIDES || {};
  return ctx.window.I18N;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const I18N = loadI18N();

const cases = [
  ['zh-CN', 'zh-Hans'],
  ['zh-Hans-CN', 'zh-Hans'],
  ['zh', 'zh-Hans'],
  ['zh-SG', 'zh-Hans'],
  ['zh-TW', 'zh-Hant'],
  ['zh-HK', 'zh-Hant'],
  ['zh-Hant', 'zh-Hant'],
  ['yue-HK', 'yue'],
  ['jv-ID', 'jv'],
  ['en-US', 'en'],
  ['en-GB', 'en'],
  ['pt-BR', 'pt'],
  ['pt-PT', 'pt'],
  ['de-DE', 'de'],
  ['ja-JP', 'ja'],
  ['ko-KR', 'ko'],
  ['vi-VN', 'vi'],
  ['ru-RU', 'ru'],
  ['ru-Cyrl-RU', 'ru'],
  ['tr-TR', 'tr'],
  ['it-IT', 'it'],
  ['id-ID', 'id'],
  ['in-ID', 'id'],
  ['tl-PH', 'fil'],
  ['iw-IL', 'he'],
  ['fa-IR', 'fa'],
  ['ar-SA', 'ar'],
  ['hi-IN', 'hi'],
  ['fr-FR', 'fr'],
  ['es-MX', 'es'],
  ['unknown-xx', null]
];

for (const [input, expected] of cases) {
  const got = I18N.matchLocale(input);
  assert(got === expected, `matchLocale(${input}) expected ${expected}, got ${got}`);
}

assert(I18N.getLocales().length === 100, 'expected 100 locales, got ' + I18N.getLocales().length);
const englishKeys = Object.keys(I18N.translations.en);
const localesWithoutBundles = [];
const localesWithMissingKeys = [];
for (const loc of I18N.getLocales()) {
  const bundle = I18N.translations[loc.code];
  if (!bundle) {
    localesWithoutBundles.push(loc.code);
    continue;
  }
  const missingKeys = englishKeys.filter(key => typeof bundle[key] !== 'string' || !bundle[key].trim());
  if (missingKeys.length) localesWithMissingKeys.push(loc.code + ':' + missingKeys.join(','));
}
assert(localesWithoutBundles.length === 0, 'missing translation bundles: ' + localesWithoutBundles.join(','));
assert(localesWithMissingKeys.length === 0, 'incomplete translation bundles: ' + localesWithMissingKeys.join(';'));

const missingTitleOverrides = [];
const mismatchedTitleOverrides = [];
for (const loc of I18N.getLocales()) {
  const expectedTitle = I18N.__titleOverrides[loc.code];
  if (!expectedTitle) {
    missingTitleOverrides.push(loc.code);
    continue;
  }
  I18N.setLocale(loc.code);
  const actualTitle = I18N.t('appTitle');
  if (actualTitle !== expectedTitle) {
    mismatchedTitleOverrides.push(`${loc.code}: expected "${expectedTitle}", got "${actualTitle}"`);
  }
}
assert(missingTitleOverrides.length === 0, 'missing localized appTitle overrides: ' + missingTitleOverrides.join(','));
assert(mismatchedTitleOverrides.length === 0, 'mismatched localized appTitle overrides: ' + mismatchedTitleOverrides.join('; '));

const top100ExtraLocales = [
  'zh-Hant', 'yue', 'wuu', 'jv', 'bho', 'mai', 'mag', 'awa', 'hne', 'ckb',
  'ku', 'om', 'ig', 'zu', 'xh', 'rw', 'sn', 'so', 'ln', 'ny',
  'ak', 'ff', 'mg', 'ceb', 'ilo', 'hmn', 'lo', 'ka', 'hy', 'bg',
  'sr', 'hr', 'bs', 'sk', 'da', 'no', 'fi', 'lt', 'lv', 'et',
  'sl', 'mk', 'sq', 'kk', 'ky', 'tg', 'tk', 'mn', 'be', 'ca'
];
const fallbackSensitiveKeys = [
  'modeDecrypt',
  'modeEncrypt',
  'dropHint',
  'pwdPlaceholder',
  'confirmPlaceholder',
  'btnDecrypt',
  'btnEncrypt',
  'pwdMatch',
  'pwdNoMatch',
  'statusReading',
  'successDecrypt',
  'successEncrypt',
  'errorBrowser',
  'securityBadge',
  'selectCrypt3',
  'alreadyCrypt3',
  'fileSaved',
  'shareFile',
  'langSearch'
];
const englishFallbackLeaks = [];
for (const code of top100ExtraLocales) {
  const bundle = I18N.translations[code];
  for (const key of fallbackSensitiveKeys) {
    if (bundle[key] === I18N.translations.en[key]) englishFallbackLeaks.push(code + ':' + key);
  }
}
assert(englishFallbackLeaks.length === 0, 'new top-100 locales still using English fallback strings: ' + englishFallbackLeaks.join(','));

I18N.setLocale('zh-Hans');
assert(I18N.getLocale() === 'zh-Hans', 'setLocale zh-Hans');
assert(I18N.t('modeDecrypt') === '解密', 'zh-Hans bundle');

I18N.setLocale('zh-Hant');
assert(I18N.getLocale() === 'zh-Hant', 'setLocale zh-Hant');
assert(I18N.t('modeDecrypt') === '解密', 'zh-Hant bundle');
assert(I18N.t('appTitle') === '加密貓 = 原始碼開源 + 離線加密', 'zh-Hant localized appTitle');

I18N.setLocale('de');
assert(I18N.t('modeDecrypt') === 'Entschlüsseln', 'de bundle');

I18N.setLocale('sw');
assert(I18N.t('modeDecrypt') === 'Fungua', 'sw bundle');

I18N.setLocale('vi');
assert(I18N.t('modeDecrypt') === 'Giải mã', 'vi bundle');

I18N.setLocale('fr');
assert(I18N.t('appTitle') === 'CryptoChat = Open source + Chiffrement hors ligne', 'fr localized appTitle');

I18N.setLocale('es');
assert(I18N.t('appTitle') === 'CriptoGato = Código abierto + Cifrado sin conexión', 'es localized appTitle');

I18N.setLocale('ru');
assert(I18N.t('appTitle') === 'Криптокот = Открытый код + Офлайн-шифрование', 'ru localized appTitle');

const injectedI18N = loadI18N({ navigatorLanguages: ['en-US'], injectedLocales: ['zh-CN'] });
assert(injectedI18N.detect() === 'zh-Hans', 'injected system locale wins over browser English');

const nativeI18N = loadI18N({
  navigatorLanguages: ['en-US'],
  capacitorDevice: {
    getLanguageTag: async () => ({ value: 'zh-CN' }),
    getLanguageCode: async () => ({ value: 'zh' })
  }
});
assert(await nativeI18N.detectAsync() === 'zh-Hans', 'native iOS/Android locale wins over WebView English');

const nativeSpanishI18N = loadI18N({
  navigatorLanguages: ['en-US'],
  capacitorDevice: {
    getLanguageTag: async () => ({ value: 'es-MX' }),
    getLanguageCode: async () => ({ value: 'es' })
  }
});
assert(await nativeSpanishI18N.detectAsync() === 'es', 'native Spanish locale detected');

const nativeRussianI18N = loadI18N({
  navigatorLanguages: ['en-US'],
  injectedLocales: ['ru-RU']
});
assert(nativeRussianI18N.detect() === 'ru', 'injected native Russian locale detected');

const nativeIndonesianI18N = loadI18N({
  navigatorLanguages: ['en-US'],
  capacitorDevice: {
    getLanguageTag: async () => ({ value: 'in-ID' }),
    getLanguageCode: async () => ({ value: 'in' })
  }
});
assert(await nativeIndonesianI18N.detectAsync() === 'id', 'native Indonesian legacy locale detected');

console.log('✅ All locale detection tests passed (' + cases.length + ' match cases, 100 complete locales, native precedence).');
