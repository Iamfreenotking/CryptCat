#!/usr/bin/env node
import fs from 'fs';
import os from 'os';
import path from 'path';
import vm from 'vm';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { ANDROID_LOCALE_ALIASES, LAUNCHER_NAMES } from './launcher-locales.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function loadLocaleCodes() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const rel of ['www/js/locales.js', 'www/js/locales-extra.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel });
  }
  return ctx.window.CRYPT3_LOCALES.list.map(loc => loc.code);
}

function latestExisting(paths) {
  return paths
    .filter(file => fs.existsSync(file))
    .map(file => ({ file, mtimeMs: fs.statSync(file).mtimeMs }))
    .sort((a, b) => b.mtimeMs - a.mtimeMs)[0]?.file;
}

function findLatestIosAppBundle() {
  if (process.env.IOS_APP_BUNDLE) return process.env.IOS_APP_BUNDLE;
  const derivedData = path.join(os.homedir(), 'Library/Developer/Xcode/DerivedData');
  if (!fs.existsSync(derivedData)) return '';
  const candidates = [];
  for (const dir of fs.readdirSync(derivedData)) {
    if (!dir.startsWith('App-')) continue;
    candidates.push(path.join(derivedData, dir, 'Build/Products/Debug-iphonesimulator/App.app'));
    candidates.push(path.join(derivedData, dir, 'Build/Products/Release-iphonesimulator/App.app'));
  }
  return latestExisting(candidates) || '';
}

function readIosStrings(file) {
  const result = spawnSync('/usr/bin/plutil', ['-convert', 'json', '-o', '-', file], { encoding: 'utf8' });
  assert(result.status === 0, `plutil failed for ${file}: ${result.stderr}`);
  return JSON.parse(result.stdout);
}

function findAndroidApk() {
  if (process.env.ANDROID_APK) return process.env.ANDROID_APK;
  return path.join(root, 'android/app/build/outputs/apk/debug/app-debug.apk');
}

function findAapt2() {
  if (process.env.AAPT2) return process.env.AAPT2;
  const buildTools = path.join(os.homedir(), 'Library/Android/sdk/build-tools');
  assert(fs.existsSync(buildTools), 'Android build-tools directory not found');
  const versions = fs.readdirSync(buildTools).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).reverse();
  for (const version of versions) {
    const candidate = path.join(buildTools, version, 'aapt2');
    if (fs.existsSync(candidate)) return candidate;
  }
  return '';
}

function parseAaptStringBlock(dump, resourceName) {
  const start = dump.indexOf(`string/${resourceName}`);
  assert(start >= 0, `APK missing string/${resourceName}`);
  const next = dump.indexOf('\n    resource ', start + 1);
  const block = dump.slice(start, next === -1 ? dump.length : next);
  const values = new Map();
  const lineRe = /^\s+\(([^)]*)\)\s+"([^"\n]*)"$/gm;
  let match;
  while ((match = lineRe.exec(block))) {
    values.set(match[1], match[2]);
  }
  return values;
}

function androidConfig(localeCode) {
  if (localeCode.includes('-')) return `b+${localeCode.replaceAll('-', '+')}`;
  return localeCode;
}

const localeCodes = loadLocaleCodes();
assert(localeCodes.length === 100, 'expected 100 locale codes');

const iosBundle = findLatestIosAppBundle();
assert(iosBundle && fs.existsSync(iosBundle), 'built iOS App.app bundle not found; run xcodebuild first');

for (const code of localeCodes) {
  const file = path.join(iosBundle, `${code}.lproj/InfoPlist.strings`);
  assert(fs.existsSync(file), `built iOS bundle missing ${code}.lproj/InfoPlist.strings`);
  const strings = readIosStrings(file);
  assert(strings.CFBundleDisplayName === LAUNCHER_NAMES[code], `iOS ${code} display name mismatch`);
  assert(strings.CFBundleName === LAUNCHER_NAMES[code], `iOS ${code} bundle name mismatch`);
}

const apk = findAndroidApk();
assert(fs.existsSync(apk), 'built Android APK not found; run assembleDebug first');
const aapt2 = findAapt2();
assert(aapt2 && fs.existsSync(aapt2), 'aapt2 not found');
const dump = spawnSync(aapt2, ['dump', 'resources', apk], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 32 });
assert(dump.status === 0, `aapt2 dump failed: ${dump.stderr}`);

const appNames = parseAaptStringBlock(dump.stdout, 'app_name');
const activityTitles = parseAaptStringBlock(dump.stdout, 'title_activity_main');
assert(appNames.get('') === 'CryptCat', 'Android default app_name must remain CryptCat');
assert(activityTitles.get('') === 'CryptCat', 'Android default title_activity_main must remain CryptCat');

for (const code of localeCodes) {
  const config = androidConfig(code);
  assert(appNames.get(config) === LAUNCHER_NAMES[code], `Android ${code} app_name mismatch`);
  assert(activityTitles.get(config) === LAUNCHER_NAMES[code], `Android ${code} title_activity_main mismatch`);
}

for (const [code, aliases] of Object.entries(ANDROID_LOCALE_ALIASES)) {
  for (const alias of aliases) {
    assert(appNames.get(alias) === LAUNCHER_NAMES[code], `Android alias ${alias} app_name mismatch`);
    assert(activityTitles.get(alias) === LAUNCHER_NAMES[code], `Android alias ${alias} title_activity_main mismatch`);
  }
}

console.log(`✅ Built launcher localization tests passed: ${localeCodes.length} iOS App.app names and ${localeCodes.length} Android APK names verified.`);
