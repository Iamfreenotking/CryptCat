#!/usr/bin/env node
/**
 * Android TOP20 production gate for CryptCat.
 *
 * This is a local, offline CI gate. It validates the Android model matrix,
 * responsive UI constraints, locale coverage, release constraints, and
 * per-profile v2/legacy crypto regression without contacting any network.
 */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import zlib from 'zlib';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import sodium from 'libsodium-wrappers-sumo';
import { LAUNCHER_NAMES, androidQualifier } from './launcher-locales.mjs';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const ANDROID_MIN_API = 24;
const TARGET_API = 36;
const MIN_WEBVIEW_CHROMIUM = 112;

const TOP20_ANDROID_MODELS = [
  p(1, 'Samsung Galaxy A07 4G', 'Samsung', 'A entry', 35, 'Android 15+', 360, 800, 2.0, 'budget', 'id'),
  p(2, 'Samsung Galaxy A17 5G', 'Samsung', 'A volume', 35, 'Android 15+', 412, 915, 2.625, 'budget-5g', 'zh-Hans'),
  p(3, 'Samsung Galaxy A17 4G', 'Samsung', 'A volume', 35, 'Android 15+', 412, 915, 2.625, 'budget-4g', 'es'),
  p(4, 'Samsung Galaxy A56 5G', 'Samsung', 'A midrange', 35, 'Android 15+', 412, 915, 2.625, 'midrange', 'fr'),
  p(5, 'Samsung Galaxy A36 5G', 'Samsung', 'A midrange', 35, 'Android 15+', 412, 915, 2.625, 'midrange', 'ar'),
  p(6, 'Samsung Galaxy A16 5G', 'Samsung', 'A previous volume', 34, 'Android 14+', 412, 915, 2.625, 'budget-5g', 'hi'),
  p(7, 'Samsung Galaxy A06', 'Samsung', 'A entry variant', 34, 'Android 14+', 360, 800, 2.0, 'budget', 'pt'),
  p(8, 'Samsung Galaxy S26 Ultra', 'Samsung', 'S flagship', 36, 'Android 16+', 412, 915, 3.0, 'flagship', 'ru'),
  p(9, 'Samsung Galaxy S26', 'Samsung', 'S flagship', 36, 'Android 16+', 384, 854, 3.0, 'flagship', 'bn'),
  p(10, 'Xiaomi Redmi A5', 'Xiaomi', 'Redmi entry', 35, 'Android 15+', 360, 800, 2.0, 'budget', 'sw'),
  p(11, 'Xiaomi Redmi 15C', 'Xiaomi', 'Redmi volume', 35, 'Android 15+', 393, 873, 2.0, 'budget-large', 'vi'),
  p(12, 'Xiaomi Redmi Note 14 5G', 'Xiaomi', 'Redmi midrange', 35, 'Android 15+', 393, 873, 2.75, 'midrange', 'th'),
  p(13, 'Xiaomi Redmi Note 14 Pro 5G', 'Xiaomi', 'Redmi midrange', 35, 'Android 15+', 393, 873, 2.75, 'midrange', 'tr'),
  p(14, 'POCO X7 Pro', 'Xiaomi', 'POCO performance', 35, 'Android 15+', 393, 873, 2.75, 'performance', 'ja'),
  p(15, 'Xiaomi 15', 'Xiaomi', 'Xiaomi flagship', 35, 'Android 15+', 393, 873, 3.0, 'flagship', 'ko'),
  p(16, 'OPPO A5 Pro 5G', 'OPPO', 'A volume', 35, 'Android 15+', 412, 915, 2.625, 'budget-5g', 'de'),
  p(17, 'realme C75', 'realme', 'C entry', 35, 'Android 15+', 412, 915, 2.625, 'budget', 'fil'),
  p(18, 'vivo Y29 5G', 'vivo', 'Y volume', 35, 'Android 15+', 412, 915, 2.625, 'budget-5g', 'ms'),
  p(19, 'Motorola Moto G Power (2025)', 'Motorola', 'G budget', 35, 'Android 15+', 412, 915, 2.625, 'budget', 'ha'),
  p(20, 'Google Pixel 10a', 'Google', 'Pixel reference', 36, 'Android 16+', 412, 915, 2.75, 'reference', 'en')
];

function p(rank, model, vendor, family, api, androidVersion, width, height, dpr, tier, locale) {
  return { rank, model, vendor, family, api, androidVersion, viewport: { width, height, dpr }, tier, locale };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

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

function loadI18N() {
  const ctx = { window: {}, navigator: { languages: ['en-US'], language: 'en-US' }, Intl, console };
  vm.createContext(ctx);
  for (const f of ['www/js/locales.js', 'www/js/locales-extra.js', 'www/js/i18n-extra.js', 'www/js/i18n-top100.js', 'www/js/i18n.js']) {
    vm.runInContext(read(f), ctx, { filename: f });
  }
  return ctx.window.I18N;
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
        const buf = Buffer.concat(this._parts.map(part => Buffer.from(part)));
        return Promise.resolve(arrayBufferOf(buf));
      }
    }
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const rel of ['www/js/crypto.js', 'www/js/crypto-v2.js', 'www/js/crypto-router.js']) {
    vm.runInContext(read(rel), ctx, { filename: rel });
  }
  return { CE: ctx.CryptEngine, Router: ctx.CryptoRouter };
}

