#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { ANDROID_LOCALE_ALIASES, LAUNCHER_NAMES, androidAliasQualifier, androidQualifier } from './launcher-locales.mjs';

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

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function countChars(value) {
  return Array.from(value).length;
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeInfoPlist(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

const localeCodes = loadLocaleCodes();
assert(localeCodes.length === 100, 'expected 100 locale codes');

const missing = localeCodes.filter(code => !LAUNCHER_NAMES[code]);
const extra = Object.keys(LAUNCHER_NAMES).filter(code => !localeCodes.includes(code));
assert(missing.length === 0, 'missing launcher names: ' + missing.join(','));
assert(extra.length === 0, 'extra launcher names: ' + extra.join(','));

for (const code of localeCodes) {
  const name = LAUNCHER_NAMES[code];
  assert(name.trim() === name && name.length > 0, code + ' launcher name is blank or padded');
  assert(countChars(name) <= 16, code + ' launcher name is too long: ' + name);
  assert(!/[=+]/.test(name), code + ' launcher name must not include title punctuation: ' + name);

  const iosRel = `ios/App/App/${code}.lproj/InfoPlist.strings`;
  const ios = read(iosRel);
  assert(ios.includes(`"CFBundleDisplayName" = "${escapeInfoPlist(name)}";`), iosRel + ' missing display name');
  assert(ios.includes(`"CFBundleName" = "${escapeInfoPlist(name)}";`), iosRel + ' missing bundle name');

  const androidRel = `android/app/src/main/res/${androidQualifier(code)}/strings.xml`;
  const android = read(androidRel);
  assert(android.includes(`<string name="app_name">${escapeXml(name)}</string>`), androidRel + ' missing app_name');
  assert(android.includes(`<string name="title_activity_main">${escapeXml(name)}</string>`), androidRel + ' missing title_activity_main');
}

for (const [code, aliases] of Object.entries(ANDROID_LOCALE_ALIASES)) {
  for (const alias of aliases) {
    const rel = `android/app/src/main/res/${androidAliasQualifier(alias)}/strings.xml`;
    assert(fs.existsSync(path.join(root, rel)), rel + ' missing Android legacy alias resource');
    assert(read(rel).includes(`<string name="app_name">${escapeXml(LAUNCHER_NAMES[code])}</string>`), rel + ' wrong alias app_name');
  }
}

const androidDefault = read('android/app/src/main/res/values/strings.xml');
assert(androidDefault.includes('<string name="app_name">CryptCat</string>'), 'default Android app_name must remain CryptCat');

const pbxproj = read('ios/App/App.xcodeproj/project.pbxproj');
assert(pbxproj.includes('InfoPlist.strings in Resources'), 'Xcode project must copy InfoPlist.strings resources');
for (const code of localeCodes) {
  assert(pbxproj.includes(`${code}.lproj/InfoPlist.strings`), 'Xcode project missing ' + code + ' InfoPlist.strings');
}

console.log('✅ Launcher localization tests passed: 100 iOS/Android desktop names, short labels, Android legacy aliases.');
