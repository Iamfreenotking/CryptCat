#!/usr/bin/env node
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { ANDROID_LOCALE_ALIASES, LAUNCHER_NAMES, androidAliasQualifier, androidQualifier } from './launcher-locales.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const iosAppDir = path.join(root, 'ios/App/App');
const androidResDir = path.join(root, 'android/app/src/main/res');
const pbxprojPath = path.join(root, 'ios/App/App.xcodeproj/project.pbxproj');

function loadLocaleCodes() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const rel of ['www/js/locales.js', 'www/js/locales-extra.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel });
  }
  return ctx.window.CRYPT3_LOCALES.list.map(loc => loc.code);
}

function quotePbx(value) {
  return /^[A-Za-z0-9_.$/]+$/.test(value) ? value : `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function pbxId(seed) {
  return ('CC' + crypto.createHash('sha1').update(seed).digest('hex').slice(0, 22)).toUpperCase();
}

function escapeInfoPlist(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function writeIfChanged(file, content) {
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function writeIosStrings(localeCode, name) {
  const content = `"CFBundleDisplayName" = "${escapeInfoPlist(name)}";\n"CFBundleName" = "${escapeInfoPlist(name)}";\n`;
  writeIfChanged(path.join(iosAppDir, `${localeCode}.lproj/InfoPlist.strings`), content);
}

function writeAndroidStrings(valuesDir, name) {
  const content = `<?xml version='1.0' encoding='utf-8'?>\n<resources>\n    <string name="app_name">${escapeXml(name)}</string>\n    <string name="title_activity_main">${escapeXml(name)}</string>\n    <string name="package_name">com.bullbullgo.crypt3</string>\n    <string name="custom_url_scheme">com.bullbullgo.crypt3</string>\n</resources>\n`;
  writeIfChanged(path.join(androidResDir, valuesDir, 'strings.xml'), content);
}

function updateXcodeProject(localeCodes) {
  let pbx = fs.readFileSync(pbxprojPath, 'utf8');
  const variantId = pbxId('launcher-info-plist-variant');
  const buildId = pbxId('launcher-info-plist-build');

  pbx = pbx.replace(/knownRegions = \([\s\S]*?\);/, () => {
    const regions = ['en', ...localeCodes.filter(code => code !== 'en'), 'Base'];
    const lines = regions.map(code => `\t\t\t\t${quotePbx(code)},`).join('\n');
    return `knownRegions = (\n${lines}\n\t\t\t);`;
  });

  if (!pbx.includes(`${variantId} /* InfoPlist.strings */`)) {
    const fileRefs = localeCodes.map(code => {
      const id = pbxId(`launcher-info-plist-file-${code}`);
      return `\t\t${id} /* ${code} */ = {isa = PBXFileReference; lastKnownFileType = text.plist.strings; name = ${quotePbx(code)}; path = ${quotePbx(`${code}.lproj/InfoPlist.strings`)}; sourceTree = "<group>"; };`;
    }).join('\n');

    pbx = pbx.replace('/* End PBXBuildFile section */', `\t\t${buildId} /* InfoPlist.strings in Resources */ = {isa = PBXBuildFile; fileRef = ${variantId} /* InfoPlist.strings */; };\n/* End PBXBuildFile section */`);
    pbx = pbx.replace('/* End PBXFileReference section */', `${fileRefs}\n/* End PBXFileReference section */`);
    pbx = pbx.replace(/\t\t\t\t504EC3131FED79650016851F \/\* Info\.plist \*\/,/, `\t\t\t\t${variantId} /* InfoPlist.strings */,\n\t\t\t\t504EC3131FED79650016851F /* Info.plist */,`);
    pbx = pbx.replace(/\t\t\t\t504EC3121FED79650016851F \/\* LaunchScreen\.storyboard in Resources \*\/,/, `\t\t\t\t${buildId} /* InfoPlist.strings in Resources */,\n\t\t\t\t504EC3121FED79650016851F /* LaunchScreen.storyboard in Resources */,`);

    const children = localeCodes.map(code => `\t\t\t\t${pbxId(`launcher-info-plist-file-${code}`)} /* ${code} */,`).join('\n');
    const variant = `\t\t${variantId} /* InfoPlist.strings */ = {\n\t\t\tisa = PBXVariantGroup;\n\t\t\tchildren = (\n${children}\n\t\t\t);\n\t\t\tname = InfoPlist.strings;\n\t\t\tsourceTree = "<group>";\n\t\t};\n`;
    pbx = pbx.replace('/* End PBXVariantGroup section */', `${variant}/* End PBXVariantGroup section */`);
  }

  fs.writeFileSync(pbxprojPath, pbx);
}

const localeCodes = loadLocaleCodes();
const missing = localeCodes.filter(code => !LAUNCHER_NAMES[code]);
const extra = Object.keys(LAUNCHER_NAMES).filter(code => !localeCodes.includes(code));
if (missing.length || extra.length) {
  throw new Error(`Launcher localization map mismatch. Missing: ${missing.join(',') || '-'} Extra: ${extra.join(',') || '-'}`);
}

for (const code of localeCodes) {
  const name = LAUNCHER_NAMES[code];
  writeIosStrings(code, name);
  writeAndroidStrings(androidQualifier(code), name);
  for (const alias of ANDROID_LOCALE_ALIASES[code] || []) {
    writeAndroidStrings(androidAliasQualifier(alias), name);
  }
}

updateXcodeProject(localeCodes);
console.log(`Generated launcher display names for ${localeCodes.length} locales.`);
