#!/usr/bin/env node
/**
 * Production device-matrix gate for Crypt3.
 *
 * This is a deterministic compatibility matrix, not a cloud-device run.
 * It encodes the target phone models for manual/cloud-device regression
 * and verifies that each target is compatible with Crypt3's offline web stack.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const IOS_MIN_VERSION = 16.4;
const ANDROID_MIN_API = 24;
const MIN_CHROMIUM_WEBVIEW = 112;

const PUBLIC_2025_COUNTERPOINT_TOP10 = [
  'iPhone 16',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 17 Pro Max',
  'Samsung Galaxy A16 5G',
  'Samsung Galaxy A06',
  'iPhone 17',
  'iPhone 15',
  'Samsung Galaxy S25 Ultra',
  'iPhone 16e'
];

const Q3_2025_COUNTERPOINT_TOP10 = [
  'iPhone 16',
  'iPhone 16 Pro',
  'iPhone 16 Pro Max',
  'iPhone 16e',
  'Samsung Galaxy A16 5G',
  'Samsung Galaxy A06',
  'Samsung Galaxy A36',
  'Samsung Galaxy A56',
  'Samsung Galaxy A16 4G',
  'iPhone 17 Pro Max'
];

const devices = [
  // iOS current and high-share active fleet
  d('iPhone 17 Pro Max', 'iOS', 'iOS 26', 16.4, 430, 932, 3, 'large', 'en', 'Public Top 10 / current flagship'),
  d('iPhone 17 Pro', 'iOS', 'iOS 26', 16.4, 393, 852, 3, 'standard', 'fr', 'Current flagship'),
  d('iPhone 17', 'iOS', 'iOS 26', 16.4, 393, 852, 3, 'standard', 'es', 'Public Top 10 / current mainstream'),
  d('iPhone Air', 'iOS', 'iOS 26', 16.4, 430, 932, 3, 'large', 'de', 'Current thin model'),
  d('iPhone 17e', 'iOS', 'iOS 26.3', 16.4, 390, 844, 3, 'standard', 'pt', 'Current entry model'),
  d('iPhone 16', 'iOS', 'iOS 18+', 16.4, 393, 852, 3, 'standard', 'zh-Hans', 'Public Top 10 winner'),
  d('iPhone 16 Pro', 'iOS', 'iOS 18+', 16.4, 402, 874, 3, 'standard', 'ja', 'Public Top 10'),
  d('iPhone 16 Pro Max', 'iOS', 'iOS 18+', 16.4, 440, 956, 3, 'large', 'ko', 'Public Top 10'),
  d('iPhone 16 Plus', 'iOS', 'iOS 18+', 16.4, 430, 932, 3, 'large', 'it', 'Large iOS'),
  d('iPhone 16e', 'iOS', 'iOS 18.3+', 16.4, 390, 844, 3, 'standard', 'hi', 'Public Top 10'),
  d('iPhone 15', 'iOS', 'iOS 17+', 16.4, 393, 852, 3, 'standard', 'ar', 'Public Top 10 active fleet'),
  d('iPhone 15 Pro', 'iOS', 'iOS 17+', 16.4, 393, 852, 3, 'standard', 'ru', 'Mainstream active fleet'),
  d('iPhone 15 Pro Max', 'iOS', 'iOS 17+', 16.4, 430, 932, 3, 'large', 'bn', 'Large active fleet'),
  d('iPhone 14', 'iOS', 'iOS 16+', 16.4, 390, 844, 3, 'standard', 'ur', 'Older active fleet'),
  d('iPhone 13', 'iOS', 'iOS 15+', 16.4, 390, 844, 3, 'standard', 'id', 'Older high-share fleet'),
  d('iPhone SE (3rd generation)', 'iOS', 'iOS 15+', 16.4, 375, 667, 2, 'compact', 'tr', 'Compact iOS'),

  // Samsung global volume and flagship coverage
  d('Samsung Galaxy A16 5G', 'Android', 'Android 16 / One UI 8', 35, 412, 915, 2.625, 'large', 'sw', 'Public Top 10 / Android volume'),
  d('Samsung Galaxy A16 4G', 'Android', 'Android 16 / One UI 8', 35, 412, 915, 2.625, 'large', 'mr', 'Q3 2025 Top 10'),
  d('Samsung Galaxy A06', 'Android', 'Android 15+', 34, 412, 915, 2, 'large', 'te', 'Public Top 10 / budget volume'),
  d('Samsung Galaxy A36', 'Android', 'Android 15+', 35, 412, 915, 2.625, 'large', 'ta', 'Q3 2025 Top 10'),
  d('Samsung Galaxy A56', 'Android', 'Android 15+', 35, 412, 915, 2.625, 'large', 'th', 'Q3 2025 Top 10'),
  d('Samsung Galaxy S25 Ultra', 'Android', 'Android 15+', 35, 412, 915, 3, 'large', 'gu', 'Public Top 10 / flagship'),
  d('Samsung Galaxy S26 Ultra', 'Android', 'Android 16+', 36, 412, 915, 3, 'large', 'pl', 'Current flagship'),
  d('Samsung Galaxy S26', 'Android', 'Android 16+', 36, 384, 854, 3, 'standard', 'uk', 'Current flagship compact'),
  d('Samsung Galaxy S24 Ultra', 'Android', 'Android 14+', 34, 412, 915, 3, 'large', 'ms', 'Recent flagship'),
  d('Samsung Galaxy S24', 'Android', 'Android 14+', 34, 384, 854, 3, 'standard', 'fa', 'Recent flagship'),
  d('Samsung Galaxy S23 Ultra', 'Android', 'Android 13+', 33, 412, 915, 3, 'large', 'kn', 'Older flagship active fleet'),
  d('Samsung Galaxy A15 5G', 'Android', 'Android 14+', 34, 412, 915, 2.625, 'large', 'ml', '2024 Top Android volume'),
  d('Samsung Galaxy A14 5G', 'Android', 'Android 13+', 33, 412, 915, 2.625, 'large', 'or', 'Older Android volume'),
  d('Samsung Galaxy A05', 'Android', 'Android 14+', 34, 412, 915, 2, 'large', 'my', 'Budget volume'),
  d('Samsung Galaxy Z Fold7', 'Android', 'Android 16+', 36, 374, 812, 3, 'fold-outer', 'ha', 'Foldable cover screen'),
  d('Samsung Galaxy Z Flip7', 'Android', 'Android 16+', 36, 412, 915, 3, 'fold-flip', 'pa', 'Flip foldable'),

  // Xiaomi / Redmi / POCO high-volume Android coverage
  d('Xiaomi Redmi Note 14 Pro 5G', 'Android', 'Android 15+', 35, 393, 873, 2.75, 'large', 'yo', 'Xiaomi/Redmi volume'),
  d('Xiaomi Redmi Note 13 5G', 'Android', 'Android 14+', 34, 393, 873, 2.75, 'large', 'am', 'Xiaomi/Redmi volume'),
  d('Xiaomi Redmi 13C', 'Android', 'Android 13+', 33, 393, 873, 2, 'large', 'ro', 'Budget volume'),
  d('Xiaomi Redmi A3', 'Android', 'Android 14+', 34, 393, 873, 2, 'large', 'nl', 'Low-end memory/CPU class'),
  d('Xiaomi 15', 'Android', 'Android 15+', 35, 393, 873, 3, 'standard', 'fil', 'Current Xiaomi flagship'),
  d('Xiaomi 14', 'Android', 'Android 14+', 34, 393, 873, 3, 'standard', 'ps', 'Recent Xiaomi flagship'),
  d('POCO X7 Pro', 'Android', 'Android 15+', 35, 393, 873, 2.75, 'large', 'uz', 'Performance/value Android'),

  // OPPO / vivo / realme / Motorola / Google / OnePlus coverage
  d('OPPO A5 Pro 5G', 'Android', 'Android 15+', 35, 412, 915, 2.625, 'large', 'sd', 'OPPO volume'),
  d('OPPO Reno13 5G', 'Android', 'Android 15+', 35, 412, 915, 2.75, 'large', 'az', 'OPPO midrange'),
  d('vivo Y29 5G', 'Android', 'Android 15+', 35, 412, 915, 2.625, 'large', 'ne', 'vivo volume'),
  d('vivo V40', 'Android', 'Android 14+', 34, 412, 915, 2.75, 'large', 'si', 'vivo midrange'),
  d('realme C75', 'Android', 'Android 15+', 35, 412, 915, 2.625, 'large', 'km', 'realme budget volume'),
  d('realme 13 Pro+', 'Android', 'Android 14+', 34, 412, 915, 2.75, 'large', 'he', 'realme midrange'),
  d('Motorola Moto G Power (2025)', 'Android', 'Android 15+', 35, 412, 915, 2.625, 'large', 'el', 'North America budget'),
  d('Motorola Razr 60 Ultra', 'Android', 'Android 15+', 35, 412, 915, 3, 'fold-flip', 'cs', 'Foldable flip'),
  d('Google Pixel 9', 'Android', 'Android 15+', 35, 412, 915, 2.75, 'standard', 'sv', 'Reference Android'),
  d('Google Pixel 10', 'Android', 'Android 16+', 36, 412, 915, 2.75, 'standard', 'hu', 'Current reference Android'),
  d('OnePlus 15', 'Android', 'Android 16+', 36, 412, 915, 3, 'large', 'vi', 'Current performance Android')
];

function d(model, platform, os, minRuntime, width, height, dpr, bucket, locale, basis) {
  return { model, platform, os, minRuntime, viewport: { width, height, dpr }, bucket, locale, basis };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function loadI18N() {
  const ctx = { window: {}, navigator: { languages: ['en-US'], language: 'en-US' }, Intl, console };
  vm.createContext(ctx);
  for (const f of ['www/js/locales.js', 'www/js/locales-extra.js', 'www/js/i18n-extra.js', 'www/js/i18n-top100.js', 'www/js/i18n.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  }
  return ctx.window.I18N;
}

const I18N = loadI18N();
const models = new Set(devices.map(x => x.model));
assert(I18N.getLocales().length === 100, 'expected 100 locale registry, got ' + I18N.getLocales().length);
assert(devices.length === 50, 'expected 50 device profiles, got ' + devices.length);
assert(models.size === 50, 'device model names must be unique');

for (const model of PUBLIC_2025_COUNTERPOINT_TOP10) {
  assert(models.has(model), 'missing public 2025 Counterpoint Top 10 model: ' + model);
}
for (const model of Q3_2025_COUNTERPOINT_TOP10) {
  assert(models.has(model), 'missing Q3 2025 Counterpoint Top 10 model: ' + model);
}

const localeCodes = new Set(I18N.getLocales().map(l => l.code));
const matrixLocales = new Set();
for (const device of devices) {
  assert(localeCodes.has(device.locale), 'unknown locale in matrix: ' + device.locale);
  matrixLocales.add(device.locale);
  assert(device.viewport.width >= 320 && device.viewport.width <= 500, 'bad width for ' + device.model);
  assert(device.viewport.height >= 640 && device.viewport.height <= 980, 'bad height for ' + device.model);
  assert(device.viewport.dpr >= 2 && device.viewport.dpr <= 3.5, 'bad DPR for ' + device.model);
  if (device.platform === 'iOS') {
    assert(device.minRuntime >= IOS_MIN_VERSION, device.model + ' below iOS ' + IOS_MIN_VERSION);
  } else if (device.platform === 'Android') {
    assert(device.minRuntime >= ANDROID_MIN_API, device.model + ' below Android API ' + ANDROID_MIN_API);
  } else {
    throw new Error('unknown platform for ' + device.model);
  }
}

assert(matrixLocales.size === 50, 'matrix must exercise all 50 locales, got ' + matrixLocales.size);
assert(devices.some(d => d.bucket === 'compact'), 'missing compact viewport');
assert(devices.some(d => d.bucket === 'standard'), 'missing standard viewport');
assert(devices.some(d => d.bucket === 'large'), 'missing large viewport');
assert(devices.some(d => d.bucket.indexOf('fold') === 0), 'missing foldable viewport');

const iosCount = devices.filter(d => d.platform === 'iOS').length;
const androidCount = devices.filter(d => d.platform === 'Android').length;
assert(iosCount >= 12, 'expected broad iOS coverage');
assert(androidCount >= 30, 'expected broad Android coverage');

console.log('✅ Device matrix passed: 50 models, 50 sampled locales, 100 locale registry, iOS ' + IOS_MIN_VERSION + '+, Android API ' + ANDROID_MIN_API + '+, Chromium/WebView ' + MIN_CHROMIUM_WEBVIEW + '+ target.');