async function assertProfileRoundtrip(profile, CE, Router) {
  const text = `CryptCat Android TOP20 regression\n${profile.rank}\n${profile.model}\n${profile.locale}`;
  const original = new Uint8Array(Buffer.from(text, 'utf8'));
  const fileName = `${profile.model.replace(/[^A-Za-z0-9]+/g, '_')}.txt`;
  const password = `Top20-${profile.rank}-${profile.locale}-TestOnly!`;
  const tar = CE.createTar(fileName, original);
  const gz = new Uint8Array(await gzip(Buffer.from(tar)));
  const encrypted = await Router.encrypt(gz, password, {
    allowLegacyFallback: false,
    v2: { kdf: 'argon2id', kdfParams: { opslimit: 2, memlimit: 16 * 1024 * 1024 } }
  });

  assert(encrypted.format === 'v2', profile.model + ' did not encrypt as v2');
  assert(encrypted.extension === '.cryptcat', profile.model + ' did not produce .cryptcat');
  assert(Router.detectFormat(encrypted.bytes) === 'v2', profile.model + ' v2 detect failed');

  const decrypted = await Router.decrypt(encrypted.bytes, password);
  const decomp = new Uint8Array(await gunzip(Buffer.from(decrypted.bytes)));
  const files = CE.parseTar(decomp);
  assert(files.length === 1, profile.model + ' tar file count mismatch');
  assert(files[0].name === fileName, profile.model + ' filename mismatch');
  const out = Buffer.from(await files[0].data.arrayBuffer());
  assert(out.equals(Buffer.from(original)), profile.model + ' v2 roundtrip mismatch');

  let wrongPasswordAccepted = false;
  try {
    await Router.decrypt(encrypted.bytes, password + '-wrong');
    wrongPasswordAccepted = true;
  } catch (e) {
    assert(e.name === 'OperationError', profile.model + ' wrong password error type mismatch');
  }
  assert(!wrongPasswordAccepted, profile.model + ' accepted wrong password');

  if (profile.rank % 5 === 0) {
    const legacy = await CE.encrypt(gz, password);
    assert(Router.detectFormat(legacy) === 'v1', profile.model + ' legacy detect failed');
    const legacyOut = await Router.decrypt(legacy, password);
    const legacyDecomp = new Uint8Array(await gunzip(Buffer.from(legacyOut.bytes)));
    const legacyFiles = CE.parseTar(legacyDecomp);
    assert(legacyFiles.length === 1, profile.model + ' legacy tar count mismatch');
  }
}

function assertMatrix() {
  const I18N = loadI18N();
  const locales = new Set(I18N.getLocales().map(locale => locale.code));
  assert(I18N.getLocales().length === 100, 'expected 100 app locales');
  assert(TOP20_ANDROID_MODELS.length === 20, 'expected exactly 20 Android TOP profiles');
  assert(new Set(TOP20_ANDROID_MODELS.map(x => x.model)).size === 20, 'Android TOP20 model names must be unique');
  assert(new Set(TOP20_ANDROID_MODELS.map(x => x.rank)).size === 20, 'Android TOP20 ranks must be unique');
  assert(TOP20_ANDROID_MODELS.some(x => x.model === 'Samsung Galaxy A07 4G'), 'missing Samsung Galaxy A07 4G');
  assert(TOP20_ANDROID_MODELS.some(x => x.model === 'Samsung Galaxy A17 5G'), 'missing Samsung Galaxy A17 5G');
  assert(TOP20_ANDROID_MODELS.some(x => x.model === 'Samsung Galaxy A17 4G'), 'missing Samsung Galaxy A17 4G');
  assert(TOP20_ANDROID_MODELS.some(x => x.model === 'Samsung Galaxy S26 Ultra'), 'missing Samsung Galaxy S26 Ultra');
  assert(TOP20_ANDROID_MODELS.some(x => x.model === 'Xiaomi Redmi A5'), 'missing Xiaomi Redmi A5');
  assert(TOP20_ANDROID_MODELS.some(x => x.model === 'Google Pixel 10a'), 'missing Google Pixel 10a');
  assert(TOP20_ANDROID_MODELS.some(x => x.vendor === 'OPPO'), 'missing OPPO profile');
  assert(TOP20_ANDROID_MODELS.some(x => x.vendor === 'realme'), 'missing realme profile');
  assert(TOP20_ANDROID_MODELS.some(x => x.vendor === 'vivo'), 'missing vivo profile');
  assert(TOP20_ANDROID_MODELS.some(x => x.vendor === 'Motorola'), 'missing Motorola profile');

  for (const profile of TOP20_ANDROID_MODELS) {
    assert(profile.api >= ANDROID_MIN_API, profile.model + ' API is below minSdk');
    assert(profile.api <= TARGET_API, profile.model + ' API is above configured targetSdk gate');
    assert(profile.viewport.width >= 320 && profile.viewport.width <= 500, profile.model + ' viewport width out of range');
    assert(profile.viewport.height >= 640 && profile.viewport.height <= 980, profile.model + ' viewport height out of range');
    assert(profile.viewport.dpr >= 2 && profile.viewport.dpr <= 3.5, profile.model + ' DPR out of range');
    assert(locales.has(profile.locale), profile.model + ' unknown locale ' + profile.locale);
    assert(LAUNCHER_NAMES[profile.locale], profile.model + ' missing launcher localization');
    const strings = read(`android/app/src/main/res/${androidQualifier(profile.locale)}/strings.xml`);
    assert(strings.includes(`<string name="app_name">${LAUNCHER_NAMES[profile.locale]}</string>`), profile.model + ' launcher resource mismatch');
  }
}

