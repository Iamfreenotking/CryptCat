/**
 * locales.js – Base 50 language registry; locales-extra.js extends this to 100.
 * Exposed as window.CRYPT3_LOCALES
 */
(function () {
  'use strict';

  /* code, nativeName, englishName, rtl, matchTags (BCP-47 variants) */
  var LOCALE_LIST = [
    { code: 'en',      native: 'English',             english: 'English',             rtl: false, tags: ['en', 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN', 'en-NZ', 'en-SG', 'en-ZA'] },
    { code: 'zh-Hans', native: '简体中文',             english: 'Chinese (Simplified)',  rtl: false, tags: ['zh', 'zh-CN', 'zh-Hans', 'zh-SG', 'zh-MY', 'zh-Hans-CN'] },
    { code: 'hi',      native: 'हिन्दी',              english: 'Hindi',               rtl: false, tags: ['hi', 'hi-IN'] },
    { code: 'es',      native: 'Español',             english: 'Spanish',             rtl: false, tags: ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE', 'es-US'] },
    { code: 'ar',      native: 'العربية',             english: 'Arabic',              rtl: true,  tags: ['ar', 'ar-SA', 'ar-EG', 'ar-AE', 'ar-IQ', 'ar-MA', 'ar-DZ', 'ar-KW'] },
    { code: 'fr',      native: 'Français',            english: 'French',              rtl: false, tags: ['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'] },
    { code: 'bn',      native: 'বাংলা',               english: 'Bengali',             rtl: false, tags: ['bn', 'bn-BD', 'bn-IN'] },
    { code: 'pt',      native: 'Português',           english: 'Portuguese',          rtl: false, tags: ['pt', 'pt-BR', 'pt-PT'] },
    { code: 'ru',      native: 'Русский',             english: 'Russian',             rtl: false, tags: ['ru', 'ru-RU'] },
    { code: 'id',      native: 'Bahasa Indonesia',    english: 'Indonesian',          rtl: false, tags: ['id', 'id-ID', 'in', 'in-ID'] },
    { code: 'ur',      native: 'اردو',                english: 'Urdu',                rtl: true,  tags: ['ur', 'ur-PK', 'ur-IN'] },
    { code: 'de',      native: 'Deutsch',             english: 'German',              rtl: false, tags: ['de', 'de-DE', 'de-AT', 'de-CH'] },
    { code: 'ja',      native: '日本語',               english: 'Japanese',            rtl: false, tags: ['ja', 'ja-JP'] },
    { code: 'sw',      native: 'Kiswahili',           english: 'Swahili',             rtl: false, tags: ['sw', 'sw-KE', 'sw-TZ'] },
    { code: 'mr',      native: 'मराठी',               english: 'Marathi',             rtl: false, tags: ['mr', 'mr-IN'] },
    { code: 'te',      native: 'తెలుగు',              english: 'Telugu',              rtl: false, tags: ['te', 'te-IN'] },
    { code: 'tr',      native: 'Türkçe',              english: 'Turkish',             rtl: false, tags: ['tr', 'tr-TR'] },
    { code: 'ta',      native: 'தமிழ்',               english: 'Tamil',               rtl: false, tags: ['ta', 'ta-IN', 'ta-LK', 'ta-SG'] },
    { code: 'vi',      native: 'Tiếng Việt',          english: 'Vietnamese',          rtl: false, tags: ['vi', 'vi-VN'] },
    { code: 'ko',      native: '한국어',               english: 'Korean',              rtl: false, tags: ['ko', 'ko-KR', 'ko-KP'] },
    { code: 'it',      native: 'Italiano',            english: 'Italian',             rtl: false, tags: ['it', 'it-IT', 'it-CH'] },
    { code: 'th',      native: 'ไทย',                 english: 'Thai',                rtl: false, tags: ['th', 'th-TH'] },
    { code: 'gu',      native: 'ગુજરાતી',             english: 'Gujarati',            rtl: false, tags: ['gu', 'gu-IN'] },
    { code: 'pl',      native: 'Polski',              english: 'Polish',              rtl: false, tags: ['pl', 'pl-PL'] },
    { code: 'uk',      native: 'Українська',          english: 'Ukrainian',           rtl: false, tags: ['uk', 'uk-UA'] },
    { code: 'ms',      native: 'Bahasa Melayu',       english: 'Malay',               rtl: false, tags: ['ms', 'ms-MY', 'ms-SG', 'ms-BN'] },
    { code: 'fa',      native: 'فارسی',               english: 'Persian',             rtl: true,  tags: ['fa', 'fa-IR', 'fa-AF'] },
    { code: 'kn',      native: 'ಕನ್ನಡ',               english: 'Kannada',             rtl: false, tags: ['kn', 'kn-IN'] },
    { code: 'ml',      native: 'മലയാളം',              english: 'Malayalam',           rtl: false, tags: ['ml', 'ml-IN'] },
    { code: 'or',      native: 'ଓଡ଼ିଆ',               english: 'Odia',                rtl: false, tags: ['or', 'or-IN'] },
    { code: 'my',      native: 'မြန်မာဘာသာ',          english: 'Burmese',             rtl: false, tags: ['my', 'my-MM'] },
    { code: 'ha',      native: 'Hausa',               english: 'Hausa',               rtl: false, tags: ['ha', 'ha-NG', 'ha-GH'] },
    { code: 'pa',      native: 'ਪੰਜਾਬੀ',              english: 'Punjabi',             rtl: false, tags: ['pa', 'pa-IN', 'pa-PK', 'pa-Guru'] },
    { code: 'yo',      native: 'Yorùbá',              english: 'Yoruba',              rtl: false, tags: ['yo', 'yo-NG', 'yo-BJ'] },
    { code: 'am',      native: 'አማርኛ',                english: 'Amharic',             rtl: false, tags: ['am', 'am-ET'] },
    { code: 'ro',      native: 'Română',              english: 'Romanian',            rtl: false, tags: ['ro', 'ro-RO', 'ro-MD'] },
    { code: 'nl',      native: 'Nederlands',          english: 'Dutch',               rtl: false, tags: ['nl', 'nl-NL', 'nl-BE'] },
    { code: 'fil',     native: 'Filipino',            english: 'Filipino',            rtl: false, tags: ['fil', 'tl', 'tl-PH', 'fil-PH'] },
    { code: 'ps',      native: 'پښتو',                english: 'Pashto',              rtl: true,  tags: ['ps', 'ps-AF', 'ps-PK'] },
    { code: 'uz',      native: 'Oʻzbek',              english: 'Uzbek',               rtl: false, tags: ['uz', 'uz-UZ', 'uz-Latn', 'uz-Cyrl'] },
    { code: 'sd',      native: 'سنڌي',                english: 'Sindhi',              rtl: true,  tags: ['sd', 'sd-PK', 'sd-IN'] },
    { code: 'az',      native: 'Azərbaycan',          english: 'Azerbaijani',         rtl: false, tags: ['az', 'az-AZ', 'az-Latn', 'az-Cyrl'] },
    { code: 'ne',      native: 'नेपाली',              english: 'Nepali',              rtl: false, tags: ['ne', 'ne-NP', 'ne-IN'] },
    { code: 'si',      native: 'සිංහල',               english: 'Sinhala',             rtl: false, tags: ['si', 'si-LK'] },
    { code: 'km',      native: 'ភាសាខ្មែរ',            english: 'Khmer',               rtl: false, tags: ['km', 'km-KH'] },
    { code: 'he',      native: 'עברית',               english: 'Hebrew',              rtl: true,  tags: ['he', 'he-IL', 'iw', 'iw-IL'] },
    { code: 'el',      native: 'Ελληνικά',            english: 'Greek',               rtl: false, tags: ['el', 'el-GR', 'el-CY'] },
    { code: 'cs',      native: 'Čeština',             english: 'Czech',               rtl: false, tags: ['cs', 'cs-CZ'] },
    { code: 'sv',      native: 'Svenska',             english: 'Swedish',             rtl: false, tags: ['sv', 'sv-SE', 'sv-FI'] },
    { code: 'hu',      native: 'Magyar',              english: 'Hungarian',           rtl: false, tags: ['hu', 'hu-HU'] }
  ];

  var BY_CODE = {};
  var TAG_MAP = {};
  var RTL_CODES = [];

  for (var i = 0; i < LOCALE_LIST.length; i++) {
    var loc = LOCALE_LIST[i];
    BY_CODE[loc.code] = loc;
    if (loc.rtl) RTL_CODES.push(loc.code);
    for (var j = 0; j < loc.tags.length; j++) {
      TAG_MAP[loc.tags[j].toLowerCase()] = loc.code;
    }
    TAG_MAP[loc.code.toLowerCase()] = loc.code;
  }

  /* locales-extra.js overrides these when the 100-locale bundle is loaded. */
  TAG_MAP['zh-tw'] = null;
  TAG_MAP['zh-hk'] = null;
  TAG_MAP['zh-mo'] = null;
  TAG_MAP['zh-hant'] = null;
  TAG_MAP['zh-hant-tw'] = null;
  TAG_MAP['zh-hant-hk'] = null;

  window.CRYPT3_LOCALES = {
    list: LOCALE_LIST,
    byCode: BY_CODE,
    tagMap: TAG_MAP,
    rtlCodes: RTL_CODES
  };
})();
