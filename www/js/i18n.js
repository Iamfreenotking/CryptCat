/**
 * i18n.js – Internationalisation module for Crypt3
 * Supports 10 locales including RTL (Arabic, Urdu).
 * Exposed as window.I18N (IIFE, no dependencies).
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  Translation strings – 35 keys × 10 locales                       */
  /* ------------------------------------------------------------------ */
  var translations = {

    /* ---- English --------------------------------------------------- */
    en: {
      appTitle:                'CryptCat = OpenSource + Offline Encryption',
      modeDecrypt:             'Decrypt',
      modeEncrypt:             'Encrypt',
      dropTitleDecrypt:        'Drop .crypt3 file here',
      dropTitleEncrypt:        'Drop file to encrypt here',
      dropHint:                'or tap to select file',
      fileSelected:            'File selected',
      pwdLabel:                'Password',
      pwdLabelDecrypt:         'Decryption Password',
      pwdLabelEncrypt:         'Encryption Password',
      pwdPlaceholder:          'Enter your password',
      confirmLabel:            'Confirm Password',
      confirmPlaceholder:      'Enter password again',
      btnDecrypt:              'Decrypt & Save',
      btnEncrypt:              'Encrypt & Save',
      pwdMatch:                'Passwords match',
      pwdNoMatch:              'Passwords do not match',
      pwdFingerprintMatch:     'Password fingerprint matches',
      pwdFingerprintMismatch:  'Password fingerprint mismatch',
      statusReading:           'Reading file...',
      statusDecrypting:        'Decrypting (AES-256-CBC)...',
      statusEncrypting:        'Encrypting (AES-256-CBC)...',
      statusDecompressing:     'Decompressing (gzip + tar)...',
      statusCompressing:       'Compressing (tar + gzip)...',
      successDecrypt:          'Decryption successful! File saved.',
      successEncrypt:          'Encryption successful! File saved.',
      errorFormat:             'Invalid file format: missing OpenSSL header.',
      errorDecrypt:            'Decryption failed: wrong password or corrupted file.',
      errorNoFiles:            'No files found after decompression.',
      errorDecryptPwd:         'Decryption failed: incorrect password or corrupted file.',
      errorEngineLoad:         'CryptEngine failed to load. Please reinstall the app.',
      errorCompression:        'Compression API unavailable. iOS 16.4+ required.',
      errorBrowser:            'This browser does not support the required API.',
      securityBadge:           '100% offline · Data never leaves this device',
      selectCrypt3:            'Please select a .crypt3 file',
      alreadyCrypt3:           'This file is already .crypt3 format, switch to decrypt mode',
      fileSaved:               'File saved to',
      shareFile:               'Share',
      langSearch:              'Search languages…'
    },

    /* ---- Simplified Chinese (zh-Hans) ------------------------------ */
    'zh-Hans': {
      appTitle:                '加密猫 = 源代码开源 + 离线加密',
      modeDecrypt:             '解密',
      modeEncrypt:             '加密',
      dropTitleDecrypt:        '将 .crypt3 文件拖放到此处',
      dropTitleEncrypt:        '将要加密的文件拖放到此处',
      dropHint:                '或点击选择文件',
      fileSelected:            '已选择文件',
      pwdLabel:                '密码',
      pwdLabelDecrypt:         '解密密码',
      pwdLabelEncrypt:         '加密密码',
      pwdPlaceholder:          '请输入密码',
      confirmLabel:            '确认密码',
      confirmPlaceholder:      '请再次输入密码',
      btnDecrypt:              '解密并保存',
      btnEncrypt:              '加密并保存',
      pwdMatch:                '密码一致',
      pwdNoMatch:              '密码不一致',
      pwdFingerprintMatch:     '密码指纹匹配',
      pwdFingerprintMismatch:  '密码指纹不匹配',
      statusReading:           '正在读取文件…',
      statusDecrypting:        '正在解密 (AES-256-CBC)…',
      statusEncrypting:        '正在加密 (AES-256-CBC)…',
      statusDecompressing:     '正在解压缩 (gzip + tar)…',
      statusCompressing:       '正在压缩 (tar + gzip)…',
      successDecrypt:          '解密成功！文件已保存。',
      successEncrypt:          '加密成功！文件已保存。',
      errorFormat:             '文件格式无效：缺少 OpenSSL 头。',
      errorDecrypt:            '解密失败：密码错误或文件已损坏。',
      errorNoFiles:            '解压缩后未找到文件。',
      errorDecryptPwd:         '解密失败：密码可能不正确，或文件已损坏。',
      errorEngineLoad:         '加密引擎加载失败，请重新安装应用。',
      errorCompression:        '压缩 API 不可用，需要 iOS 16.4 或更高版本。',
      errorBrowser:            '此浏览器不支持所需的 API。',
      securityBadge:           '100% 离线 · 数据绝不离开本设备',
      selectCrypt3:            '请选择一个 .crypt3 文件',
      alreadyCrypt3:           '此文件已是 .crypt3 格式，请切换到解密模式',
      fileSaved:               '文件已保存至',
      shareFile:               '分享',
      langSearch:              '搜索语言…'
    },

    /* ---- Hindi (hi) ------------------------------------------------ */
    hi: {
      appTitle:                'CryptCat = ओपन सोर्स + ऑफ़लाइन एन्क्रिप्शन',
      modeDecrypt:             'डिक्रिप्ट',
      modeEncrypt:             'एन्क्रिप्ट',
      dropTitleDecrypt:        '.crypt3 फ़ाइल यहाँ छोड़ें',
      dropTitleEncrypt:        'एन्क्रिप्ट करने के लिए फ़ाइल यहाँ छोड़ें',
      dropHint:                'या फ़ाइल चुनने के लिए टैप करें',
      fileSelected:            'फ़ाइल चयनित',
      pwdLabel:                'पासवर्ड',
      pwdLabelDecrypt:         'डिक्रिप्शन पासवर्ड',
      pwdLabelEncrypt:         'एन्क्रिप्शन पासवर्ड',
      pwdPlaceholder:          'अपना पासवर्ड दर्ज करें',
      confirmLabel:            'पासवर्ड की पुष्टि करें',
      confirmPlaceholder:      'पासवर्ड दोबारा दर्ज करें',
      btnDecrypt:              'डिक्रिप्ट करें और सहेजें',
      btnEncrypt:              'एन्क्रिप्ट करें और सहेजें',
      pwdMatch:                'पासवर्ड मेल खाते हैं',
      pwdNoMatch:              'पासवर्ड मेल नहीं खाते',
      pwdFingerprintMatch:     'पासवर्ड फ़िंगरप्रिंट मेल खाता है',
      pwdFingerprintMismatch:  'पासवर्ड फ़िंगरप्रिंट मेल नहीं खाता',
      statusReading:           'फ़ाइल पढ़ी जा रही है…',
      statusDecrypting:        'डिक्रिप्ट हो रहा है (AES-256-CBC)…',
      statusEncrypting:        'एन्क्रिप्ट हो रहा है (AES-256-CBC)…',
      statusDecompressing:     'डीकंप्रेस हो रहा है (gzip + tar)…',
      statusCompressing:       'कंप्रेस हो रहा है (tar + gzip)…',
      successDecrypt:          'डिक्रिप्शन सफल! फ़ाइल सहेजी गई।',
      successEncrypt:          'एन्क्रिप्शन सफल! फ़ाइल सहेजी गई।',
      errorFormat:             'अमान्य फ़ाइल प्रारूप: OpenSSL हेडर अनुपस्थित।',
      errorDecrypt:            'डिक्रिप्शन विफल: गलत पासवर्ड या दूषित फ़ाइल।',
      errorNoFiles:            'डीकंप्रेशन के बाद कोई फ़ाइल नहीं मिली।',
      errorBrowser:            'यह ब्राउज़र आवश्यक API का समर्थन नहीं करता।',
      securityBadge:           '100% ऑफ़लाइन · डेटा कभी इस डिवाइस से बाहर नहीं जाता',
      selectCrypt3:            'कृपया एक .crypt3 फ़ाइल चुनें',
      alreadyCrypt3:           'यह फ़ाइल पहले से .crypt3 प्रारूप में है, डिक्रिप्ट मोड पर स्विच करें',
      fileSaved:               'फ़ाइल यहाँ सहेजी गई',
      shareFile:               'साझा करें',
      langSearch:              'भाषा खोजें…'
    },

    /* ---- Spanish (es) ---------------------------------------------- */
    es: {
      appTitle:                'CryptCat = Código abierto + Cifrado sin conexión',
      modeDecrypt:             'Descifrar',
      modeEncrypt:             'Cifrar',
      dropTitleDecrypt:        'Suelte el archivo .crypt3 aquí',
      dropTitleEncrypt:        'Suelte el archivo a cifrar aquí',
      dropHint:                'o toque para seleccionar archivo',
      fileSelected:            'Archivo seleccionado',
      pwdLabel:                'Contraseña',
      pwdLabelDecrypt:         'Contraseña de descifrado',
      pwdLabelEncrypt:         'Contraseña de cifrado',
      pwdPlaceholder:          'Ingrese su contraseña',
      confirmLabel:            'Confirmar contraseña',
      confirmPlaceholder:      'Ingrese la contraseña nuevamente',
      btnDecrypt:              'Descifrar y guardar',
      btnEncrypt:              'Cifrar y guardar',
      pwdMatch:                'Las contraseñas coinciden',
      pwdNoMatch:              'Las contraseñas no coinciden',
      pwdFingerprintMatch:     'La huella de la contraseña coincide',
      pwdFingerprintMismatch:  'La huella de la contraseña no coincide',
      statusReading:           'Leyendo archivo…',
      statusDecrypting:        'Descifrando (AES-256-CBC)…',
      statusEncrypting:        'Cifrando (AES-256-CBC)…',
      statusDecompressing:     'Descomprimiendo (gzip + tar)…',
      statusCompressing:       'Comprimiendo (tar + gzip)…',
      successDecrypt:          '¡Descifrado exitoso! Archivo guardado.',
      successEncrypt:          '¡Cifrado exitoso! Archivo guardado.',
      errorFormat:             'Formato de archivo no válido: falta el encabezado OpenSSL.',
      errorDecrypt:            'Error de descifrado: contraseña incorrecta o archivo dañado.',
      errorNoFiles:            'No se encontraron archivos después de la descompresión.',
      errorBrowser:            'Este navegador no es compatible con la API requerida.',
      securityBadge:           '100% sin conexión · Los datos nunca salen de este dispositivo',
      selectCrypt3:            'Por favor seleccione un archivo .crypt3',
      alreadyCrypt3:           'Este archivo ya tiene formato .crypt3, cambie al modo descifrar',
      fileSaved:               'Archivo guardado en',
      shareFile:               'Compartir',
      langSearch:              'Buscar idioma…'
    },

    /* ---- Arabic (ar) – RTL ----------------------------------------- */
    ar: {
      appTitle:                'CryptCat = مفتوح المصدر + تشفير بدون اتصال',
      modeDecrypt:             'فك التشفير',
      modeEncrypt:             'تشفير',
      dropTitleDecrypt:        'أسقط ملف .crypt3 هنا',
      dropTitleEncrypt:        'أسقط الملف المراد تشفيره هنا',
      dropHint:                'أو انقر لاختيار ملف',
      fileSelected:            'تم تحديد الملف',
      pwdLabel:                'كلمة المرور',
      pwdLabelDecrypt:         'كلمة مرور فك التشفير',
      pwdLabelEncrypt:         'كلمة مرور التشفير',
      pwdPlaceholder:          'أدخل كلمة المرور',
      confirmLabel:            'تأكيد كلمة المرور',
      confirmPlaceholder:      'أدخل كلمة المرور مرة أخرى',
      btnDecrypt:              'فك التشفير وحفظ',
      btnEncrypt:              'تشفير وحفظ',
      pwdMatch:                'كلمتا المرور متطابقتان',
      pwdNoMatch:              'كلمتا المرور غير متطابقتين',
      pwdFingerprintMatch:     'بصمة كلمة المرور متطابقة',
      pwdFingerprintMismatch:  'بصمة كلمة المرور غير متطابقة',
      statusReading:           'جارٍ قراءة الملف…',
      statusDecrypting:        'جارٍ فك التشفير (AES-256-CBC)…',
      statusEncrypting:        'جارٍ التشفير (AES-256-CBC)…',
      statusDecompressing:     'جارٍ فك الضغط (gzip + tar)…',
      statusCompressing:       'جارٍ الضغط (tar + gzip)…',
      successDecrypt:          'تم فك التشفير بنجاح! تم حفظ الملف.',
      successEncrypt:          'تم التشفير بنجاح! تم حفظ الملف.',
      errorFormat:             'تنسيق ملف غير صالح: رأس OpenSSL مفقود.',
      errorDecrypt:            'فشل فك التشفير: كلمة مرور خاطئة أو ملف تالف.',
      errorNoFiles:            'لم يتم العثور على ملفات بعد فك الضغط.',
      errorBrowser:            'هذا المتصفح لا يدعم واجهة برمجة التطبيقات المطلوبة.',
      securityBadge:           '100% بدون اتصال · البيانات لا تغادر هذا الجهاز أبدًا',
      selectCrypt3:            'يرجى اختيار ملف .crypt3',
      alreadyCrypt3:           'هذا الملف بتنسيق .crypt3 بالفعل، انتقل إلى وضع فك التشفير',
      fileSaved:               'تم حفظ الملف في',
      shareFile:               'مشاركة',
      langSearch:              'البحث عن لغة…'
    },

    /* ---- French (fr) ----------------------------------------------- */
    fr: {
      appTitle:                'CryptCat = Open source + Chiffrement hors ligne',
      modeDecrypt:             'Déchiffrer',
      modeEncrypt:             'Chiffrer',
      dropTitleDecrypt:        'Déposez le fichier .crypt3 ici',
      dropTitleEncrypt:        'Déposez le fichier à chiffrer ici',
      dropHint:                'ou appuyez pour sélectionner un fichier',
      fileSelected:            'Fichier sélectionné',
      pwdLabel:                'Mot de passe',
      pwdLabelDecrypt:         'Mot de passe de déchiffrement',
      pwdLabelEncrypt:         'Mot de passe de chiffrement',
      pwdPlaceholder:          'Entrez votre mot de passe',
      confirmLabel:            'Confirmer le mot de passe',
      confirmPlaceholder:      'Entrez le mot de passe à nouveau',
      btnDecrypt:              'Déchiffrer et enregistrer',
      btnEncrypt:              'Chiffrer et enregistrer',
      pwdMatch:                'Les mots de passe correspondent',
      pwdNoMatch:              'Les mots de passe ne correspondent pas',
      pwdFingerprintMatch:     "L'empreinte du mot de passe correspond",
      pwdFingerprintMismatch:  "L'empreinte du mot de passe ne correspond pas",
      statusReading:           'Lecture du fichier…',
      statusDecrypting:        'Déchiffrement en cours (AES-256-CBC)…',
      statusEncrypting:        'Chiffrement en cours (AES-256-CBC)…',
      statusDecompressing:     'Décompression en cours (gzip + tar)…',
      statusCompressing:       'Compression en cours (tar + gzip)…',
      successDecrypt:          'Déchiffrement réussi ! Fichier enregistré.',
      successEncrypt:          'Chiffrement réussi ! Fichier enregistré.',
      errorFormat:             'Format de fichier invalide : en-tête OpenSSL manquant.',
      errorDecrypt:            'Échec du déchiffrement : mot de passe incorrect ou fichier corrompu.',
      errorNoFiles:            'Aucun fichier trouvé après la décompression.',
      errorBrowser:            "Ce navigateur ne prend pas en charge l'API requise.",
      securityBadge:           '100% hors ligne · Les données ne quittent jamais cet appareil',
      selectCrypt3:            'Veuillez sélectionner un fichier .crypt3',
      alreadyCrypt3:           'Ce fichier est déjà au format .crypt3, passez en mode déchiffrement',
      fileSaved:               'Fichier enregistré dans',
      shareFile:               'Partager',
      langSearch:              'Rechercher une langue…'
    },

    /* ---- Bengali (bn) ---------------------------------------------- */
    bn: {
      appTitle:                'CryptCat = ওপেন সোর্স + অফলাইন এনক্রিপশন',
      modeDecrypt:             'ডিক্রিপ্ট',
      modeEncrypt:             'এনক্রিপ্ট',
      dropTitleDecrypt:        '.crypt3 ফাইল এখানে ড্রপ করুন',
      dropTitleEncrypt:        'এনক্রিপ্ট করতে ফাইল এখানে ড্রপ করুন',
      dropHint:                'অথবা ফাইল নির্বাচন করতে ট্যাপ করুন',
      fileSelected:            'ফাইল নির্বাচিত',
      pwdLabel:                'পাসওয়ার্ড',
      pwdLabelDecrypt:         'ডিক্রিপশন পাসওয়ার্ড',
      pwdLabelEncrypt:         'এনক্রিপশন পাসওয়ার্ড',
      pwdPlaceholder:          'আপনার পাসওয়ার্ড দিন',
      confirmLabel:            'পাসওয়ার্ড নিশ্চিত করুন',
      confirmPlaceholder:      'আবার পাসওয়ার্ড দিন',
      btnDecrypt:              'ডিক্রিপ্ট ও সংরক্ষণ',
      btnEncrypt:              'এনক্রিপ্ট ও সংরক্ষণ',
      pwdMatch:                'পাসওয়ার্ড মিলেছে',
      pwdNoMatch:              'পাসওয়ার্ড মিলছে না',
      pwdFingerprintMatch:     'পাসওয়ার্ড ফিঙ্গারপ্রিন্ট মিলেছে',
      pwdFingerprintMismatch:  'পাসওয়ার্ড ফিঙ্গারপ্রিন্ট মিলছে না',
      statusReading:           'ফাইল পড়া হচ্ছে…',
      statusDecrypting:        'ডিক্রিপ্ট হচ্ছে (AES-256-CBC)…',
      statusEncrypting:        'এনক্রিপ্ট হচ্ছে (AES-256-CBC)…',
      statusDecompressing:     'ডিকম্প্রেস হচ্ছে (gzip + tar)…',
      statusCompressing:       'কম্প্রেস হচ্ছে (tar + gzip)…',
      successDecrypt:          'ডিক্রিপশন সফল! ফাইল সংরক্ষিত।',
      successEncrypt:          'এনক্রিপশন সফল! ফাইল সংরক্ষিত।',
      errorFormat:             'অবৈধ ফাইল ফরম্যাট: OpenSSL হেডার অনুপস্থিত।',
      errorDecrypt:            'ডিক্রিপশন ব্যর্থ: ভুল পাসওয়ার্ড বা ক্ষতিগ্রস্ত ফাইল।',
      errorNoFiles:            'ডিকম্প্রেশনের পরে কোনো ফাইল পাওয়া যায়নি।',
      errorBrowser:            'এই ব্রাউজার প্রয়োজনীয় API সমর্থন করে না।',
      securityBadge:           '100% অফলাইন · ডেটা কখনো এই ডিভাইস ছেড়ে যায় না',
      selectCrypt3:            'অনুগ্রহ করে একটি .crypt3 ফাইল নির্বাচন করুন',
      alreadyCrypt3:           'এই ফাইলটি ইতোমধ্যে .crypt3 ফরম্যাটে আছে, ডিক্রিপ্ট মোডে যান',
      fileSaved:               'ফাইল সংরক্ষিত হয়েছে',
      shareFile:               'শেয়ার',
      langSearch:              'ভাষা খুঁজুন…'
    },

    /* ---- Portuguese (pt) ------------------------------------------- */
    pt: {
      appTitle:                'CryptCat = Código aberto + Criptografia offline',
      modeDecrypt:             'Descriptografar',
      modeEncrypt:             'Criptografar',
      dropTitleDecrypt:        'Solte o arquivo .crypt3 aqui',
      dropTitleEncrypt:        'Solte o arquivo para criptografar aqui',
      dropHint:                'ou toque para selecionar arquivo',
      fileSelected:            'Arquivo selecionado',
      pwdLabel:                'Senha',
      pwdLabelDecrypt:         'Senha de descriptografia',
      pwdLabelEncrypt:         'Senha de criptografia',
      pwdPlaceholder:          'Digite sua senha',
      confirmLabel:            'Confirmar senha',
      confirmPlaceholder:      'Digite a senha novamente',
      btnDecrypt:              'Descriptografar e salvar',
      btnEncrypt:              'Criptografar e salvar',
      pwdMatch:                'As senhas coincidem',
      pwdNoMatch:              'As senhas não coincidem',
      pwdFingerprintMatch:     'A impressão digital da senha coincide',
      pwdFingerprintMismatch:  'A impressão digital da senha não coincide',
      statusReading:           'Lendo arquivo…',
      statusDecrypting:        'Descriptografando (AES-256-CBC)…',
      statusEncrypting:        'Criptografando (AES-256-CBC)…',
      statusDecompressing:     'Descompactando (gzip + tar)…',
      statusCompressing:       'Compactando (tar + gzip)…',
      successDecrypt:          'Descriptografia bem-sucedida! Arquivo salvo.',
      successEncrypt:          'Criptografia bem-sucedida! Arquivo salvo.',
      errorFormat:             'Formato de arquivo inválido: cabeçalho OpenSSL ausente.',
      errorDecrypt:            'Falha na descriptografia: senha incorreta ou arquivo corrompido.',
      errorNoFiles:            'Nenhum arquivo encontrado após a descompactação.',
      errorBrowser:            'Este navegador não suporta a API necessária.',
      securityBadge:           '100% offline · Os dados nunca saem deste dispositivo',
      selectCrypt3:            'Por favor, selecione um arquivo .crypt3',
      alreadyCrypt3:           'Este arquivo já está no formato .crypt3, mude para o modo descriptografar',
      fileSaved:               'Arquivo salvo em',
      shareFile:               'Compartilhar',
      langSearch:              'Pesquisar idioma…'
    },

    /* ---- Indonesian (id) ------------------------------------------- */
    id: {
      appTitle:                'CryptCat = Sumber terbuka + Enkripsi Offline',
      modeDecrypt:             'Dekripsi',
      modeEncrypt:             'Enkripsi',
      dropTitleDecrypt:        'Letakkan file .crypt3 di sini',
      dropTitleEncrypt:        'Letakkan file untuk dienkripsi di sini',
      dropHint:                'atau ketuk untuk memilih file',
      fileSelected:            'File dipilih',
      pwdLabel:                'Kata sandi',
      pwdLabelDecrypt:         'Kata sandi dekripsi',
      pwdLabelEncrypt:         'Kata sandi enkripsi',
      pwdPlaceholder:          'Masukkan kata sandi Anda',
      confirmLabel:            'Konfirmasi kata sandi',
      confirmPlaceholder:      'Masukkan kata sandi lagi',
      btnDecrypt:              'Dekripsi & Simpan',
      btnEncrypt:              'Enkripsi & Simpan',
      pwdMatch:                'Kata sandi cocok',
      pwdNoMatch:              'Kata sandi tidak cocok',
      pwdFingerprintMatch:     'Sidik jari kata sandi cocok',
      pwdFingerprintMismatch:  'Sidik jari kata sandi tidak cocok',
      statusReading:           'Membaca file…',
      statusDecrypting:        'Mendekripsi (AES-256-CBC)…',
      statusEncrypting:        'Mengenkripsi (AES-256-CBC)…',
      statusDecompressing:     'Mendekompresi (gzip + tar)…',
      statusCompressing:       'Mengompresi (tar + gzip)…',
      successDecrypt:          'Dekripsi berhasil! File disimpan.',
      successEncrypt:          'Enkripsi berhasil! File disimpan.',
      errorFormat:             'Format file tidak valid: header OpenSSL tidak ditemukan.',
      errorDecrypt:            'Dekripsi gagal: kata sandi salah atau file rusak.',
      errorNoFiles:            'Tidak ada file yang ditemukan setelah dekompresi.',
      errorBrowser:            'Browser ini tidak mendukung API yang diperlukan.',
      securityBadge:           '100% offline · Data tidak pernah meninggalkan perangkat ini',
      selectCrypt3:            'Silakan pilih file .crypt3',
      alreadyCrypt3:           'File ini sudah dalam format .crypt3, beralih ke mode dekripsi',
      fileSaved:               'File disimpan ke',
      shareFile:               'Bagikan',
      langSearch:              'Cari bahasa…'
    },

    /* ---- Urdu (ur) – RTL ------------------------------------------- */
    ur: {
      appTitle:                'CryptCat = اوپن سورس + آف لائن انکرپشن',
      modeDecrypt:             'ڈیکرپٹ',
      modeEncrypt:             'انکرپٹ',
      dropTitleDecrypt:        '.crypt3 فائل یہاں چھوڑیں',
      dropTitleEncrypt:        'انکرپٹ کرنے کے لیے فائل یہاں چھوڑیں',
      dropHint:                'یا فائل منتخب کرنے کے لیے ٹیپ کریں',
      fileSelected:            'فائل منتخب ہو گئی',
      pwdLabel:                'پاس ورڈ',
      pwdLabelDecrypt:         'ڈیکرپشن پاس ورڈ',
      pwdLabelEncrypt:         'انکرپشن پاس ورڈ',
      pwdPlaceholder:          'اپنا پاس ورڈ درج کریں',
      confirmLabel:            'پاس ورڈ کی تصدیق کریں',
      confirmPlaceholder:      'پاس ورڈ دوبارہ درج کریں',
      btnDecrypt:              'ڈیکرپٹ اور محفوظ کریں',
      btnEncrypt:              'انکرپٹ اور محفوظ کریں',
      pwdMatch:                'پاس ورڈ مماثل ہیں',
      pwdNoMatch:              'پاس ورڈ مماثل نہیں ہیں',
      pwdFingerprintMatch:     'پاس ورڈ فنگر پرنٹ مماثل ہے',
      pwdFingerprintMismatch:  'پاس ورڈ فنگر پرنٹ مماثل نہیں ہے',
      statusReading:           'فائل پڑھی جا رہی ہے…',
      statusDecrypting:        'ڈیکرپٹ ہو رہا ہے (AES-256-CBC)…',
      statusEncrypting:        'انکرپٹ ہو رہا ہے (AES-256-CBC)…',
      statusDecompressing:     'ڈیکمپریس ہو رہا ہے (gzip + tar)…',
      statusCompressing:       'کمپریس ہو رہا ہے (tar + gzip)…',
      successDecrypt:          'ڈیکرپشن کامیاب! فائل محفوظ ہو گئی۔',
      successEncrypt:          'انکرپشن کامیاب! فائل محفوظ ہو گئی۔',
      errorFormat:             'غلط فائل فارمیٹ: OpenSSL ہیڈر موجود نہیں۔',
      errorDecrypt:            'ڈیکرپشن ناکام: غلط پاس ورڈ یا خراب فائل۔',
      errorNoFiles:            'ڈیکمپریشن کے بعد کوئی فائل نہیں ملی۔',
      errorBrowser:            'یہ براؤزر مطلوبہ API کو سپورٹ نہیں کرتا۔',
      securityBadge:           '100% آف لائن · ڈیٹا کبھی اس ڈیوائس سے باہر نہیں جاتا',
      selectCrypt3:            'براہ کرم ایک .crypt3 فائل منتخب کریں',
      alreadyCrypt3:           'یہ فائل پہلے سے .crypt3 فارمیٹ میں ہے، ڈیکرپٹ موڈ پر جائیں',
      fileSaved:               'فائل محفوظ ہو گئی',
      shareFile:               'شیئر کریں',
      langSearch:              'زبان تلاش کریں…'
    }
  };

  /* Merge extra market bundles */
  if (window.I18N_EXTRA) {
    var extraKeys = Object.keys(window.I18N_EXTRA);
    for (var ek = 0; ek < extraKeys.length; ek++) {
      var extraCode = extraKeys[ek];
      translations[extraCode] = Object.assign({}, translations[extraCode] || {}, window.I18N_EXTRA[extraCode]);
    }
  }

  var LOCALE_META = window.CRYPT3_LOCALES || { list: [], byCode: {}, tagMap: {}, rtlCodes: [] };

  /* ------------------------------------------------------------------ */
  /*  RTL locales (from registry + legacy)                              */
  /* ------------------------------------------------------------------ */
  var rtlLocales = LOCALE_META.rtlCodes && LOCALE_META.rtlCodes.length
    ? LOCALE_META.rtlCodes.slice()
    : ['ar', 'ur', 'fa', 'ps', 'sd', 'he'];

  /* ------------------------------------------------------------------ */
  /*  State                                                             */
  /* ------------------------------------------------------------------ */
  var currentLocale = 'en';

  /* ------------------------------------------------------------------ */
  /*  matchLocale – map BCP-47 tag to app locale code                   */
  /* ------------------------------------------------------------------ */
  function normalizeTag(raw) {
    if (!raw || typeof raw !== 'string') return '';
    return raw.trim().replace(/_/g, '-');
  }

  function expandTag(raw) {
    var tag = normalizeTag(raw);
    if (!tag) return [];
    var out = [tag];

    try {
      var canonical = Intl.getCanonicalLocales(tag)[0];
      if (canonical) out.push(canonical);
    } catch (e1) { /* ignore invalid tags */ }

    try {
      var maximized = new Intl.Locale(tag).maximize().toString();
      if (maximized) out.push(maximized);
    } catch (e2) { /* ignore unsupported tags */ }

    return out;
  }

  function matchLocale(raw) {
    var expanded = expandTag(raw);
    for (var e = 0; e < expanded.length; e++) {
      var matched = matchOneLocaleTag(expanded[e]);
      if (matched) return matched;
    }
    return null;
  }

  function matchOneLocaleTag(tag) {
    var lower = tag.toLowerCase();
    var tagMap = LOCALE_META.tagMap || {};

    if (Object.prototype.hasOwnProperty.call(tagMap, lower)) {
      return tagMap[lower];
    }

    /* Legacy guard only applies when zh-Hant is not registered by locales-extra.js. */
    if (/^zh/i.test(lower) && /hant|tw|hk|mo/i.test(lower)) {
      return null;
    }

    /* Progressive truncation: zh-Hans-CN → zh-Hans → zh */
    var parts = lower.split('-');
    while (parts.length > 0) {
      var attempt = parts.join('-');
      if (Object.prototype.hasOwnProperty.call(tagMap, attempt)) {
        return tagMap[attempt];
      }
      parts.pop();
    }

    return null;
  }

  function collectCandidates(extra) {
    var seen = {};
    var out = [];

    function push(val) {
      var tags = expandTag(val);
      for (var i = 0; i < tags.length; i++) {
        var n = normalizeTag(tags[i]);
        if (!n || seen[n]) continue;
        seen[n] = true;
        out.push(n);
      }
    }

    function pushMany(vals) {
      if (!vals) return;
      if (typeof vals === 'string') {
        push(vals);
        return;
      }
      for (var x = 0; x < vals.length; x++) push(vals[x]);
    }

    pushMany(extra);

    if (typeof window !== 'undefined' && window.__CRYPT3_SYSTEM_LOCALES__) {
      pushMany(window.__CRYPT3_SYSTEM_LOCALES__);
    }

    if (typeof navigator !== 'undefined') {
      pushMany(navigator.languages);
      push(navigator.language);
      push(navigator.userLanguage);
      push(navigator.browserLanguage);
    }

    try {
      push(Intl.DateTimeFormat().resolvedOptions().locale);
    } catch (e) { /* ignore */ }
    try {
      push(Intl.NumberFormat().resolvedOptions().locale);
    } catch (e3) { /* ignore */ }
    try {
      push(Intl.Collator().resolvedOptions().locale);
    } catch (e4) { /* ignore */ }

    return out;
  }

  function detectFromCandidates(candidates) {
    for (var i = 0; i < candidates.length; i++) {
      var matched = matchLocale(candidates[i]);
      if (matched) return matched;
    }
    return 'en';
  }

  function detect() {
    return detectFromCandidates(collectCandidates([]));
  }

  async function getNativeLanguageCandidates() {
    var native = [];
    if (typeof window === 'undefined' || !window.Capacitor || !window.Capacitor.isNativePlatform()) {
      return native;
    }

    var Device = window.Capacitor.Plugins && window.Capacitor.Plugins.Device;
    if (!Device && window.Capacitor.registerPlugin) {
      Device = window.Capacitor.registerPlugin('Device');
    }
    if (!Device) return native;

    try {
      if (typeof Device.getLanguageTag === 'function') {
        var tagResult = await Device.getLanguageTag();
        if (tagResult && tagResult.value) native.push(tagResult.value);
      }
    } catch (e1) { /* ignore */ }

    try {
      if (typeof Device.getLanguageCode === 'function') {
        var codeResult = await Device.getLanguageCode();
        if (codeResult && codeResult.value) native.push(codeResult.value);
      }
    } catch (e2) { /* ignore */ }

    try {
      if (typeof Device.getInfo === 'function') {
        var info = await Device.getInfo();
        if (info && info.locale) native.push(info.locale);
      }
    } catch (e3) { /* ignore */ }

    return native;
  }

  async function detectAsync() {
    var nativeTags = await getNativeLanguageCandidates();
    var candidates = collectCandidates(nativeTags);
    return detectFromCandidates(candidates);
  }

  /* ------------------------------------------------------------------ */
  /*  setLocale / getLocale                                             */
  /* ------------------------------------------------------------------ */
  function isKnownLocale(code) {
    return !!(LOCALE_META.byCode && LOCALE_META.byCode[code]);
  }

  function setLocale(code) {
    if (isKnownLocale(code)) {
      currentLocale = code;
    } else if (translations[code]) {
      currentLocale = code;
    } else {
      console.warn('[I18N] Unknown locale "' + code + '", falling back to "en".');
      currentLocale = 'en';
    }
    return currentLocale;
  }

  function getLocale() {
    return currentLocale;
  }

  function getLocales() {
    return LOCALE_META.list || [];
  }

  function getBundleForLocale(code) {
    if (translations[code]) return translations[code];
    var base = code.split('-')[0];
    if (translations[base]) return translations[base];
    return translations.en;
  }

  /* ------------------------------------------------------------------ */
  /*  t(key) – return translated string for the current locale          */
  /* ------------------------------------------------------------------ */
  function t(key) {
    var bundle = getBundleForLocale(currentLocale);
    if (bundle[key] !== undefined) return bundle[key];
    if (translations.en[key] !== undefined) return translations.en[key];
    console.warn('[I18N] Missing translation key: "' + key + '"');
    return key;
  }

  function isRTL(localeCode) {
    var code = localeCode || currentLocale;
    return rtlLocales.indexOf(code) !== -1;
  }

  /* ------------------------------------------------------------------ */
  /*  Public API                                                        */
  /* ------------------------------------------------------------------ */
  window.I18N = {
    translations:     translations,
    rtlLocales:       rtlLocales,
    supportedLocales: (LOCALE_META.list || []).map(function (l) { return l.code; }),
    getLocales:       getLocales,
    matchLocale:      matchLocale,
    detect:           detect,
    detectAsync:      detectAsync,
    t:                t,
    setLocale:        setLocale,
    getLocale:        getLocale,
    isRTL:            isRTL,
    isKnownLocale:    isKnownLocale
  };

})();