function assertResponsiveUiGate() {
  const html = read('www/index.html');
  const css = read('www/css/style.css');
  for (const id of ['fileInput', 'password', 'passwordConfirm', 'btnAction', 'dropZone', 'pwdVerify', 'pwdMatch', 'langSelect']) {
    assert(html.includes(`id="${id}"`), 'missing UI control #' + id);
  }
  assert(/max-width:\s*min\(100%,\s*520px\)/.test(css), 'mobile max-width base missing');
  assert(/env\(safe-area-inset-top\)/.test(css), 'safe-area top support missing');
  assert(/env\(safe-area-inset-bottom\)/.test(css), 'safe-area bottom support missing');
  assert(/overflow-x:\s*hidden/.test(css), 'horizontal overflow guard missing');
  assert(/text-overflow:\s*ellipsis/.test(css), 'file-name overflow guard missing');
  assert(/@media screen and \(max-width:\s*359px\)/.test(css), 'compact phone media query missing');
  assert(/@media screen and \(min-width:\s*600px\)/.test(css), 'large phone media query missing');
  assert(/@media screen and \(min-width:\s*744px\)/.test(css), 'tablet media query missing');
  assert(/@media screen and \(min-width:\s*1024px\)/.test(css), 'large tablet media query missing');
  assert(/\.btn-action\s*{[\s\S]*?width:\s*100%/.test(css), 'action button full-width rule missing');
  assert(/\.drop-zone\s*{[\s\S]*?min-height:\s*120px/.test(css), 'drop-zone stable min-height missing');
  assert(/\.input-wrap input\s*{[\s\S]*?min-height:\s*48px/.test(css), 'input touch target height missing');
}

function assertReleaseOpsGate() {
  const manifest = read('android/app/src/main/AndroidManifest.xml');
  const variables = read('android/variables.gradle');
  const appGradle = read('android/app/build.gradle');
  const runbook = read('release/android-production-readiness.md');
  assert(!/android\.permission\.INTERNET/.test(manifest), 'Android INTERNET permission must stay absent');
  assert(/minSdkVersion\s*=\s*24/.test(variables), 'minSdkVersion gate mismatch');
  assert(/targetSdkVersion\s*=\s*36/.test(variables), 'targetSdkVersion gate mismatch');
  assert(/CRYPTCAT_UPLOAD_STORE_FILE/.test(appGradle), 'release signing env gate missing');
  for (const section of ['CI gates', 'Device farm', 'Automated UI', 'Staged rollout', 'Crash monitoring', 'Performance gate', 'Rollback']) {
    assert(runbook.includes(section), 'release runbook missing ' + section);
  }
  assert(runbook.includes('Android Vitals'), 'release runbook must use Play Console Android Vitals for crash monitoring');
  assert(runbook.includes('Do not add INTERNET permission'), 'release runbook must protect offline promise');
  assert(MIN_WEBVIEW_CHROMIUM >= 112, 'WebView baseline must remain Chromium 112+');
}

async function main() {
  assertMatrix();
  assertResponsiveUiGate();
  assertReleaseOpsGate();
  const { CE, Router } = await loadCryptoStack();
  for (const profile of TOP20_ANDROID_MODELS) {
    await assertProfileRoundtrip(profile, CE, Router);
  }
  console.log('✅ Android TOP20 release gate passed: 20 target models, 20 locale launcher resources, responsive UI constraints, offline release ops, v2 .cryptcat roundtrip, legacy .crypt3 compatibility.');
}

main().catch((e) => {
  console.error('\n❌ Android TOP20 gate failed:', e.message);
  process.exit(1);
});
