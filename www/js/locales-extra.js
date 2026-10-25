/**
 * locales-extra.js – Extends CryptCat language registry to 100 locales.
 */
(function () {
  'use strict';

  if (!window.CRYPT3_LOCALES) return;

  var extraLocales = [
    { code: 'zh-Hant', native: '繁體中文', english: 'Chinese (Traditional)', rtl: false, tags: ['zh-Hant', 'zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant-TW', 'zh-Hant-HK', 'zh-Hant-MO'] },
    { code: 'yue', native: '粵語', english: 'Cantonese', rtl: false, tags: ['yue', 'yue-HK', 'zh-yue'] },
    { code: 'wuu', native: '吴语', english: 'Wu Chinese', rtl: false, tags: ['wuu', 'wuu-CN', 'zh-wuu'] },
    { code: 'jv', native: 'Basa Jawa', english: 'Javanese', rtl: false, tags: ['jv', 'jv-ID', 'jw', 'jw-ID'] },
    { code: 'bho', native: 'भोजपुरी', english: 'Bhojpuri', rtl: false, tags: ['bho', 'bho-IN', 'bho-NP'] },
    { code: 'mai', native: 'मैथिली', english: 'Maithili', rtl: false, tags: ['mai', 'mai-IN', 'mai-NP'] },
    { code: 'mag', native: 'मगही', english: 'Magahi', rtl: false, tags: ['mag', 'mag-IN'] },
    { code: 'awa', native: 'अवधी', english: 'Awadhi', rtl: false, tags: ['awa', 'awa-IN'] },
    { code: 'hne', native: 'छत्तीसगढ़ी', english: 'Chhattisgarhi', rtl: false, tags: ['hne', 'hne-IN'] },
    { code: 'ckb', native: 'کوردیی ناوەندی', english: 'Central Kurdish', rtl: true, tags: ['ckb', 'ckb-IQ', 'ckb-IR', 'ku-Arab'] },
    { code: 'ku', native: 'Kurdî', english: 'Kurdish', rtl: false, tags: ['ku', 'ku-TR', 'ku-Latn'] },
    { code: 'om', native: 'Afaan Oromoo', english: 'Oromo', rtl: false, tags: ['om', 'om-ET', 'om-KE'] },
    { code: 'ig', native: 'Igbo', english: 'Igbo', rtl: false, tags: ['ig', 'ig-NG'] },
    { code: 'zu', native: 'isiZulu', english: 'Zulu', rtl: false, tags: ['zu', 'zu-ZA'] },
    { code: 'xh', native: 'isiXhosa', english: 'Xhosa', rtl: false, tags: ['xh', 'xh-ZA'] },
    { code: 'rw', native: 'Kinyarwanda', english: 'Kinyarwanda', rtl: false, tags: ['rw', 'rw-RW'] },
    { code: 'sn', native: 'chiShona', english: 'Shona', rtl: false, tags: ['sn', 'sn-ZW'] },
    { code: 'so', native: 'Soomaali', english: 'Somali', rtl: false, tags: ['so', 'so-SO', 'so-ET', 'so-KE'] },
    { code: 'ln', native: 'Lingála', english: 'Lingala', rtl: false, tags: ['ln', 'ln-CD', 'ln-CG'] },
    { code: 'ny', native: 'Chichewa', english: 'Chichewa', rtl: false, tags: ['ny', 'ny-MW', 'ny-ZM'] },
    { code: 'ak', native: 'Akan', english: 'Akan', rtl: false, tags: ['ak', 'ak-GH', 'tw', 'tw-GH'] },
    { code: 'ff', native: 'Fulfulde', english: 'Fulah', rtl: false, tags: ['ff', 'ff-Latn', 'ff-SN', 'ff-NG'] },
    { code: 'mg', native: 'Malagasy', english: 'Malagasy', rtl: false, tags: ['mg', 'mg-MG'] },
    { code: 'ceb', native: 'Cebuano', english: 'Cebuano', rtl: false, tags: ['ceb', 'ceb-PH'] },
    { code: 'ilo', native: 'Ilokano', english: 'Ilocano', rtl: false, tags: ['ilo', 'ilo-PH'] },
    { code: 'hmn', native: 'Hmoob', english: 'Hmong', rtl: false, tags: ['hmn', 'hmn-US', 'hmn-CN'] },
    { code: 'lo', native: 'ລາວ', english: 'Lao', rtl: false, tags: ['lo', 'lo-LA'] },
    { code: 'ka', native: 'ქართული', english: 'Georgian', rtl: false, tags: ['ka', 'ka-GE'] },
    { code: 'hy', native: 'Հայերեն', english: 'Armenian', rtl: false, tags: ['hy', 'hy-AM'] },
    { code: 'bg', native: 'Български', english: 'Bulgarian', rtl: false, tags: ['bg', 'bg-BG'] },
    { code: 'sr', native: 'Српски', english: 'Serbian', rtl: false, tags: ['sr', 'sr-RS', 'sr-Cyrl', 'sr-Latn'] },
    { code: 'hr', native: 'Hrvatski', english: 'Croatian', rtl: false, tags: ['hr', 'hr-HR'] },
    { code: 'bs', native: 'Bosanski', english: 'Bosnian', rtl: false, tags: ['bs', 'bs-BA'] },
    { code: 'sk', native: 'Slovenčina', english: 'Slovak', rtl: false, tags: ['sk', 'sk-SK'] },
    { code: 'da', native: 'Dansk', english: 'Danish', rtl: false, tags: ['da', 'da-DK'] },
    { code: 'no', native: 'Norsk', english: 'Norwegian', rtl: false, tags: ['no', 'nb', 'nn', 'nb-NO', 'nn-NO'] },
    { code: 'fi', native: 'Suomi', english: 'Finnish', rtl: false, tags: ['fi', 'fi-FI'] },
    { code: 'lt', native: 'Lietuvių', english: 'Lithuanian', rtl: false, tags: ['lt', 'lt-LT'] },
    { code: 'lv', native: 'Latviešu', english: 'Latvian', rtl: false, tags: ['lv', 'lv-LV'] },
    { code: 'et', native: 'Eesti', english: 'Estonian', rtl: false, tags: ['et', 'et-EE'] },
    { code: 'sl', native: 'Slovenščina', english: 'Slovenian', rtl: false, tags: ['sl', 'sl-SI'] },
    { code: 'mk', native: 'Македонски', english: 'Macedonian', rtl: false, tags: ['mk', 'mk-MK'] },
    { code: 'sq', native: 'Shqip', english: 'Albanian', rtl: false, tags: ['sq', 'sq-AL', 'sq-XK'] },
    { code: 'kk', native: 'Қазақша', english: 'Kazakh', rtl: false, tags: ['kk', 'kk-KZ', 'kk-Cyrl'] },
    { code: 'ky', native: 'Кыргызча', english: 'Kyrgyz', rtl: false, tags: ['ky', 'ky-KG'] },
    { code: 'tg', native: 'Тоҷикӣ', english: 'Tajik', rtl: false, tags: ['tg', 'tg-TJ'] },
    { code: 'tk', native: 'Türkmençe', english: 'Turkmen', rtl: false, tags: ['tk', 'tk-TM'] },
    { code: 'mn', native: 'Монгол', english: 'Mongolian', rtl: false, tags: ['mn', 'mn-MN'] },
    { code: 'be', native: 'Беларуская', english: 'Belarusian', rtl: false, tags: ['be', 'be-BY'] },
    { code: 'ca', native: 'Català', english: 'Catalan', rtl: false, tags: ['ca', 'ca-ES', 'ca-AD'] }
  ];

  var registry = window.CRYPT3_LOCALES;
  for (var i = 0; i < extraLocales.length; i++) {
    var loc = extraLocales[i];
    if (!registry.byCode[loc.code]) registry.list.push(loc);
    registry.byCode[loc.code] = loc;
    if (loc.rtl && registry.rtlCodes.indexOf(loc.code) === -1) registry.rtlCodes.push(loc.code);
    for (var j = 0; j < loc.tags.length; j++) registry.tagMap[loc.tags[j].toLowerCase()] = loc.code;
    registry.tagMap[loc.code.toLowerCase()] = loc.code;
  }
})();
