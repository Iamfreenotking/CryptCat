#!/usr/bin/env node
/**
 * Offline release gate for Web / iOS / Android packages.
 *
 * This catches the mistakes that matter most for CryptCat's promise:
 * no network permission, no network APIs, no embedded API keys, and the
 * same localized web bundle present in Android assets.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LAUNCHER_NAMES, androidQualifier } from './launcher-locales.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'build' || entry.name === '.gradle') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const webIndex = read('www/index.html');
assert(/connect-src\s+'none'/.test(webIndex), 'www/index.html must keep CSP connect-src none');
assert(/wasm-unsafe-eval/.test(webIndex), 'www/index.html must allow local WASM crypto only');
assert(/js\/locales-extra\.js/.test(webIndex), 'www/index.html missing locales-extra.js');
assert(/js\/i18n-top100\.js/.test(webIndex), 'www/index.html missing i18n-top100.js');
assert(/js\/crypto-v2\.js/.test(webIndex), 'www/index.html missing crypto-v2.js');
assert(/js\/crypto-router\.js/.test(webIndex), 'www/index.html missing crypto-router.js');
assert(/cryptcat-logo\.svg/.test(webIndex), 'www/index.html must use CryptCat SVG logo');

const androidIndex = read('android/app/src/main/assets/public/index.html');
assert(/connect-src\s+'none'/.test(androidIndex), 'Android public index must keep CSP connect-src none');
assert(/wasm-unsafe-eval/.test(androidIndex), 'Android public index must allow local WASM crypto only');
assert(/js\/locales-extra\.js/.test(androidIndex), 'Android public index missing locales-extra.js');
assert(/js\/i18n-top100\.js/.test(androidIndex), 'Android public index missing i18n-top100.js');
assert(/js\/crypto-v2\.js/.test(androidIndex), 'Android public index missing crypto-v2.js');
assert(/js\/crypto-router\.js/.test(androidIndex), 'Android public index missing crypto-router.js');
assert(/cryptcat-logo\.svg/.test(androidIndex), 'Android public index must use CryptCat SVG logo');

const manifest = read('android/app/src/main/AndroidManifest.xml');
assert(!/android\.permission\.INTERNET/.test(manifest), 'Android release must not request INTERNET permission');
assert(/android:label="@string\/app_name"/.test(manifest), 'Android app label must use app_name string');

const strings = read('android/app/src/main/res/values/strings.xml');
assert(/<string name="app_name">CryptCat<\/string>/.test(strings), 'Default Android launcher name must remain CryptCat');
assert(/<string name="title_activity_main">CryptCat<\/string>/.test(strings), 'Default Android activity title must remain CryptCat');
const zhLauncher = read(`android/app/src/main/res/${androidQualifier('zh-Hans')}/strings.xml`);
const idLauncher = read(`android/app/src/main/res/${androidQualifier('id')}/strings.xml`);
assert(zhLauncher.includes(`<string name="app_name">${LAUNCHER_NAMES['zh-Hans']}</string>`), 'Android Chinese launcher name missing');
assert(idLauncher.includes(`<string name="app_name">${LAUNCHER_NAMES.id}</string>`), 'Android Indonesian launcher name missing');

const androidBuildGradle = read('android/app/build.gradle');
assert(/CRYPTCAT_UPLOAD_STORE_FILE/.test(androidBuildGradle), 'Android release signing must be driven by local environment variables');
assert(/signingConfig signingConfigs\.release/.test(androidBuildGradle), 'Android release build type must support release signing config');

const standalone = path.join(root, '..', 'crypt3_decryptor.html');
if (fs.existsSync(standalone)) {
  const html = fs.readFileSync(standalone, 'utf8');
  assert(/connect-src\s+'none'/.test(html), 'standalone web page must keep CSP connect-src none');
  assert(/wasm-unsafe-eval/.test(html), 'standalone web page must allow local WASM crypto only');
  assert(/crypt3-app\/www\/js\/locales-extra\.js/.test(html), 'standalone web page missing locales-extra.js');
  assert(/crypt3-app\/www\/js\/i18n-top100\.js/.test(html), 'standalone web page missing i18n-top100.js');
  assert(/crypt3-app\/www\/js\/crypto-v2\.js/.test(html), 'standalone web page missing crypto-v2.js');
  assert(/crypt3-app\/www\/js\/crypto-router\.js/.test(html), 'standalone web page missing crypto-router.js');
}

const forbiddenNetwork = /\b(fetch\s*\(|XMLHttpRequest\b|WebSocket\b|EventSource\b|sendBeacon\s*\(|importScripts\s*\(|https?:\/\/)/;
const forbiddenSecrets = /\b(AIza[0-9A-Za-z_-]{20,}|api[_-]?key|gemini|firebase|analytics|gtag|sentry)\b/i;
const scannedRoots = [
  path.join(root, 'www'),
  path.join(root, 'android/app/src/main/assets/public')
];

const allowSvgXmlNamespace = /xmlns(:\w+)?="https?:\/\/|xmlns(:\w+)?='https?:\/\//;
for (const scanRoot of scannedRoots) {
  for (const file of walk(scanRoot)) {
    if (!/\.(html|js|css|xml|svg|json)$/i.test(file)) continue;
    const rel = path.relative(root, file);
    if (rel.includes('vendor/libsodium/')) continue;
    const text = fs.readFileSync(file, 'utf8');
    const normalized = text.replace(allowSvgXmlNamespace, '');
    assert(!forbiddenNetwork.test(normalized), 'network-capable code or URL found in ' + rel);
    assert(!forbiddenSecrets.test(text), 'possible API key/secret marker found in ' + rel);
  }
}

console.log('✅ Offline release gate passed: no Android INTERNET permission, no network APIs, no embedded API keys, Web/Android bundles synced.');
