#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const storeRoot = path.join(root, 'store-listings');

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function countChars(value) {
  return Array.from(String(value || '')).length;
}

function listMetadataFiles(platform) {
  const dir = path.join(storeRoot, platform);
  const out = [];
  for (const locale of fs.readdirSync(dir)) {
    const file = path.join(dir, locale, 'metadata.json');
    if (fs.existsSync(file)) out.push(file);
  }
  return out.sort();
}

function assertNoRiskyClaims(data, rel) {
  const allText = [
    data.title, data.subtitle, data.shortDescription, data.promotionalText,
    data.fullDescription, data.keywords, data.whatsNew
  ].join('\n').toLowerCase();
  const risky = [
    'unbreakable', 'military grade', 'military-grade', 'guaranteed secure',
    '100% secure', 'absolutely secure', 'cannot be hacked', 'hack-proof',
    '绝对安全', '无法破解', '军事级', '100%安全', '完全安全'
  ];
  for (const phrase of risky) {
    assert(!allText.includes(phrase.toLowerCase()), `${rel} contains risky claim: ${phrase}`);
  }
}

function assertCommon(data, rel) {
  for (const field of ['title', 'subtitle', 'shortDescription', 'promotionalText', 'fullDescription', 'keywords', 'whatsNew']) {
    assert(typeof data[field] === 'string' && data[field].trim(), `${rel} missing ${field}`);
  }
  assert(data.supportUrl === 'https://bullbullgo.com/support/cryptcat', `${rel} wrong supportUrl`);
  assert(data.privacyPolicyUrl === 'https://bullbullgo.com/privacy/cryptcat', `${rel} wrong privacyPolicyUrl`);
  assert(data.compliance?.noAccounts === true, `${rel} must state noAccounts compliance`);
  assert(data.compliance?.noAds === true, `${rel} must state noAds compliance`);
  assert(data.compliance?.noAnalytics === true, `${rel} must state noAnalytics compliance`);
  assert(data.compliance?.noInternetRequiredForCoreCrypto === true, `${rel} must state offline crypto compliance`);
  assert(data.fullDescription.includes('.cryptcat'), `${rel} must mention .cryptcat`);
  assert(data.fullDescription.includes('.crypt3'), `${rel} must mention legacy .crypt3 compatibility`);
  assert(countChars(data.fullDescription) <= 4000, `${rel} fullDescription too long`);
  assertNoRiskyClaims(data, rel);
}

function assertApple(data, rel) {
  assertCommon(data, rel);
  assert(data.platform === 'app-store', `${rel} wrong platform`);
  assert(countChars(data.appName) <= 30, `${rel} appName too long`);
  assert(countChars(data.title) <= 30, `${rel} title too long`);
  assert(countChars(data.subtitle) <= 30, `${rel} subtitle too long`);
  assert(countChars(data.promotionalText) <= 170, `${rel} promotionalText too long`);
  assert(countChars(data.keywords) <= 100, `${rel} keywords too long`);
}

function assertGoogle(data, rel) {
  assertCommon(data, rel);
  assert(data.platform === 'google-play', `${rel} wrong platform`);
  assert(countChars(data.googlePlayTitle) <= 30, `${rel} googlePlayTitle too long`);
  assert(countChars(data.title) <= 30, `${rel} title too long`);
  assert(countChars(data.shortDescription) <= 80, `${rel} shortDescription too long`);
}

const manifest = readJson(path.join(storeRoot, 'manifest.json'));
assert(manifest.counts.appStoreLocales === 50, 'expected 50 App Store locales');
assert(manifest.counts.googlePlayLocales === 86, 'expected 86 Google Play locales');
assert(manifest.counts.appInterfaceLocales === 100, 'expected 100 in-app locales');

const appleFiles = listMetadataFiles('app-store');
const googleFiles = listMetadataFiles('google-play');
assert(appleFiles.length === manifest.counts.appStoreLocales, 'App Store metadata count mismatch');
assert(googleFiles.length === manifest.counts.googlePlayLocales, 'Google Play metadata count mismatch');
assert(fs.existsSync(path.join(storeRoot, 'app-store/all-localizations.csv')), 'missing App Store CSV');
assert(fs.existsSync(path.join(storeRoot, 'google-play/all-localizations.csv')), 'missing Google Play CSV');

for (const file of appleFiles) {
  assertApple(readJson(file), path.relative(root, file));
}
for (const file of googleFiles) {
  assertGoogle(readJson(file), path.relative(root, file));
}

console.log(`✅ Store listing localization tests passed: ${appleFiles.length} App Store locales, ${googleFiles.length} Google Play locales, ${manifest.counts.appInterfaceLocales} in-app locales.`);
