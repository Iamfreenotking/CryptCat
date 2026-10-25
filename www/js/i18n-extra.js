/**
 * i18n-extra.js – Full UI bundles for major markets (merged into I18N at runtime)
 */
(function () {
  'use strict';

  window.I18N_EXTRA = {
    de: {
      appTitle: 'CryptCat = Open Source + Offline-Verschlüsselung',
      modeDecrypt: 'Entschlüsseln', modeEncrypt: 'Verschlüsseln',
      dropTitleDecrypt: '.crypt3-Datei hier ablegen',
      dropTitleEncrypt: 'Datei zum Verschlüsseln hier ablegen',
      dropHint: 'oder tippen, um eine Datei auszuwählen',
      fileSelected: 'Datei ausgewählt',
      pwdLabel: 'Passwort', pwdLabelDecrypt: 'Entschlüsselungs-Passwort', pwdLabelEncrypt: 'Verschlüsselungs-Passwort',
      pwdPlaceholder: 'Passwort eingeben', confirmLabel: 'Passwort bestätigen', confirmPlaceholder: 'Passwort erneut eingeben',
      btnDecrypt: 'Entschlüsseln & Speichern', btnEncrypt: 'Verschlüsseln & Speichern',
      pwdMatch: 'Passwörter stimmen überein', pwdNoMatch: 'Passwörter stimmen nicht überein',
      pwdFingerprintMatch: 'Passwort-Fingerabdruck stimmt', pwdFingerprintMismatch: 'Passwort-Fingerabdruck stimmt nicht',
      statusReading: 'Datei wird gelesen…', statusDecrypting: 'Entschlüsselung (AES-256-CBC)…',
      statusEncrypting: 'Verschlüsselung (AES-256-CBC)…', statusDecompressing: 'Dekomprimierung (gzip + tar)…',
      statusCompressing: 'Komprimierung (tar + gzip)…',
      successDecrypt: 'Entschlüsselung erfolgreich! Datei gespeichert.',
      successEncrypt: 'Verschlüsselung erfolgreich! Datei gespeichert.',
      errorFormat: 'Ungültiges Format: OpenSSL-Header fehlt.',
      errorDecrypt: 'Entschlüsselung fehlgeschlagen: falsches Passwort oder beschädigte Datei.',
      errorNoFiles: 'Nach der Dekomprimierung keine Dateien gefunden.',
      errorDecryptPwd: 'Entschlüsselung fehlgeschlagen: falsches Passwort oder beschädigte Datei.',
      errorEngineLoad: 'CryptEngine konnte nicht geladen werden.',
      errorCompression: 'Komprimierungs-API nicht verfügbar. iOS 16.4+ erforderlich.',
      errorBrowser: 'Dieser Browser unterstützt die erforderliche API nicht.',
      securityBadge: '100 % offline · Daten verlassen dieses Gerät nie',
      selectCrypt3: 'Bitte eine .crypt3-Datei auswählen',
      alreadyCrypt3: 'Diese Datei ist bereits .crypt3 – zum Entschlüsseln wechseln',
      fileSaved: 'Datei gespeichert unter', shareFile: 'Teilen',
      langSearch: 'Sprache suchen…'
    },
    ja: {
      appTitle: 'CryptCat = オープンソース + オフライン暗号化',
      modeDecrypt: '復号', modeEncrypt: '暗号化',
      dropTitleDecrypt: '.crypt3 ファイルをここにドロップ',
      dropTitleEncrypt: '暗号化するファイルをここにドロップ',
      dropHint: 'またはタップしてファイルを選択',
      fileSelected: 'ファイルを選択しました',
      pwdLabel: 'パスワード', pwdLabelDecrypt: '復号パスワード', pwdLabelEncrypt: '暗号化パスワード',
      pwdPlaceholder: 'パスワードを入力', confirmLabel: 'パスワード確認', confirmPlaceholder: 'もう一度入力',
      btnDecrypt: '復号して保存', btnEncrypt: '暗号化して保存',
      pwdMatch: 'パスワードが一致', pwdNoMatch: 'パスワードが一致しません',
      pwdFingerprintMatch: 'パスワード指紋が一致', pwdFingerprintMismatch: 'パスワード指紋が一致しません',
      statusReading: 'ファイルを読み込み中…', statusDecrypting: '復号中 (AES-256-CBC)…',
      statusEncrypting: '暗号化中 (AES-256-CBC)…', statusDecompressing: '展開中 (gzip + tar)…',
      statusCompressing: '圧縮中 (tar + gzip)…',
      successDecrypt: '復号成功！ファイルを保存しました。',
      successEncrypt: '暗号化成功！ファイルを保存しました。',
      errorFormat: '無効な形式：OpenSSL ヘッダーがありません。',
      errorDecrypt: '復号失敗：パスワードが違うかファイルが破損しています。',
      errorNoFiles: '展開後にファイルが見つかりません。',
      errorDecryptPwd: '復号失敗：パスワードが違うかファイルが破損しています。',
      errorEngineLoad: 'CryptEngine の読み込みに失敗しました。',
      errorCompression: '圧縮 API が利用できません。iOS 16.4 以上が必要です。',
      errorBrowser: 'このブラウザは必要な API をサポートしていません。',
      securityBadge: '100% オフライン · データは端末外に出ません',
      selectCrypt3: '.crypt3 ファイルを選択してください',
      alreadyCrypt3: 'すでに .crypt3 形式です。復号モードに切り替えてください',
      fileSaved: 'ファイルを保存しました', shareFile: '共有',
      langSearch: '言語を検索…'
    },
    ru: {
      appTitle: 'CryptCat = Открытый код + Офлайн-шифрование',
      modeDecrypt: 'Расшифровать', modeEncrypt: 'Зашифровать',
      dropTitleDecrypt: 'Перетащите файл .crypt3 сюда',
      dropTitleEncrypt: 'Перетащите файл для шифрования',
      dropHint: 'или нажмите для выбора файла',
      fileSelected: 'Файл выбран',
      pwdLabel: 'Пароль', pwdLabelDecrypt: 'Пароль расшифровки', pwdLabelEncrypt: 'Пароль шифрования',
      pwdPlaceholder: 'Введите пароль', confirmLabel: 'Подтвердите пароль', confirmPlaceholder: 'Введите пароль снова',
      btnDecrypt: 'Расшифровать и сохранить', btnEncrypt: 'Зашифровать и сохранить',
      pwdMatch: 'Пароли совпадают', pwdNoMatch: 'Пароли не совпадают',
      pwdFingerprintMatch: 'Отпечаток пароля совпадает', pwdFingerprintMismatch: 'Отпечаток пароля не совпадает',
      statusReading: 'Чтение файла…', statusDecrypting: 'Расшифровка (AES-256-CBC)…',
      statusEncrypting: 'Шифрование (AES-256-CBC)…', statusDecompressing: 'Распаковка (gzip + tar)…',
      statusCompressing: 'Сжатие (tar + gzip)…',
      successDecrypt: 'Расшифровка успешна! Файл сохранён.',
      successEncrypt: 'Шифрование успешно! Файл сохранён.',
      errorFormat: 'Неверный формат: отсутствует заголовок OpenSSL.',
      errorDecrypt: 'Ошибка расшифровки: неверный пароль или повреждённый файл.',
      errorNoFiles: 'После распаковки файлы не найдены.',
      errorDecryptPwd: 'Ошибка расшифровки: неверный пароль или повреждённый файл.',
      errorEngineLoad: 'Не удалось загрузить CryptEngine.',
      errorCompression: 'API сжатия недоступен. Требуется iOS 16.4+.',
      errorBrowser: 'Этот браузер не поддерживает необходимый API.',
      securityBadge: '100% офлайн · Данные не покидают устройство',
      selectCrypt3: 'Выберите файл .crypt3',
      alreadyCrypt3: 'Файл уже в формате .crypt3 — переключитесь на расшифровку',
      fileSaved: 'Файл сохранён в', shareFile: 'Поделиться',
      langSearch: 'Поиск языка…'
    },
    ko: {
      appTitle: 'CryptCat = 오픈소스 + 오프라인 암호화',
      modeDecrypt: '복호화', modeEncrypt: '암호화',
      dropTitleDecrypt: '.crypt3 파일을 여기에 놓으세요',
      dropTitleEncrypt: '암호화할 파일을 여기에 놓으세요',
      dropHint: '또는 탭하여 파일 선택',
      fileSelected: '파일 선택됨',
      pwdLabel: '비밀번호', pwdLabelDecrypt: '복호화 비밀번호', pwdLabelEncrypt: '암호화 비밀번호',
      pwdPlaceholder: '비밀번호 입력', confirmLabel: '비밀번호 확인', confirmPlaceholder: '비밀번호 다시 입력',
      btnDecrypt: '복호화 및 저장', btnEncrypt: '암호화 및 저장',
      pwdMatch: '비밀번호 일치', pwdNoMatch: '비밀번호 불일치',
      pwdFingerprintMatch: '비밀번호 지문 일치', pwdFingerprintMismatch: '비밀번호 지문 불일치',
      statusReading: '파일 읽는 중…', statusDecrypting: '복호화 중 (AES-256-CBC)…',
      statusEncrypting: '암호화 중 (AES-256-CBC)…', statusDecompressing: '압축 해제 중 (gzip + tar)…',
      statusCompressing: '압축 중 (tar + gzip)…',
      successDecrypt: '복호화 성공! 파일이 저장되었습니다.',
      successEncrypt: '암호화 성공! 파일이 저장되었습니다.',
      errorFormat: '잘못된 형식: OpenSSL 헤더가 없습니다.',
      errorDecrypt: '복호화 실패: 비밀번호가 틀리거나 파일이 손상되었습니다.',
      errorNoFiles: '압축 해제 후 파일을 찾을 수 없습니다.',
      errorDecryptPwd: '복호화 실패: 비밀번호가 틀리거나 파일이 손상되었습니다.',
      errorEngineLoad: 'CryptEngine을 불러오지 못했습니다.',
      errorCompression: '압축 API를 사용할 수 없습니다. iOS 16.4 이상 필요.',
      errorBrowser: '이 브라우저는 필요한 API를 지원하지 않습니다.',
      securityBadge: '100% 오프라인 · 데이터는 기기를 벗어나지 않습니다',
      selectCrypt3: '.crypt3 파일을 선택하세요',
      alreadyCrypt3: '이미 .crypt3 형식입니다. 복호화 모드로 전환하세요',
      fileSaved: '파일 저장됨', shareFile: '공유',
      langSearch: '언어 검색…'
    },
    vi: {
      appTitle: 'CryptCat = Mã nguồn mở + Mã hóa ngoại tuyến',
      modeDecrypt: 'Giải mã', modeEncrypt: 'Mã hóa',
      dropTitleDecrypt: 'Thả tệp .crypt3 vào đây',
      dropTitleEncrypt: 'Thả tệp cần mã hóa vào đây',
      dropHint: 'hoặc chạm để chọn tệp',
      fileSelected: 'Đã chọn tệp',
      pwdLabel: 'Mật khẩu', pwdLabelDecrypt: 'Mật khẩu giải mã', pwdLabelEncrypt: 'Mật khẩu mã hóa',
      pwdPlaceholder: 'Nhập mật khẩu', confirmLabel: 'Xác nhận mật khẩu', confirmPlaceholder: 'Nhập lại mật khẩu',
      btnDecrypt: 'Giải mã & Lưu', btnEncrypt: 'Mã hóa & Lưu',
      pwdMatch: 'Mật khẩu khớp', pwdNoMatch: 'Mật khẩu không khớp',
      pwdFingerprintMatch: 'Dấu vân tay mật khẩu khớp', pwdFingerprintMismatch: 'Dấu vân tay mật khẩu không khớp',
      statusReading: 'Đang đọc tệp…', statusDecrypting: 'Đang giải mã (AES-256-CBC)…',
      statusEncrypting: 'Đang mã hóa (AES-256-CBC)…', statusDecompressing: 'Đang giải nén (gzip + tar)…',
      statusCompressing: 'Đang nén (tar + gzip)…',
      successDecrypt: 'Giải mã thành công! Tệp đã được lưu.',
      successEncrypt: 'Mã hóa thành công! Tệp đã được lưu.',
      errorFormat: 'Định dạng không hợp lệ: thiếu tiêu đề OpenSSL.',
      errorDecrypt: 'Giải mã thất bại: sai mật khẩu hoặc tệp bị hỏng.',
      errorNoFiles: 'Không tìm thấy tệp sau khi giải nén.',
      errorDecryptPwd: 'Giải mã thất bại: sai mật khẩu hoặc tệp bị hỏng.',
      errorEngineLoad: 'Không thể tải CryptEngine.',
      errorCompression: 'API nén không khả dụng. Cần iOS 16.4+.',
      errorBrowser: 'Trình duyệt này không hỗ trợ API cần thiết.',
      securityBadge: '100% ngoại tuyến · Dữ liệu không rời thiết bị',
      selectCrypt3: 'Vui lòng chọn tệp .crypt3',
      alreadyCrypt3: 'Tệp đã là .crypt3, hãy chuyển sang chế độ giải mã',
      fileSaved: 'Tệp đã lưu tại', shareFile: 'Chia sẻ',
      langSearch: 'Tìm ngôn ngữ…'
    },
    tr: {
      appTitle: 'CryptCat = Açık Kaynak + Çevrimdışı Şifreleme',
      modeDecrypt: 'Şifre Çöz', modeEncrypt: 'Şifrele',
      dropTitleDecrypt: '.crypt3 dosyasını buraya bırakın',
      dropTitleEncrypt: 'Şifrelenecek dosyayı buraya bırakın',
      dropHint: 'veya dosya seçmek için dokunun',
      fileSelected: 'Dosya seçildi',
      pwdLabel: 'Parola', pwdLabelDecrypt: 'Şifre Çözme Parolası', pwdLabelEncrypt: 'Şifreleme Parolası',
      pwdPlaceholder: 'Parolanızı girin', confirmLabel: 'Parolayı Onayla', confirmPlaceholder: 'Parolayı tekrar girin',
      btnDecrypt: 'Şifre Çöz ve Kaydet', btnEncrypt: 'Şifrele ve Kaydet',
      pwdMatch: 'Parolalar eşleşiyor', pwdNoMatch: 'Parolalar eşleşmiyor',
      pwdFingerprintMatch: 'Parola parmak izi eşleşiyor', pwdFingerprintMismatch: 'Parola parmak izi eşleşmiyor',
      statusReading: 'Dosya okunuyor…', statusDecrypting: 'Şifre çözülüyor (AES-256-CBC)…',
      statusEncrypting: 'Şifreleniyor (AES-256-CBC)…', statusDecompressing: 'Açılıyor (gzip + tar)…',
      statusCompressing: 'Sıkıştırılıyor (tar + gzip)…',
      successDecrypt: 'Şifre çözme başarılı! Dosya kaydedildi.',
      successEncrypt: 'Şifreleme başarılı! Dosya kaydedildi.',
      errorFormat: 'Geçersiz format: OpenSSL başlığı eksik.',
      errorDecrypt: 'Şifre çözme başarısız: yanlış parola veya bozuk dosya.',
      errorNoFiles: 'Açma sonrası dosya bulunamadı.',
      errorDecryptPwd: 'Şifre çözme başarısız: yanlış parola veya bozuk dosya.',
      errorEngineLoad: 'CryptEngine yüklenemedi.',
      errorCompression: 'Sıkıştırma API kullanılamıyor. iOS 16.4+ gerekli.',
      errorBrowser: 'Bu tarayıcı gerekli API\'yi desteklemiyor.',
      securityBadge: '%100 çevrimdışı · Veriler cihazdan çıkmaz',
      selectCrypt3: 'Lütfen bir .crypt3 dosyası seçin',
      alreadyCrypt3: 'Bu dosya zaten .crypt3 — şifre çözme moduna geçin',
      fileSaved: 'Dosya kaydedildi', shareFile: 'Paylaş',
      langSearch: 'Dil ara…'
    },
    it: {
      appTitle: 'CryptCat = Open Source + Crittografia offline',
      modeDecrypt: 'Decrittografa', modeEncrypt: 'Cripta',
      dropTitleDecrypt: 'Trascina qui il file .crypt3',
      dropTitleEncrypt: 'Trascina qui il file da criptare',
      dropHint: 'oppure tocca per selezionare un file',
      fileSelected: 'File selezionato',
      pwdLabel: 'Password', pwdLabelDecrypt: 'Password di decrittografia', pwdLabelEncrypt: 'Password di crittografia',
      pwdPlaceholder: 'Inserisci la password', confirmLabel: 'Conferma password', confirmPlaceholder: 'Reinserisci la password',
      btnDecrypt: 'Decrittografa e salva', btnEncrypt: 'Cripta e salva',
      pwdMatch: 'Le password corrispondono', pwdNoMatch: 'Le password non corrispondono',
      pwdFingerprintMatch: 'Impronta password corrispondente', pwdFingerprintMismatch: 'Impronta password non corrispondente',
      statusReading: 'Lettura file…', statusDecrypting: 'Decrittografia (AES-256-CBC)…',
      statusEncrypting: 'Crittografia (AES-256-CBC)…', statusDecompressing: 'Decompressione (gzip + tar)…',
      statusCompressing: 'Compressione (tar + gzip)…',
      successDecrypt: 'Decrittografia riuscita! File salvato.',
      successEncrypt: 'Crittografia riuscita! File salvato.',
      errorFormat: 'Formato non valido: intestazione OpenSSL mancante.',
      errorDecrypt: 'Decrittografia fallita: password errata o file danneggiato.',
      errorNoFiles: 'Nessun file trovato dopo la decompressione.',
      errorDecryptPwd: 'Decrittografia fallita: password errata o file danneggiato.',
      errorEngineLoad: 'Impossibile caricare CryptEngine.',
      errorCompression: 'API di compressione non disponibile. Richiesto iOS 16.4+.',
      errorBrowser: 'Questo browser non supporta l\'API richiesta.',
      securityBadge: '100% offline · I dati non lasciano mai il dispositivo',
      selectCrypt3: 'Seleziona un file .crypt3',
      alreadyCrypt3: 'Questo file è già .crypt3 — passa alla modalità decrittografia',
      fileSaved: 'File salvato in', shareFile: 'Condividi',
      langSearch: 'Cerca lingua…'
    }
  };
})();

(function () {
  'use strict';

  function patch(code, values) {
    window.I18N_EXTRA[code] = Object.assign({}, window.I18N_EXTRA[code] || {}, values);
  }

  patch('hi', {
    errorDecryptPwd: 'डिक्रिप्शन विफल: गलत पासवर्ड या दूषित फ़ाइल।',
    errorEngineLoad: 'CryptEngine लोड नहीं हो सका।',
    errorCompression: 'Compression API उपलब्ध नहीं है। iOS 16.4+ आवश्यक है।'
  });
  patch('es', {
    errorDecryptPwd: 'Error de descifrado: contraseña incorrecta o archivo dañado.',
    errorEngineLoad: 'No se pudo cargar CryptEngine.',
    errorCompression: 'La API de compresión no está disponible. Se requiere iOS 16.4+.'
  });
  patch('ar', {
    errorDecryptPwd: 'فشل فك التشفير: كلمة مرور خاطئة أو ملف تالف.',
    errorEngineLoad: 'تعذر تحميل CryptEngine.',
    errorCompression: 'واجهة برمجة تطبيقات الضغط غير متاحة. يتطلب iOS 16.4+.'
  });
  patch('fr', {
    errorDecryptPwd: 'Échec du déchiffrement : mot de passe incorrect ou fichier corrompu.',
    errorEngineLoad: 'Impossible de charger CryptEngine.',
    errorCompression: 'API de compression indisponible. iOS 16.4+ requis.'
  });
  patch('bn', {
    errorDecryptPwd: 'ডিক্রিপশন ব্যর্থ: ভুল পাসওয়ার্ড বা ক্ষতিগ্রস্ত ফাইল।',
    errorEngineLoad: 'CryptEngine লোড করা যায়নি।',
    errorCompression: 'Compression API উপলব্ধ নয়। iOS 16.4+ প্রয়োজন।'
  });
  patch('pt', {
    errorDecryptPwd: 'Falha na descriptografia: senha incorreta ou arquivo corrompido.',
    errorEngineLoad: 'Não foi possível carregar o CryptEngine.',
    errorCompression: 'API de compressão indisponível. Requer iOS 16.4+.'
  });
  patch('id', {
    errorDecryptPwd: 'Dekripsi gagal: kata sandi salah atau file rusak.',
    errorEngineLoad: 'CryptEngine gagal dimuat.',
    errorCompression: 'API kompresi tidak tersedia. iOS 16.4+ diperlukan.'
  });
  patch('ur', {
    errorDecryptPwd: 'ڈیکرپشن ناکام: غلط پاس ورڈ یا خراب فائل۔',
    errorEngineLoad: 'CryptEngine لوڈ نہیں ہو سکا۔',
    errorCompression: 'Compression API دستیاب نہیں۔ iOS 16.4+ درکار ہے۔'
  });
})();

(function () {
  'use strict';

  var titles = {
    en: 'CryptCat = OpenSource + Offline Encryption',
    'zh-Hans': '加密猫 = 源代码开源 + 离线加密',
    hi: 'क्रिप्टकैट = ओपन सोर्स + ऑफ़लाइन एन्क्रिप्शन',
    es: 'CriptoGato = Código abierto + Cifrado sin conexión',
    ar: 'قط التشفير = مفتوح المصدر + تشفير بدون اتصال',
    fr: 'CryptoChat = Open source + Chiffrement hors ligne',
    bn: 'ক্রিপ্টক্যাট = ওপেন সোর্স + অফলাইন এনক্রিপশন',
    pt: 'CriptoGato = Código aberto + Criptografia offline',
    ru: 'Криптокот = Открытый код + Офлайн-шифрование',
    id: 'KucingKripto = Sumber terbuka + Enkripsi offline',
    ur: 'کرپٹو بلی = اوپن سورس + آف لائن انکرپشن',
    de: 'KryptoKatze = Open Source + Offline-Verschlüsselung',
    ja: 'クリプトキャット = オープンソース + オフライン暗号化',
    sw: 'PakaSiri = Chanzo huria + Usimbaji nje ya mtandao',
    mr: 'क्रिप्टोमांजर = ओपन सोर्स + ऑफलाइन एन्क्रिप्शन',
    te: 'క్రిప్టోపిల్లి = ఓపెన్ సోర్స్ + ఆఫ్‌లైన్ ఎన్‌క్రిప్షన్',
    tr: 'KriptoKedi = Açık kaynak + Çevrimdışı şifreleme',
    ta: 'கிரிப்டோபூனை = திறந்த மூலம் + இணையமில்லா குறியாக்கம்',
    vi: 'MèoMãHóa = Mã nguồn mở + Mã hóa ngoại tuyến',
    ko: '크립토캣 = 오픈소스 + 오프라인 암호화',
    it: 'CriptoGatto = Open source + Crittografia offline',
    th: 'แมวคริปโต = โอเพ่นซอร์ส + การเข้ารหัสแบบออฟไลน์',
    gu: 'ક્રિપ્ટોબિલાડી = ઓપન સોર્સ + ઑફલાઇન એન્ક્રિપ્શન',
    pl: 'KryptoKot = Otwarty kod + Szyfrowanie offline',
    uk: 'Криптокіт = Відкритий код + Офлайн-шифрування',
    ms: 'KucingKripto = Sumber terbuka + Penyulitan luar talian',
    fa: 'گربه‌رمز = متن‌باز + رمزگذاری آفلاین',
    kn: 'ಕ್ರಿಪ್ಟೋಬೆಕ್ಕು = ಮುಕ್ತ ಮೂಲ + ಆಫ್‌ಲೈನ್ ಎನ್‌ಕ್ರಿಪ್ಷನ್',
    ml: 'ക്രിപ്റ്റോപൂച്ച = ഓപ്പൺ സോഴ്‌സ് + ഓഫ്‌ലൈൻ എൻക്രിപ്ഷൻ',
    or: 'କ୍ରିପ୍ଟୋବିଲେଇ = ଓପନ୍ ସୋର୍ସ + ଅଫଲାଇନ୍ ଏନକ୍ରିପ୍ସନ୍',
    my: 'Cryptoကြောင် = အွပ်ပင်ဆိုစ် + အော့ဖ်လိုင်း စာဝှက်ခြင်း',
    ha: 'KyanwarSirri = Buɗaɗɗen tushe + Rufe bayanai ba tare da intanet ba',
    pa: 'ਕ੍ਰਿਪਟੋਬਿੱਲੀ = ਓਪਨ ਸੋਰਸ + ਆਫਲਾਈਨ ਇਨਕ੍ਰਿਪਸ਼ਨ',
    yo: 'OlógbòKripto = Orísun ṣiṣi + Ìfipamọ́kọ̀wé aisinipo',
    am: 'ክሪፕቶድመት = ክፍት ምንጭ + ከመስመር ውጭ ማመስጠር',
    ro: 'CriptoPisică = Sursă deschisă + Criptare offline',
    nl: 'CryptoKat = Open source + Offline versleuteling',
    fil: 'CryptPusa = Open source + Offline na pag-encrypt',
    ps: 'کریپټو پیشو = خلاصه سرچینه + آفلاین کوډول',
    uz: 'KriptoMushuk = Ochiq manba + Oflayn shifrlash',
    sd: 'ڪرپٽو ٻلي = اوپن سورس + آف لائن انڪرپشن',
    az: 'KriptoPişik = Açıq mənbə + Oflayn şifrələmə',
    ne: 'क्रिप्टोबिरालो = खुला स्रोत + अफलाइन एन्क्रिप्शन',
    si: 'ක්‍රිප්ටෝබළලා = විවෘත මූලාශ්‍ර + නොබැඳි සංකේතනය',
    km: 'ឆ្មាគ្រីបតូ = ប្រភពបើកចំហ + ការអ៊ិនគ្រីបក្រៅបណ្តាញ',
    he: 'קריפטו-חתול = קוד פתוח + הצפנה לא מקוונת',
    el: 'ΚρυπτοΓάτα = Ανοικτός κώδικας + Κρυπτογράφηση εκτός σύνδεσης',
    cs: 'KryptoKočka = Otevřený zdrojový kód + Offline šifrování',
    sv: 'KryptoKatt = Öppen källkod + Offlinekryptering',
    hu: 'KriptoMacska = Nyílt forráskód + Offline titkosítás'
  };

  window.I18N_TITLE_OVERRIDES = titles;

  for (var code in titles) {
    if (Object.prototype.hasOwnProperty.call(titles, code)) {
      window.I18N_EXTRA[code] = Object.assign({}, window.I18N_EXTRA[code] || {}, { appTitle: titles[code] });
    }
  }
})();

(function () {
  'use strict';

  var keys = [
    'appTitle', 'modeDecrypt', 'modeEncrypt', 'dropTitleDecrypt', 'dropTitleEncrypt',
    'dropHint', 'fileSelected', 'pwdLabel', 'pwdLabelDecrypt', 'pwdLabelEncrypt',
    'pwdPlaceholder', 'confirmLabel', 'confirmPlaceholder', 'btnDecrypt', 'btnEncrypt',
    'pwdMatch', 'pwdNoMatch', 'pwdFingerprintMatch', 'pwdFingerprintMismatch',
    'statusReading', 'statusDecrypting', 'statusEncrypting', 'statusDecompressing',
    'statusCompressing', 'successDecrypt', 'successEncrypt', 'errorFormat',
    'errorDecrypt', 'errorNoFiles', 'errorDecryptPwd', 'errorEngineLoad',
    'errorCompression', 'errorBrowser', 'securityBadge', 'selectCrypt3',
    'alreadyCrypt3', 'fileSaved', 'shareFile', 'langSearch'
  ];

  function add(code, values) {
    var bundle = {};
    for (var i = 0; i < keys.length; i++) bundle[keys[i]] = values[i];
    window.I18N_EXTRA[code] = bundle;
  }

  add('sw', [
    'CryptCat = Chanzo Huria + Usimbaji Nje ya Mtandao', 'Fungua', 'Simba', 'Weka faili .crypt3 hapa',
    'Weka faili ya kusimba hapa', 'au gusa kuchagua faili', 'Faili limechaguliwa',
    'Nenosiri', 'Nenosiri la kufungua', 'Nenosiri la kusimba', 'Weka nenosiri lako',
    'Thibitisha nenosiri', 'Weka nenosiri tena', 'Fungua na Uhifadhi', 'Simba na Uhifadhi',
    'Nenosiri yanalingana', 'Nenosiri hayalingani', 'Alama ya nenosiri inalingana',
    'Alama ya nenosiri hailingani', 'Inasoma faili…', 'Inafungua (AES-256-CBC)…',
    'Inasimba (AES-256-CBC)…', 'Inafungua mkandamizo (gzip + tar)…',
    'Inakandamiza (tar + gzip)…', 'Kufungua kumefaulu! Faili limehifadhiwa.',
    'Usimbaji umefaulu! Faili limehifadhiwa.', 'Umbizo batili: kichwa cha OpenSSL hakipo.',
    'Kufungua kumeshindwa: nenosiri si sahihi au faili limeharibika.',
    'Hakuna faili lililopatikana baada ya kufungua mkandamizo.',
    'Kufungua kumeshindwa: nenosiri si sahihi au faili limeharibika.',
    'CryptEngine imeshindwa kupakia.', 'API ya ukandamizaji haipatikani. iOS 16.4+ inahitajika.',
    'Kivinjari hiki hakiungi mkono API inayohitajika.',
    '100% nje ya mtandao · Data haitoki kwenye kifaa hiki', 'Tafadhali chagua faili .crypt3',
    'Faili hili tayari ni .crypt3, badili kwenda hali ya kufungua', 'Faili limehifadhiwa kwenye',
    'Shiriki', 'Tafuta lugha…'
  ]);

  add('mr', [
    'CryptCat = ओपन सोर्स + ऑफलाइन एन्क्रिप्शन', 'डीक्रिप्ट', 'एन्क्रिप्ट', '.crypt3 फाइल येथे टाका',
    'एन्क्रिप्ट करण्यासाठी फाइल येथे टाका', 'किंवा फाइल निवडण्यासाठी टॅप करा', 'फाइल निवडली आहे',
    'पासवर्ड', 'डीक्रिप्शन पासवर्ड', 'एन्क्रिप्शन पासवर्ड', 'तुमचा पासवर्ड टाका',
    'पासवर्ड पुष्टी करा', 'पासवर्ड पुन्हा टाका', 'डीक्रिप्ट करा आणि जतन करा',
    'एन्क्रिप्ट करा आणि जतन करा', 'पासवर्ड जुळतात', 'पासवर्ड जुळत नाहीत',
    'पासवर्ड फिंगरप्रिंट जुळतो', 'पासवर्ड फिंगरप्रिंट जुळत नाही',
    'फाइल वाचत आहे…', 'डीक्रिप्ट होत आहे (AES-256-CBC)…',
    'एन्क्रिप्ट होत आहे (AES-256-CBC)…', 'डीकंप्रेस होत आहे (gzip + tar)…',
    'कंप्रेस होत आहे (tar + gzip)…', 'डीक्रिप्शन यशस्वी! फाइल जतन झाली.',
    'एन्क्रिप्शन यशस्वी! फाइल जतन झाली.', 'अवैध फाइल स्वरूप: OpenSSL हेडर नाही.',
    'डीक्रिप्शन अयशस्वी: चुकीचा पासवर्ड किंवा खराब फाइल.',
    'डीकंप्रेशननंतर कोणतीही फाइल सापडली नाही.',
    'डीक्रिप्शन अयशस्वी: चुकीचा पासवर्ड किंवा खराब फाइल.',
    'CryptEngine लोड होऊ शकले नाही.', 'कंप्रेशन API उपलब्ध नाही. iOS 16.4+ आवश्यक.',
    'हे ब्राउझर आवश्यक API समर्थित करत नाही.',
    '100% ऑफलाइन · डेटा या उपकरणाबाहेर कधीही जात नाही', 'कृपया .crypt3 फाइल निवडा',
    'ही फाइल आधीच .crypt3 आहे, डीक्रिप्ट मोडवर जा', 'फाइल येथे जतन झाली',
    'शेअर करा', 'भाषा शोधा…'
  ]);

  add('te', [
    'CryptCat = ఓపెన్ సోర్స్ + ఆఫ్‌లైన్ ఎన్‌క్రిప్షన్', 'డీక్రిప్ట్', 'ఎన్‌క్రిప్ట్', '.crypt3 ఫైల్‌ను ఇక్కడ వదలండి',
    'ఎన్‌క్రిప్ట్ చేయాల్సిన ఫైల్‌ను ఇక్కడ వదలండి', 'లేదా ఫైల్ ఎంచుకోవడానికి తాకండి', 'ఫైల్ ఎంచుకున్నారు',
    'పాస్‌వర్డ్', 'డీక్రిప్షన్ పాస్‌వర్డ్', 'ఎన్‌క్రిప్షన్ పాస్‌వర్డ్', 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
    'పాస్‌వర్డ్ నిర్ధారించండి', 'పాస్‌వర్డ్ మళ్లీ నమోదు చేయండి', 'డీక్రిప్ట్ చేసి సేవ్ చేయండి',
    'ఎన్‌క్రిప్ట్ చేసి సేవ్ చేయండి', 'పాస్‌వర్డ్‌లు సరిపోలాయి', 'పాస్‌వర్డ్‌లు సరిపోలలేదు',
    'పాస్‌వర్డ్ ఫింగర్‌ప్రింట్ సరిపోలింది', 'పాస్‌వర్డ్ ఫింగర్‌ప్రింట్ సరిపోలలేదు',
    'ఫైల్ చదువుతోంది…', 'డీక్రిప్ట్ చేస్తోంది (AES-256-CBC)…',
    'ఎన్‌క్రిప్ట్ చేస్తోంది (AES-256-CBC)…', 'డీకంప్రెస్ చేస్తోంది (gzip + tar)…',
    'కంప్రెస్ చేస్తోంది (tar + gzip)…', 'డీక్రిప్షన్ విజయవంతం! ఫైల్ సేవ్ అయింది.',
    'ఎన్‌క్రిప్షన్ విజయవంతం! ఫైల్ సేవ్ అయింది.', 'చెల్లని ఫైల్ ఫార్మాట్: OpenSSL హెడర్ లేదు.',
    'డీక్రిప్షన్ విఫలమైంది: తప్పు పాస్‌వర్డ్ లేదా దెబ్బతిన్న ఫైల్.',
    'డీకంప్రెస్ చేసిన తర్వాత ఫైళ్లు కనిపించలేదు.',
    'డీక్రిప్షన్ విఫలమైంది: తప్పు పాస్‌వర్డ్ లేదా దెబ్బతిన్న ఫైల్.',
    'CryptEngine లోడ్ కాలేదు.', 'కంప్రెషన్ API అందుబాటులో లేదు. iOS 16.4+ అవసరం.',
    'ఈ బ్రౌజర్ అవసరమైన APIని మద్దతు ఇవ్వదు.',
    '100% ఆఫ్‌లైన్ · డేటా ఈ పరికరాన్ని ఎప్పుడూ విడిచిపోదు', 'దయచేసి .crypt3 ఫైల్ ఎంచుకోండి',
    'ఈ ఫైల్ ఇప్పటికే .crypt3 ఫార్మాట్‌లో ఉంది, డీక్రిప్ట్ మోడ్‌కు మారండి',
    'ఫైల్ సేవ్ అయింది', 'షేర్ చేయండి', 'భాషలను వెతకండి…'
  ]);

  add('ta', [
    'CryptCat = திறந்த மூலம் + இணையமில்லா குறியாக்கம்', 'மறைகுறி நீக்கு', 'குறியாக்கு', '.crypt3 கோப்பை இங்கே விடுங்கள்',
    'குறியாக்க வேண்டிய கோப்பை இங்கே விடுங்கள்', 'அல்லது கோப்பைத் தேர்வுசெய்ய தட்டுங்கள்', 'கோப்பு தேர்ந்தெடுக்கப்பட்டது',
    'கடவுச்சொல்', 'மறைகுறி நீக்கும் கடவுச்சொல்', 'குறியாக்க கடவுச்சொல்', 'உங்கள் கடவுச்சொல்லை உள்ளிடுங்கள்',
    'கடவுச்சொல்லை உறுதிப்படுத்தவும்', 'கடவுச்சொல்லை மீண்டும் உள்ளிடுங்கள்', 'மறைகுறி நீக்கி சேமி',
    'குறியாக்கி சேமி', 'கடவுச்சொற்கள் பொருந்துகின்றன', 'கடவுச்சொற்கள் பொருந்தவில்லை',
    'கடவுச்சொல் கைரேகை பொருந்துகிறது', 'கடவுச்சொல் கைரேகை பொருந்தவில்லை',
    'கோப்பை வாசிக்கிறது…', 'மறைகுறி நீக்குகிறது (AES-256-CBC)…',
    'குறியாக்குகிறது (AES-256-CBC)…', 'சுருக்கத்தை திறக்கிறது (gzip + tar)…',
    'சுருக்குகிறது (tar + gzip)…', 'மறைகுறி நீக்கம் வெற்றி! கோப்பு சேமிக்கப்பட்டது.',
    'குறியாக்கம் வெற்றி! கோப்பு சேமிக்கப்பட்டது.', 'தவறான கோப்பு வடிவம்: OpenSSL தலைப்பு இல்லை.',
    'மறைகுறி நீக்கம் தோல்வி: தவறான கடவுச்சொல் அல்லது சேதமடைந்த கோப்பு.',
    'சுருக்கம் திறந்த பின் கோப்புகள் எதுவும் இல்லை.',
    'மறைகுறி நீக்கம் தோல்வி: தவறான கடவுச்சொல் அல்லது சேதமடைந்த கோப்பு.',
    'CryptEngine ஏற்றப்படவில்லை.', 'சுருக்க API கிடைக்கவில்லை. iOS 16.4+ தேவை.',
    'இந்த உலாவி தேவையான API ஐ ஆதரிக்கவில்லை.',
    '100% இணையமில்லை · தரவு இந்த சாதனத்தை விட்டு வெளியேறாது', '.crypt3 கோப்பைத் தேர்வுசெய்யவும்',
    'இந்த கோப்பு ஏற்கனவே .crypt3 வடிவில் உள்ளது, மறைகுறி நீக்க முறைக்கு மாறவும்',
    'கோப்பு சேமிக்கப்பட்ட இடம்', 'பகிர்', 'மொழிகளைத் தேடு…'
  ]);

  add('th', [
    'CryptCat = โอเพ่นซอร์ส + การเข้ารหัสแบบออฟไลน์', 'ถอดรหัส', 'เข้ารหัส', 'วางไฟล์ .crypt3 ที่นี่',
    'วางไฟล์ที่จะเข้ารหัสที่นี่', 'หรือแตะเพื่อเลือกไฟล์', 'เลือกไฟล์แล้ว',
    'รหัสผ่าน', 'รหัสผ่านสำหรับถอดรหัส', 'รหัสผ่านสำหรับเข้ารหัส', 'ป้อนรหัสผ่านของคุณ',
    'ยืนยันรหัสผ่าน', 'ป้อนรหัสผ่านอีกครั้ง', 'ถอดรหัสและบันทึก', 'เข้ารหัสและบันทึก',
    'รหัสผ่านตรงกัน', 'รหัสผ่านไม่ตรงกัน', 'ลายนิ้วมือรหัสผ่านตรงกัน',
    'ลายนิ้วมือรหัสผ่านไม่ตรงกัน', 'กำลังอ่านไฟล์…', 'กำลังถอดรหัส (AES-256-CBC)…',
    'กำลังเข้ารหัส (AES-256-CBC)…', 'กำลังคลายบีบอัด (gzip + tar)…',
    'กำลังบีบอัด (tar + gzip)…', 'ถอดรหัสสำเร็จ! บันทึกไฟล์แล้ว',
    'เข้ารหัสสำเร็จ! บันทึกไฟล์แล้ว', 'รูปแบบไฟล์ไม่ถูกต้อง: ไม่มีส่วนหัว OpenSSL',
    'ถอดรหัสไม่สำเร็จ: รหัสผ่านผิดหรือไฟล์เสียหาย',
    'ไม่พบไฟล์หลังคลายบีบอัด', 'ถอดรหัสไม่สำเร็จ: รหัสผ่านผิดหรือไฟล์เสียหาย',
    'โหลด CryptEngine ไม่สำเร็จ', 'ไม่มี Compression API ต้องใช้ iOS 16.4+',
    'เบราว์เซอร์นี้ไม่รองรับ API ที่จำเป็น',
    'ออฟไลน์ 100% · ข้อมูลไม่ออกจากอุปกรณ์นี้', 'โปรดเลือกไฟล์ .crypt3',
    'ไฟล์นี้เป็นรูปแบบ .crypt3 อยู่แล้ว โปรดเปลี่ยนเป็นโหมดถอดรหัส',
    'บันทึกไฟล์ไปยัง', 'แชร์', 'ค้นหาภาษา…'
  ]);

  add('gu', [
    'CryptCat = ઓપન સોર્સ + ઑફલાઇન એન્ક્રિપ્શન', 'ડિક્રિપ્ટ', 'એન્ક્રિપ્ટ', '.crypt3 ફાઇલ અહીં મૂકો',
    'એન્ક્રિપ્ટ કરવાની ફાઇલ અહીં મૂકો', 'અથવા ફાઇલ પસંદ કરવા ટેપ કરો', 'ફાઇલ પસંદ થઈ',
    'પાસવર્ડ', 'ડિક્રિપ્શન પાસવર્ડ', 'એન્ક્રિપ્શન પાસવર્ડ', 'તમારો પાસવર્ડ દાખલ કરો',
    'પાસવર્ડની પુષ્ટિ કરો', 'પાસવર્ડ ફરી દાખલ કરો', 'ડિક્રિપ્ટ કરીને સાચવો',
    'એન્ક્રિપ્ટ કરીને સાચવો', 'પાસવર્ડ મેળ ખાય છે', 'પાસવર્ડ મેળ ખાતા નથી',
    'પાસવર્ડ ફિંગરપ્રિન્ટ મેળ ખાય છે', 'પાસવર્ડ ફિંગરપ્રિન્ટ મેળ ખાતી નથી',
    'ફાઇલ વાંચી રહ્યું છે…', 'ડિક્રિપ્ટ થઈ રહ્યું છે (AES-256-CBC)…',
    'એન્ક્રિપ્ટ થઈ રહ્યું છે (AES-256-CBC)…', 'ડીકમ્પ્રેસ થઈ રહ્યું છે (gzip + tar)…',
    'કમ્પ્રેસ થઈ રહ્યું છે (tar + gzip)…', 'ડિક્રિપ્શન સફળ! ફાઇલ સાચવાઈ.',
    'એન્ક્રિપ્શન સફળ! ફાઇલ સાચવાઈ.', 'અમાન્ય ફાઇલ ફોર્મેટ: OpenSSL હેડર ગાયબ.',
    'ડિક્રિપ્શન નિષ્ફળ: ખોટો પાસવર્ડ અથવા ખરાબ ફાઇલ.',
    'ડીકમ્પ્રેશન પછી કોઈ ફાઇલ મળી નથી.',
    'ડિક્રિપ્શન નિષ્ફળ: ખોટો પાસવર્ડ અથવા ખરાબ ફાઇલ.',
    'CryptEngine લોડ થઈ શક્યું નથી.', 'કમ્પ્રેશન API ઉપલબ્ધ નથી. iOS 16.4+ જરૂરી.',
    'આ બ્રાઉઝર જરૂરી APIને સપોર્ટ કરતું નથી.',
    '100% ઑફલાઇન · ડેટા ક્યારેય આ ઉપકરણ છોડતું નથી', 'કૃપા કરીને .crypt3 ફાઇલ પસંદ કરો',
    'આ ફાઇલ પહેલેથી .crypt3 છે, ડિક્રિપ્ટ મોડ પર જાઓ', 'ફાઇલ અહીં સાચવાઈ',
    'શેર કરો', 'ભાષા શોધો…'
  ]);

  add('pl', [
    'CryptCat = Otwarty kod + Szyfrowanie offline', 'Odszyfruj', 'Zaszyfruj', 'Upuść tutaj plik .crypt3',
    'Upuść tutaj plik do zaszyfrowania', 'lub stuknij, aby wybrać plik', 'Wybrano plik',
    'Hasło', 'Hasło do odszyfrowania', 'Hasło do szyfrowania', 'Wpisz hasło',
    'Potwierdź hasło', 'Wpisz hasło ponownie', 'Odszyfruj i zapisz', 'Zaszyfruj i zapisz',
    'Hasła są zgodne', 'Hasła nie są zgodne', 'Odcisk hasła jest zgodny',
    'Odcisk hasła nie jest zgodny', 'Odczytywanie pliku…', 'Odszyfrowywanie (AES-256-CBC)…',
    'Szyfrowanie (AES-256-CBC)…', 'Dekompresja (gzip + tar)…', 'Kompresja (tar + gzip)…',
    'Odszyfrowano pomyślnie! Plik zapisany.', 'Zaszyfrowano pomyślnie! Plik zapisany.',
    'Nieprawidłowy format pliku: brak nagłówka OpenSSL.',
    'Odszyfrowanie nie powiodło się: błędne hasło lub uszkodzony plik.',
    'Nie znaleziono plików po dekompresji.',
    'Odszyfrowanie nie powiodło się: błędne hasło lub uszkodzony plik.',
    'Nie udało się załadować CryptEngine.', 'API kompresji niedostępne. Wymagany iOS 16.4+.',
    'Ta przeglądarka nie obsługuje wymaganego API.',
    '100% offline · Dane nigdy nie opuszczają tego urządzenia', 'Wybierz plik .crypt3',
    'Ten plik jest już w formacie .crypt3, przełącz na odszyfrowanie', 'Plik zapisany w',
    'Udostępnij', 'Szukaj języka…'
  ]);

  add('uk', [
    'CryptCat = Відкритий код + Офлайн-шифрування', 'Розшифрувати', 'Зашифрувати', 'Перетягніть файл .crypt3 сюди',
    'Перетягніть файл для шифрування сюди', 'або торкніться, щоб вибрати файл', 'Файл вибрано',
    'Пароль', 'Пароль розшифрування', 'Пароль шифрування', 'Введіть пароль',
    'Підтвердьте пароль', 'Введіть пароль ще раз', 'Розшифрувати й зберегти',
    'Зашифрувати й зберегти', 'Паролі збігаються', 'Паролі не збігаються',
    'Відбиток пароля збігається', 'Відбиток пароля не збігається',
    'Читання файлу…', 'Розшифрування (AES-256-CBC)…', 'Шифрування (AES-256-CBC)…',
    'Розпакування (gzip + tar)…', 'Стискання (tar + gzip)…',
    'Розшифрування успішне! Файл збережено.', 'Шифрування успішне! Файл збережено.',
    'Недійсний формат файлу: відсутній заголовок OpenSSL.',
    'Не вдалося розшифрувати: неправильний пароль або пошкоджений файл.',
    'Після розпакування файлів не знайдено.',
    'Не вдалося розшифрувати: неправильний пароль або пошкоджений файл.',
    'Не вдалося завантажити CryptEngine.', 'API стискання недоступне. Потрібен iOS 16.4+.',
    'Цей браузер не підтримує потрібний API.',
    '100% офлайн · Дані ніколи не залишають цей пристрій', 'Виберіть файл .crypt3',
    'Цей файл уже має формат .crypt3, перейдіть у режим розшифрування', 'Файл збережено в',
    'Поділитися', 'Пошук мов…'
  ]);

  add('ms', [
    'CryptCat = Sumber Terbuka + Penyulitan Luar Talian', 'Nyahsulit', 'Sulitkan', 'Lepaskan fail .crypt3 di sini',
    'Lepaskan fail untuk disulitkan di sini', 'atau ketik untuk memilih fail', 'Fail dipilih',
    'Kata laluan', 'Kata laluan nyahsulit', 'Kata laluan penyulitan', 'Masukkan kata laluan anda',
    'Sahkan kata laluan', 'Masukkan kata laluan sekali lagi', 'Nyahsulit & Simpan',
    'Sulitkan & Simpan', 'Kata laluan sepadan', 'Kata laluan tidak sepadan',
    'Cap jari kata laluan sepadan', 'Cap jari kata laluan tidak sepadan',
    'Membaca fail…', 'Menyahsulit (AES-256-CBC)…', 'Menyulitkan (AES-256-CBC)…',
    'Menyahmampat (gzip + tar)…', 'Memampatkan (tar + gzip)…',
    'Nyahsulit berjaya! Fail disimpan.', 'Penyulitan berjaya! Fail disimpan.',
    'Format fail tidak sah: pengepala OpenSSL tiada.',
    'Nyahsulit gagal: kata laluan salah atau fail rosak.',
    'Tiada fail ditemui selepas nyahmampat.',
    'Nyahsulit gagal: kata laluan salah atau fail rosak.',
    'CryptEngine gagal dimuatkan.', 'API mampatan tidak tersedia. iOS 16.4+ diperlukan.',
    'Pelayar ini tidak menyokong API yang diperlukan.',
    '100% luar talian · Data tidak pernah meninggalkan peranti ini', 'Sila pilih fail .crypt3',
    'Fail ini sudah dalam format .crypt3, tukar ke mod nyahsulit', 'Fail disimpan ke',
    'Kongsi', 'Cari bahasa…'
  ]);

  add('fa', [
    'CryptCat = متن‌باز + رمزگذاری آفلاین', 'رمزگشایی', 'رمزگذاری', 'فایل .crypt3 را اینجا رها کنید',
    'فایل برای رمزگذاری را اینجا رها کنید', 'یا برای انتخاب فایل لمس کنید', 'فایل انتخاب شد',
    'رمز عبور', 'رمز عبور رمزگشایی', 'رمز عبور رمزگذاری', 'رمز عبور خود را وارد کنید',
    'تأیید رمز عبور', 'رمز عبور را دوباره وارد کنید', 'رمزگشایی و ذخیره',
    'رمزگذاری و ذخیره', 'رمزها یکسان هستند', 'رمزها یکسان نیستند',
    'اثر انگشت رمز عبور مطابقت دارد', 'اثر انگشت رمز عبور مطابقت ندارد',
    'در حال خواندن فایل…', 'در حال رمزگشایی (AES-256-CBC)…',
    'در حال رمزگذاری (AES-256-CBC)…', 'در حال باز کردن فشرده‌سازی (gzip + tar)…',
    'در حال فشرده‌سازی (tar + gzip)…', 'رمزگشایی موفق بود! فایل ذخیره شد.',
    'رمزگذاری موفق بود! فایل ذخیره شد.', 'فرمت فایل نامعتبر است: سرآیند OpenSSL وجود ندارد.',
    'رمزگشایی ناموفق بود: رمز عبور اشتباه یا فایل خراب است.',
    'پس از باز کردن فشرده‌سازی فایلی پیدا نشد.',
    'رمزگشایی ناموفق بود: رمز عبور اشتباه یا فایل خراب است.',
    'CryptEngine بارگذاری نشد.', 'API فشرده‌سازی در دسترس نیست. iOS 16.4+ لازم است.',
    'این مرورگر از API مورد نیاز پشتیبانی نمی‌کند.',
    '۱۰۰٪ آفلاین · داده هرگز از این دستگاه خارج نمی‌شود', 'لطفاً یک فایل .crypt3 انتخاب کنید',
    'این فایل از قبل .crypt3 است، به حالت رمزگشایی بروید', 'فایل ذخیره شد در',
    'اشتراک‌گذاری', 'جستجوی زبان…'
  ]);

  add('kn', [
    'CryptCat = ಮುಕ್ತ ಮೂಲ + ಆಫ್‌ಲೈನ್ ಎನ್‌ಕ್ರಿಪ್ಷನ್', 'ಡೀಕ್ರಿಪ್ಟ್', 'ಎನ್‌ಕ್ರಿಪ್ಟ್', '.crypt3 ಫೈಲ್ ಅನ್ನು ಇಲ್ಲಿ ಬಿಡಿ',
    'ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಬೇಕಾದ ಫೈಲ್ ಅನ್ನು ಇಲ್ಲಿ ಬಿಡಿ', 'ಅಥವಾ ಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ', 'ಫೈಲ್ ಆಯ್ಕೆಯಾಗಿದೆ',
    'ಪಾಸ್‌ವರ್ಡ್', 'ಡೀಕ್ರಿಪ್ಷನ್ ಪಾಸ್‌ವರ್ಡ್', 'ಎನ್‌ಕ್ರಿಪ್ಷನ್ ಪಾಸ್‌ವರ್ಡ್', 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
    'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ', 'ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತೆ ನಮೂದಿಸಿ', 'ಡೀಕ್ರಿಪ್ಟ್ ಮಾಡಿ ಉಳಿಸಿ',
    'ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಿ ಉಳಿಸಿ', 'ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಿಕೆಯಾಗಿವೆ', 'ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಿಕೆಯಾಗಿಲ್ಲ',
    'ಪಾಸ್‌ವರ್ಡ್ ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ', 'ಪಾಸ್‌ವರ್ಡ್ ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಹೊಂದಿಕೆಯಾಗಿಲ್ಲ',
    'ಫೈಲ್ ಓದುತ್ತಿದೆ…', 'ಡೀಕ್ರಿಪ್ಟ್ ಮಾಡುತ್ತಿದೆ (AES-256-CBC)…',
    'ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡುತ್ತಿದೆ (AES-256-CBC)…', 'ಡೀಕಂಪ್ರೆಸ್ ಮಾಡುತ್ತಿದೆ (gzip + tar)…',
    'ಕಂಪ್ರೆಸ್ ಮಾಡುತ್ತಿದೆ (tar + gzip)…', 'ಡೀಕ್ರಿಪ್ಷನ್ ಯಶಸ್ವಿ! ಫೈಲ್ ಉಳಿಸಲಾಗಿದೆ.',
    'ಎನ್‌ಕ್ರಿಪ್ಷನ್ ಯಶಸ್ವಿ! ಫೈಲ್ ಉಳಿಸಲಾಗಿದೆ.', 'ಅಮಾನ್ಯ ಫೈಲ್ ರೂಪ: OpenSSL ಹೆಡರ್ ಇಲ್ಲ.',
    'ಡೀಕ್ರಿಪ್ಷನ್ ವಿಫಲ: ತಪ್ಪು ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಹಾನಿಯಾದ ಫೈಲ್.',
    'ಡೀಕಂಪ್ರೆಶನ್ ನಂತರ ಯಾವುದೇ ಫೈಲ್ ಕಂಡುಬಂದಿಲ್ಲ.',
    'ಡೀಕ್ರಿಪ್ಷನ್ ವಿಫಲ: ತಪ್ಪು ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಹಾನಿಯಾದ ಫೈಲ್.',
    'CryptEngine ಲೋಡ್ ಆಗಲಿಲ್ಲ.', 'ಕಂಪ್ರೆಶನ್ API ಲಭ್ಯವಿಲ್ಲ. iOS 16.4+ ಅಗತ್ಯ.',
    'ಈ ಬ್ರೌಸರ್ ಅಗತ್ಯ API ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.',
    '100% ಆಫ್‌ಲೈನ್ · ಡೇಟಾ ಈ ಸಾಧನದಿಂದ ಹೊರಹೋಗುವುದಿಲ್ಲ', 'ದಯವಿಟ್ಟು .crypt3 ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
    'ಈ ಫೈಲ್ ಈಗಾಗಲೇ .crypt3 ರೂಪದಲ್ಲಿದೆ, ಡೀಕ್ರಿಪ್ಟ್ ಮೋಡ್‌ಗೆ ಬದಲಿಸಿ',
    'ಫೈಲ್ ಉಳಿಸಲಾಗಿದೆ', 'ಹಂಚಿಕೊಳ್ಳಿ', 'ಭಾಷೆ ಹುಡುಕಿ…'
  ]);

  add('ml', [
    'CryptCat = ഓപ്പൺ സോഴ്‌സ് + ഓഫ്‌ലൈൻ എൻക്രിപ്ഷൻ', 'ഡീക്രിപ്റ്റ്', 'എൻക്രിപ്റ്റ്', '.crypt3 ഫയൽ ഇവിടെ ഇടുക',
    'എൻക്രിപ്റ്റ് ചെയ്യാനുള്ള ഫയൽ ഇവിടെ ഇടുക', 'അല്ലെങ്കിൽ ഫയൽ തിരഞ്ഞെടുക്കാൻ ടാപ്പ് ചെയ്യുക', 'ഫയൽ തിരഞ്ഞെടുത്തു',
    'പാസ്‌വേഡ്', 'ഡീക്രിപ്ഷൻ പാസ്‌വേഡ്', 'എൻക്രിപ്ഷൻ പാസ്‌വേഡ്', 'നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക',
    'പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക', 'പാസ്‌വേഡ് വീണ്ടും നൽകുക', 'ഡീക്രിപ്റ്റ് ചെയ്ത് സംരക്ഷിക്കുക',
    'എൻക്രിപ്റ്റ് ചെയ്ത് സംരക്ഷിക്കുക', 'പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നു', 'പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല',
    'പാസ്‌വേഡ് ഫിംഗർപ്രിന്റ് പൊരുത്തപ്പെടുന്നു', 'പാസ്‌വേഡ് ഫിംഗർപ്രിന്റ് പൊരുത്തപ്പെടുന്നില്ല',
    'ഫയൽ വായിക്കുന്നു…', 'ഡീക്രിപ്റ്റ് ചെയ്യുന്നു (AES-256-CBC)…',
    'എൻക്രിപ്റ്റ് ചെയ്യുന്നു (AES-256-CBC)…', 'ഡീകമ്പ്രസ് ചെയ്യുന്നു (gzip + tar)…',
    'കമ്പ്രസ് ചെയ്യുന്നു (tar + gzip)…', 'ഡീക്രിപ്ഷൻ വിജയിച്ചു! ഫയൽ സംരക്ഷിച്ചു.',
    'എൻക്രിപ്ഷൻ വിജയിച്ചു! ഫയൽ സംരക്ഷിച്ചു.', 'അസാധുവായ ഫയൽ ഫോർമാറ്റ്: OpenSSL ഹെഡർ ഇല്ല.',
    'ഡീക്രിപ്ഷൻ പരാജയപ്പെട്ടു: തെറ്റായ പാസ്‌വേഡ് അല്ലെങ്കിൽ കേടായ ഫയൽ.',
    'ഡീകമ്പ്രഷൻ കഴിഞ്ഞ് ഫയലുകൾ കണ്ടെത്തിയില്ല.',
    'ഡീക്രിപ്ഷൻ പരാജയപ്പെട്ടു: തെറ്റായ പാസ്‌വേഡ് അല്ലെങ്കിൽ കേടായ ഫയൽ.',
    'CryptEngine ലോഡ് ചെയ്യാനായില്ല.', 'കമ്പ്രഷൻ API ലഭ്യമല്ല. iOS 16.4+ ആവശ്യമാണ്.',
    'ഈ ബ്രൗസർ ആവശ്യമായ API പിന്തുണക്കുന്നില്ല.',
    '100% ഓഫ്‌ലൈൻ · ഡാറ്റ ഈ ഉപകരണം വിട്ടുപോകില്ല', '.crypt3 ഫയൽ തിരഞ്ഞെടുക്കുക',
    'ഈ ഫയൽ ഇതിനകം .crypt3 ആണ്, ഡീക്രിപ്റ്റ് മോഡിലേക്ക് മാറുക',
    'ഫയൽ സംരക്ഷിച്ചത്', 'പങ്കിടുക', 'ഭാഷ തിരയുക…'
  ]);

  add('or', [
    'CryptCat = ଓପନ୍ ସୋର୍ସ + ଅଫଲାଇନ୍ ଏନକ୍ରିପ୍ସନ୍', 'ଡିକ୍ରିପ୍ଟ', 'ଏନକ୍ରିପ୍ଟ', '.crypt3 ଫାଇଲ୍ ଏଠାରେ ଛାଡନ୍ତୁ',
    'ଏନକ୍ରିପ୍ଟ କରିବାକୁ ଫାଇଲ୍ ଏଠାରେ ଛାଡନ୍ତୁ', 'କିମ୍ବା ଫାଇଲ୍ ବାଛିବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ', 'ଫାଇଲ୍ ବାଛାଗଲା',
    'ପାସୱାର୍ଡ', 'ଡିକ୍ରିପ୍ସନ୍ ପାସୱାର୍ଡ', 'ଏନକ୍ରିପ୍ସନ୍ ପାସୱାର୍ଡ', 'ଆପଣଙ୍କ ପାସୱାର୍ଡ ଲେଖନ୍ତୁ',
    'ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ', 'ପାସୱାର୍ଡ ପୁଣି ଲେଖନ୍ତୁ', 'ଡିକ୍ରିପ୍ଟ କରି ସେଭ୍ କରନ୍ତୁ',
    'ଏନକ୍ରିପ୍ଟ କରି ସେଭ୍ କରନ୍ତୁ', 'ପାସୱାର୍ଡ ମେଳିଛି', 'ପାସୱାର୍ଡ ମେଳିନାହିଁ',
    'ପାସୱାର୍ଡ ଫିଙ୍ଗରପ୍ରିଣ୍ଟ ମେଳିଛି', 'ପାସୱାର୍ଡ ଫିଙ୍ଗରପ୍ରିଣ୍ଟ ମେଳିନାହିଁ',
    'ଫାଇଲ୍ ପଢୁଛି…', 'ଡିକ୍ରିପ୍ଟ ହେଉଛି (AES-256-CBC)…',
    'ଏନକ୍ରିପ୍ଟ ହେଉଛି (AES-256-CBC)…', 'ଡିକମ୍ପ୍ରେସ୍ ହେଉଛି (gzip + tar)…',
    'କମ୍ପ୍ରେସ୍ ହେଉଛି (tar + gzip)…', 'ଡିକ୍ରିପ୍ସନ୍ ସଫଳ! ଫାଇଲ୍ ସେଭ୍ ହେଲା.',
    'ଏନକ୍ରିପ୍ସନ୍ ସଫଳ! ଫାଇଲ୍ ସେଭ୍ ହେଲା.', 'ଅବୈଧ ଫାଇଲ୍ ଫର୍ମାଟ୍: OpenSSL ହେଡର୍ ନାହିଁ.',
    'ଡିକ୍ରିପ୍ସନ୍ ବିଫଳ: ଭୁଲ ପାସୱାର୍ଡ କିମ୍ବା ନଷ୍ଟ ଫାଇଲ୍.',
    'ଡିକମ୍ପ୍ରେସ୍ ପରେ କୌଣସି ଫାଇଲ୍ ମିଳିଲା ନାହିଁ.',
    'ଡିକ୍ରିପ୍ସନ୍ ବିଫଳ: ଭୁଲ ପାସୱାର୍ଡ କିମ୍ବା ନଷ୍ଟ ଫାଇଲ୍.',
    'CryptEngine ଲୋଡ୍ ହେଲା ନାହିଁ.', 'କମ୍ପ୍ରେସନ୍ API ଉପଲବ୍ଧ ନାହିଁ. iOS 16.4+ ଆବଶ୍ୟକ.',
    'ଏହି ବ୍ରାଉଜର୍ ଆବଶ୍ୟକ API ସମର୍ଥନ କରେନାହିଁ.',
    '100% ଅଫଲାଇନ୍ · ଡାଟା ଏହି ଡିଭାଇସ୍ ଛାଡେନାହିଁ', 'ଦୟାକରି .crypt3 ଫାଇଲ୍ ବାଛନ୍ତୁ',
    'ଏହି ଫାଇଲ୍ ପୂର୍ବରୁ .crypt3 ଅଛି, ଡିକ୍ରିପ୍ଟ ମୋଡ୍କୁ ବଦଳାନ୍ତୁ',
    'ଫାଇଲ୍ ସେଭ୍ ହେଲା', 'ଶେୟାର୍', 'ଭାଷା ଖୋଜନ୍ତୁ…'
  ]);

  add('my', [
    'CryptCat = အွပ်ပင်ဆိုစ် + အော့ဖ်လိုင်း စာဝှက်ခြင်း', 'စာဝှက်ဖြည်', 'စာဝှက်', '.crypt3 ဖိုင်ကို ဒီမှာချပါ',
    'စာဝှက်မည့်ဖိုင်ကို ဒီမှာချပါ', 'သို့မဟုတ် ဖိုင်ရွေးရန် တို့ပါ', 'ဖိုင်ရွေးပြီးပြီ',
    'စကားဝှက်', 'စာဝှက်ဖြည် စကားဝှက်', 'စာဝှက် စကားဝှက်', 'သင့်စကားဝှက်ကို ရိုက်ထည့်ပါ',
    'စကားဝှက် အတည်ပြုပါ', 'စကားဝှက်ကို ထပ်ရိုက်ပါ', 'စာဝှက်ဖြည်ပြီး သိမ်းပါ',
    'စာဝှက်ပြီး သိမ်းပါ', 'စကားဝှက်များ ကိုက်ညီသည်', 'စကားဝှက်များ မကိုက်ညီပါ',
    'စကားဝှက်လက်ဗွေ ကိုက်ညီသည်', 'စကားဝှက်လက်ဗွေ မကိုက်ညီပါ',
    'ဖိုင်ကို ဖတ်နေသည်…', 'စာဝှက်ဖြည်နေသည် (AES-256-CBC)…',
    'စာဝှက်နေသည် (AES-256-CBC)…', 'ဖြည်ထုတ်နေသည် (gzip + tar)…',
    'ချုံ့နေသည် (tar + gzip)…', 'စာဝှက်ဖြည်ခြင်း အောင်မြင်သည်! ဖိုင်သိမ်းပြီးပြီ.',
    'စာဝှက်ခြင်း အောင်မြင်သည်! ဖိုင်သိမ်းပြီးပြီ.', 'ဖိုင်ပုံစံ မမှန်ပါ: OpenSSL header မရှိပါ.',
    'စာဝှက်ဖြည်ခြင်း မအောင်မြင်ပါ: စကားဝှက်မှား သို့မဟုတ် ဖိုင်ပျက်နေသည်.',
    'ဖြည်ထုတ်ပြီးနောက် ဖိုင်မတွေ့ပါ.',
    'စာဝှက်ဖြည်ခြင်း မအောင်မြင်ပါ: စကားဝှက်မှား သို့မဟုတ် ဖိုင်ပျက်နေသည်.',
    'CryptEngine ကို ဖွင့်မရပါ.', 'Compression API မရရှိနိုင်ပါ. iOS 16.4+ လိုအပ်သည်.',
    'ဤဘရောက်ဇာသည် လိုအပ်သော API ကို မထောက်ပံ့ပါ.',
    '100% အော့ဖ်လိုင်း · ဒေတာသည် ဤစက်မှ မထွက်ပါ', '.crypt3 ဖိုင်တစ်ခု ရွေးပါ',
    'ဤဖိုင်သည် .crypt3 ဖြစ်ပြီးသားဖြစ်သည်၊ စာဝှက်ဖြည်မုဒ်သို့ ပြောင်းပါ',
    'ဖိုင်သိမ်းထားသည်', 'မျှဝေ', 'ဘာသာစကားရှာပါ…'
  ]);

  add('ha', [
    'CryptCat = Buɗaɗɗen Tushe + Rufe Bayanai ba Tare da Intanet ba', 'Buɗe rufi', 'Rufe', 'Ajiye fayil .crypt3 a nan',
    'Ajiye fayil da za a rufe a nan', 'ko danna don zaɓar fayil', 'An zaɓi fayil',
    'Kalmar sirri', 'Kalmar sirrin buɗewa', 'Kalmar sirrin rufewa', 'Shigar da kalmar sirrinka',
    'Tabbatar da kalmar sirri', 'Sake shigar da kalmar sirri', 'Buɗe rufi ka adana',
    'Rufe ka adana', 'Kalmomin sirri sun dace', 'Kalmomin sirri ba su dace ba',
    'Tambarin kalmar sirri ya dace', 'Tambarin kalmar sirri bai dace ba',
    'Ana karanta fayil…', 'Ana buɗe rufi (AES-256-CBC)…',
    'Ana rufewa (AES-256-CBC)…', 'Ana cire matsewa (gzip + tar)…',
    'Ana matsewa (tar + gzip)…', 'Buɗe rufi ya yi nasara! An adana fayil.',
    'Rufewa ya yi nasara! An adana fayil.', 'Tsarin fayil ba daidai ba: babu header na OpenSSL.',
    'Buɗe rufi ya gaza: kalmar sirri ba daidai ba ko fayil ya lalace.',
    'Ba a sami fayil ba bayan cire matsewa.',
    'Buɗe rufi ya gaza: kalmar sirri ba daidai ba ko fayil ya lalace.',
    'CryptEngine bai loda ba.', 'Compression API ba ya nan. Ana bukatar iOS 16.4+.',
    'Wannan burauza ba ta goyon bayan API da ake bukata.',
    '100% ba tare da intanet ba · Bayanai ba sa barin wannan na’ura', 'Da fatan zaɓi fayil .crypt3',
    'Wannan fayil tuni .crypt3 ne, koma yanayin buɗe rufi', 'An adana fayil a',
    'Raba', 'Nemi harshe…'
  ]);

  add('pa', [
    'CryptCat = ਓਪਨ ਸੋਰਸ + ਆਫਲਾਈਨ ਇਨਕ੍ਰਿਪਸ਼ਨ', 'ਡੀਕ੍ਰਿਪਟ', 'ਇਨਕ੍ਰਿਪਟ', '.crypt3 ਫਾਈਲ ਇੱਥੇ ਛੱਡੋ',
    'ਇਨਕ੍ਰਿਪਟ ਕਰਨ ਲਈ ਫਾਈਲ ਇੱਥੇ ਛੱਡੋ', 'ਜਾਂ ਫਾਈਲ ਚੁਣਨ ਲਈ ਟੈਪ ਕਰੋ', 'ਫਾਈਲ ਚੁਣੀ ਗਈ',
    'ਪਾਸਵਰਡ', 'ਡੀਕ੍ਰਿਪਸ਼ਨ ਪਾਸਵਰਡ', 'ਇਨਕ੍ਰਿਪਸ਼ਨ ਪਾਸਵਰਡ', 'ਆਪਣਾ ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ',
    'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ', 'ਪਾਸਵਰਡ ਮੁੜ ਦਾਖਲ ਕਰੋ', 'ਡੀਕ੍ਰਿਪਟ ਕਰਕੇ ਸੇਵ ਕਰੋ',
    'ਇਨਕ੍ਰਿਪਟ ਕਰਕੇ ਸੇਵ ਕਰੋ', 'ਪਾਸਵਰਡ ਮਿਲਦੇ ਹਨ', 'ਪਾਸਵਰਡ ਨਹੀਂ ਮਿਲਦੇ',
    'ਪਾਸਵਰਡ ਫਿੰਗਰਪ੍ਰਿੰਟ ਮਿਲਦਾ ਹੈ', 'ਪਾਸਵਰਡ ਫਿੰਗਰਪ੍ਰਿੰਟ ਨਹੀਂ ਮਿਲਦਾ',
    'ਫਾਈਲ ਪੜ੍ਹੀ ਜਾ ਰਹੀ ਹੈ…', 'ਡੀਕ੍ਰਿਪਟ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ (AES-256-CBC)…',
    'ਇਨਕ੍ਰਿਪਟ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ (AES-256-CBC)…', 'ਡੀਕੰਪ੍ਰੈਸ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ (gzip + tar)…',
    'ਕੰਪ੍ਰੈਸ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ (tar + gzip)…', 'ਡੀਕ੍ਰਿਪਸ਼ਨ ਸਫਲ! ਫਾਈਲ ਸੇਵ ਹੋ ਗਈ.',
    'ਇਨਕ੍ਰਿਪਸ਼ਨ ਸਫਲ! ਫਾਈਲ ਸੇਵ ਹੋ ਗਈ.', 'ਅਵੈਧ ਫਾਈਲ ਫਾਰਮੈਟ: OpenSSL ਹੈਡਰ ਗੁੰਮ ਹੈ.',
    'ਡੀਕ੍ਰਿਪਸ਼ਨ ਅਸਫਲ: ਗਲਤ ਪਾਸਵਰਡ ਜਾਂ ਖਰਾਬ ਫਾਈਲ.',
    'ਡੀਕੰਪ੍ਰੈਸ਼ਨ ਤੋਂ ਬਾਅਦ ਕੋਈ ਫਾਈਲ ਨਹੀਂ ਮਿਲੀ.',
    'ਡੀਕ੍ਰਿਪਸ਼ਨ ਅਸਫਲ: ਗਲਤ ਪਾਸਵਰਡ ਜਾਂ ਖਰਾਬ ਫਾਈਲ.',
    'CryptEngine ਲੋਡ ਨਹੀਂ ਹੋ ਸਕਿਆ.', 'ਕੰਪ੍ਰੈਸ਼ਨ API ਉਪਲਬਧ ਨਹੀਂ. iOS 16.4+ ਲੋੜੀਂਦਾ ਹੈ.',
    'ਇਹ ਬ੍ਰਾਉਜ਼ਰ ਲੋੜੀਂਦੇ API ਨੂੰ ਸਮਰਥਨ ਨਹੀਂ ਕਰਦਾ.',
    '100% ਆਫਲਾਈਨ · ਡਾਟਾ ਇਸ ਡਿਵਾਈਸ ਤੋਂ ਕਦੇ ਬਾਹਰ ਨਹੀਂ ਜਾਂਦਾ', 'ਕਿਰਪਾ ਕਰਕੇ .crypt3 ਫਾਈਲ ਚੁਣੋ',
    'ਇਹ ਫਾਈਲ ਪਹਿਲਾਂ ਹੀ .crypt3 ਹੈ, ਡੀਕ੍ਰਿਪਟ ਮੋਡ ਤੇ ਜਾਓ', 'ਫਾਈਲ ਸੇਵ ਹੋਈ',
    'ਸਾਂਝਾ ਕਰੋ', 'ਭਾਸ਼ਾ ਖੋਜੋ…'
  ]);

  add('yo', [
    'CryptCat = Orisun Ṣiṣí + Ìfipamọ́kọ̀wé Aisinipo', 'Yọ kóòdù', 'Fi kóòdù sí', 'Ju faili .crypt3 síbí',
    'Ju faili tí a ó fi kóòdù sí síbí', 'tàbí tẹ láti yan faili', 'A ti yan faili',
    'Ọrọ aṣínà', 'Ọrọ aṣínà yíyọ kóòdù', 'Ọrọ aṣínà fífi kóòdù sí', 'Tẹ ọrọ aṣínà rẹ',
    'Jẹrisi ọrọ aṣínà', 'Tẹ ọrọ aṣínà lẹẹkansi', 'Yọ kóòdù kí o fipamọ́',
    'Fi kóòdù sí kí o fipamọ́', 'Àwọn ọrọ aṣínà bá ara mu', 'Àwọn ọrọ aṣínà kò bá ara mu',
    'Àmi ika ọrọ aṣínà bá mu', 'Àmi ika ọrọ aṣínà kò bá mu',
    'Ń ka faili…', 'Ń yọ kóòdù (AES-256-CBC)…', 'Ń fi kóòdù sí (AES-256-CBC)…',
    'Ń tú ìfúnpọ̀ (gzip + tar)…', 'Ń fún pọ̀ (tar + gzip)…',
    'Yíyọ kóòdù ṣàṣeyọrí! A ti fipamọ́ faili.', 'Fífi kóòdù sí ṣàṣeyọrí! A ti fipamọ́ faili.',
    'Fọ́ọ̀mù faili kò tọ́: akọsori OpenSSL kò sí.',
    'Yíyọ kóòdù kuna: ọrọ aṣínà tí kò tọ́ tàbí faili bàjẹ́.',
    'Kò sí faili tí a rí lẹ́yìn títú ìfúnpọ̀.',
    'Yíyọ kóòdù kuna: ọrọ aṣínà tí kò tọ́ tàbí faili bàjẹ́.',
    'CryptEngine kò rù.', 'API ìfúnpọ̀ kò sí. iOS 16.4+ ni a nílò.',
    'Ẹrọ aṣàwákiri yìí kò ṣe atilẹyin API tó yẹ.',
    '100% aisinipo · Data kò fi ẹrọ yìí sílẹ̀', 'Jọwọ yan faili .crypt3',
    'Faili yìí ti jẹ .crypt3 tẹlẹ, yí sí ipo yíyọ kóòdù', 'A ti fipamọ́ faili sí',
    'Pín', 'Wa èdè…'
  ]);

  add('am', [
    'CryptCat = ክፍት ምንጭ + ከመስመር ውጭ ማመስጠር', 'ዲክሪፕት', 'ኢንክሪፕት', '.crypt3 ፋይልን እዚህ ይጣሉ',
    'ለማመስጠር ፋይልን እዚህ ይጣሉ', 'ወይም ፋይል ለመምረጥ ይንኩ', 'ፋይል ተመርጧል',
    'የይለፍ ቃል', 'የዲክሪፕሽን የይለፍ ቃል', 'የኢንክሪፕሽን የይለፍ ቃል', 'የይለፍ ቃልዎን ያስገቡ',
    'የይለፍ ቃል ያረጋግጡ', 'የይለፍ ቃልን እንደገና ያስገቡ', 'ዲክሪፕት እና አስቀምጥ',
    'ኢንክሪፕት እና አስቀምጥ', 'የይለፍ ቃላት ተዛመዱ', 'የይለፍ ቃላት አልተዛመዱም',
    'የይለፍ ቃል አሻራ ተዛመደ', 'የይለፍ ቃል አሻራ አልተዛመደም',
    'ፋይል በመነበብ ላይ…', 'ዲክሪፕት በመደረግ ላይ (AES-256-CBC)…',
    'ኢንክሪፕት በመደረግ ላይ (AES-256-CBC)…', 'ዲኮምፕሬስ በመደረግ ላይ (gzip + tar)…',
    'ኮምፕሬስ በመደረግ ላይ (tar + gzip)…', 'ዲክሪፕሽን ተሳክቷል! ፋይል ተቀምጧል.',
    'ኢንክሪፕሽን ተሳክቷል! ፋይል ተቀምጧል.', 'የፋይል ቅርጸት ልክ አይደለም: OpenSSL header ይጎድላል.',
    'ዲክሪፕሽን አልተሳካም: የተሳሳተ የይለፍ ቃል ወይም የተበላሸ ፋይል.',
    'ከዲኮምፕሬሽን በኋላ ፋይሎች አልተገኙም.',
    'ዲክሪፕሽን አልተሳካም: የተሳሳተ የይለፍ ቃል ወይም የተበላሸ ፋይል.',
    'CryptEngine መጫን አልተቻለም.', 'Compression API አይገኝም. iOS 16.4+ ያስፈልጋል.',
    'ይህ አሳሽ የሚያስፈልገውን API አይደግፍም.',
    '100% ከመስመር ውጭ · ውሂብ ይህን መሣሪያ አይተውም', 'እባክዎ .crypt3 ፋይል ይምረጡ',
    'ይህ ፋይል አስቀድሞ .crypt3 ነው፣ ወደ ዲክሪፕት ሁነታ ይቀይሩ',
    'ፋይል ተቀምጧል', 'አጋራ', 'ቋንቋ ፈልግ…'
  ]);

  add('ro', [
    'CryptCat = Sursă deschisă + Criptare offline', 'Decriptează', 'Criptează', 'Plasați aici fișierul .crypt3',
    'Plasați aici fișierul de criptat', 'sau atingeți pentru a selecta fișierul', 'Fișier selectat',
    'Parolă', 'Parolă de decriptare', 'Parolă de criptare', 'Introduceți parola',
    'Confirmați parola', 'Introduceți parola din nou', 'Decriptează și salvează',
    'Criptează și salvează', 'Parolele se potrivesc', 'Parolele nu se potrivesc',
    'Amprenta parolei se potrivește', 'Amprenta parolei nu se potrivește',
    'Se citește fișierul…', 'Se decriptează (AES-256-CBC)…', 'Se criptează (AES-256-CBC)…',
    'Se decomprimă (gzip + tar)…', 'Se comprimă (tar + gzip)…',
    'Decriptare reușită! Fișier salvat.', 'Criptare reușită! Fișier salvat.',
    'Format de fișier nevalid: lipsește antetul OpenSSL.',
    'Decriptarea a eșuat: parolă greșită sau fișier corupt.',
    'Nu s-au găsit fișiere după decomprimare.',
    'Decriptarea a eșuat: parolă greșită sau fișier corupt.',
    'CryptEngine nu a putut fi încărcat.', 'API-ul de compresie nu este disponibil. Este necesar iOS 16.4+.',
    'Acest browser nu acceptă API-ul necesar.',
    '100% offline · Datele nu părăsesc niciodată acest dispozitiv', 'Selectați un fișier .crypt3',
    'Acest fișier este deja .crypt3, comutați la modul de decriptare', 'Fișier salvat în',
    'Partajează', 'Caută limba…'
  ]);

  add('nl', [
    'CryptCat = Open source + Offline versleuteling', 'Ontsleutelen', 'Versleutelen', 'Zet het .crypt3-bestand hier neer',
    'Zet het te versleutelen bestand hier neer', 'of tik om een bestand te kiezen', 'Bestand geselecteerd',
    'Wachtwoord', 'Wachtwoord voor ontsleuteling', 'Wachtwoord voor versleuteling', 'Voer je wachtwoord in',
    'Wachtwoord bevestigen', 'Voer het wachtwoord opnieuw in', 'Ontsleutelen en opslaan',
    'Versleutelen en opslaan', 'Wachtwoorden komen overeen', 'Wachtwoorden komen niet overeen',
    'Wachtwoordvingerafdruk komt overeen', 'Wachtwoordvingerafdruk komt niet overeen',
    'Bestand wordt gelezen…', 'Ontsleutelen (AES-256-CBC)…', 'Versleutelen (AES-256-CBC)…',
    'Decomprimeren (gzip + tar)…', 'Comprimeren (tar + gzip)…',
    'Ontsleuteling geslaagd! Bestand opgeslagen.', 'Versleuteling geslaagd! Bestand opgeslagen.',
    'Ongeldig bestandsformaat: OpenSSL-header ontbreekt.',
    'Ontsleuteling mislukt: verkeerd wachtwoord of beschadigd bestand.',
    'Geen bestanden gevonden na decompressie.',
    'Ontsleuteling mislukt: verkeerd wachtwoord of beschadigd bestand.',
    'CryptEngine kon niet worden geladen.', 'Compressie-API niet beschikbaar. iOS 16.4+ vereist.',
    'Deze browser ondersteunt de vereiste API niet.',
    '100% offline · Gegevens verlaten dit apparaat nooit', 'Selecteer een .crypt3-bestand',
    'Dit bestand is al .crypt3, schakel over naar ontsleutelen', 'Bestand opgeslagen in',
    'Delen', 'Taal zoeken…'
  ]);

  add('fil', [
    'CryptCat = Open Source + Offline na Pag-encrypt', 'I-decrypt', 'I-encrypt', 'I-drop ang .crypt3 file dito',
    'I-drop dito ang file na ie-encrypt', 'o i-tap para pumili ng file', 'Napili ang file',
    'Password', 'Password sa pag-decrypt', 'Password sa pag-encrypt', 'Ilagay ang iyong password',
    'Kumpirmahin ang password', 'Ilagay muli ang password', 'I-decrypt at I-save',
    'I-encrypt at I-save', 'Magkatugma ang mga password', 'Hindi magkatugma ang mga password',
    'Tugma ang fingerprint ng password', 'Hindi tugma ang fingerprint ng password',
    'Binabasa ang file…', 'Dine-decrypt (AES-256-CBC)…', 'Ini-encrypt (AES-256-CBC)…',
    'Dini-decompress (gzip + tar)…', 'Kini-compress (tar + gzip)…',
    'Matagumpay ang pag-decrypt! Na-save ang file.', 'Matagumpay ang pag-encrypt! Na-save ang file.',
    'Hindi wastong format ng file: nawawala ang OpenSSL header.',
    'Nabigo ang pag-decrypt: maling password o sirang file.',
    'Walang file na nakita pagkatapos ng decompression.',
    'Nabigo ang pag-decrypt: maling password o sirang file.',
    'Hindi na-load ang CryptEngine.', 'Hindi available ang compression API. Kailangan ang iOS 16.4+.',
    'Hindi sinusuportahan ng browser na ito ang kinakailangang API.',
    '100% offline · Hindi umaalis sa device na ito ang data', 'Pumili ng .crypt3 file',
    'Ang file na ito ay .crypt3 na, lumipat sa decrypt mode', 'Na-save ang file sa',
    'Ibahagi', 'Maghanap ng wika…'
  ]);

  add('ps', [
    'CryptCat = خلاصه سرچینه + آفلاین کوډول', 'ډیکرېپټ', 'انکرېپټ', '.crypt3 فایل دلته پرېږدئ',
    'د کوډولو لپاره فایل دلته پرېږدئ', 'یا د فایل ټاکلو لپاره ټچ کړئ', 'فایل وټاکل شو',
    'پټنوم', 'د ډیکرېپټ پټنوم', 'د انکرېپټ پټنوم', 'خپل پټنوم ولیکئ',
    'پټنوم تایید کړئ', 'پټنوم بیا ولیکئ', 'ډیکرېپټ او خوندي کړئ',
    'انکرېپټ او خوندي کړئ', 'پټنومونه سره برابر دي', 'پټنومونه سره برابر نه دي',
    'د پټنوم نښه برابره ده', 'د پټنوم نښه برابره نه ده',
    'فایل لوستل کېږي…', 'ډیکرېپټ کېږي (AES-256-CBC)…',
    'انکرېپټ کېږي (AES-256-CBC)…', 'ډيکمپرېس کېږي (gzip + tar)…',
    'کمپرېس کېږي (tar + gzip)…', 'ډیکرېپټ بریالی شو! فایل خوندي شو.',
    'انکرېپټ بریالی شو! فایل خوندي شو.', 'ناسم فایل بڼه: د OpenSSL header نشته.',
    'ډیکرېپټ ناکام شو: ناسم پټنوم یا خراب فایل.',
    'له ډيکمپرېس وروسته فایل ونه موندل شو.',
    'ډیکرېپټ ناکام شو: ناسم پټنوم یا خراب فایل.',
    'CryptEngine پورته نه شو.', 'Compression API نشته. iOS 16.4+ ته اړتیا ده.',
    'دا براوزر اړین API نه ملاتړ کوي.',
    '۱۰۰٪ آفلاین · معلومات له دې وسیلې نه وځي', 'مهرباني وکړئ .crypt3 فایل وټاکئ',
    'دا فایل لا دمخه .crypt3 دی، ډیکرېپټ حالت ته واړوئ', 'فایل خوندي شو په',
    'شریکول', 'ژبه ولټوئ…'
  ]);

  add('uz', [
    'CryptCat = Ochiq manba + Oflayn shifrlash', 'Shifrni yechish', 'Shifrlash', '.crypt3 faylni shu yerga tashlang',
    'Shifrlanadigan faylni shu yerga tashlang', 'yoki fayl tanlash uchun bosing', 'Fayl tanlandi',
    'Parol', 'Shifrni yechish paroli', 'Shifrlash paroli', 'Parolingizni kiriting',
    'Parolni tasdiqlang', 'Parolni qayta kiriting', 'Shifrni yechish va saqlash',
    'Shifrlash va saqlash', 'Parollar mos', 'Parollar mos emas',
    'Parol barmoq izi mos', 'Parol barmoq izi mos emas',
    'Fayl o‘qilmoqda…', 'Shifr yechilmoqda (AES-256-CBC)…', 'Shifrlanmoqda (AES-256-CBC)…',
    'Arxivdan chiqarilmoqda (gzip + tar)…', 'Siqilmoqda (tar + gzip)…',
    'Shifr muvaffaqiyatli yechildi! Fayl saqlandi.', 'Shifrlash muvaffaqiyatli! Fayl saqlandi.',
    'Noto‘g‘ri fayl formati: OpenSSL sarlavhasi yo‘q.',
    'Shifrni yechib bo‘lmadi: parol noto‘g‘ri yoki fayl buzilgan.',
    'Arxivdan chiqarilgandan keyin fayl topilmadi.',
    'Shifrni yechib bo‘lmadi: parol noto‘g‘ri yoki fayl buzilgan.',
    'CryptEngine yuklanmadi.', 'Compression API mavjud emas. iOS 16.4+ kerak.',
    'Bu brauzer kerakli API ni qo‘llab-quvvatlamaydi.',
    '100% oflayn · Ma’lumotlar bu qurilmadan chiqmaydi', '.crypt3 faylni tanlang',
    'Bu fayl allaqachon .crypt3, shifrni yechish rejimiga o‘ting', 'Fayl saqlandi',
    'Ulashish', 'Til qidirish…'
  ]);

  add('sd', [
    'CryptCat = اوپن سورس + آف لائن انڪرپشن', 'ڊڪرپٽ', 'انڪرپٽ', '.crypt3 فائل هتي ڇڏيو',
    'انڪرپٽ ڪرڻ واري فائل هتي ڇڏيو', 'يا فائل چونڊڻ لاءِ ٽيپ ڪريو', 'فائل چونڊي وئي',
    'پاسورڊ', 'ڊڪرپشن پاسورڊ', 'انڪرپشن پاسورڊ', 'پنهنجو پاسورڊ داخل ڪريو',
    'پاسورڊ جي تصديق ڪريو', 'پاسورڊ ٻيهر داخل ڪريو', 'ڊڪرپٽ ۽ محفوظ ڪريو',
    'انڪرپٽ ۽ محفوظ ڪريو', 'پاسورڊ ملن ٿا', 'پاسورڊ نٿا ملن',
    'پاسورڊ فنگرپرنٽ ملي ٿو', 'پاسورڊ فنگرپرنٽ نٿو ملي',
    'فائل پڙهي پئي وڃي…', 'ڊڪرپٽ ٿي رهيو آهي (AES-256-CBC)…',
    'انڪرپٽ ٿي رهيو آهي (AES-256-CBC)…', 'ڊيڪمپريس ٿي رهيو آهي (gzip + tar)…',
    'ڪمپريس ٿي رهيو آهي (tar + gzip)…', 'ڊڪرپشن ڪامياب! فائل محفوظ ٿي وئي.',
    'انڪرپشن ڪامياب! فائل محفوظ ٿي وئي.', 'غلط فائل فارميٽ: OpenSSL header غائب آهي.',
    'ڊڪرپشن ناڪام: غلط پاسورڊ يا خراب فائل.',
    'ڊيڪمپريشن کان پوءِ ڪا فائل نه ملي.',
    'ڊڪرپشن ناڪام: غلط پاسورڊ يا خراب فائل.',
    'CryptEngine لوڊ نه ٿي سگهيو.', 'Compression API موجود ناهي. iOS 16.4+ گهربل.',
    'هي برائوزر گهربل API کي سپورٽ نٿو ڪري.',
    '100% آف لائن · ڊيٽا هن ڊوائيس مان ڪڏهن به ٻاهر نٿي وڃي', 'مهرباني ڪري .crypt3 فائل چونڊيو',
    'هي فائل اڳ ۾ ئي .crypt3 آهي، ڊڪرپٽ موڊ تي وڃو', 'فائل محفوظ ٿي',
    'شيئر ڪريو', 'ٻولي ڳوليو…'
  ]);

  add('az', [
    'CryptCat = Açıq mənbə + Oflayn Şifrələmə', 'Şifrəni aç', 'Şifrələ', '.crypt3 faylını buraya atın',
    'Şifrələnəcək faylı buraya atın', 'və ya fayl seçmək üçün toxunun', 'Fayl seçildi',
    'Parol', 'Şifrə açma parolu', 'Şifrələmə parolu', 'Parolunuzu daxil edin',
    'Parolu təsdiqləyin', 'Parolu yenidən daxil edin', 'Şifrəni aç və yadda saxla',
    'Şifrələ və yadda saxla', 'Parollar uyğun gəlir', 'Parollar uyğun gəlmir',
    'Parol izi uyğun gəlir', 'Parol izi uyğun gəlmir',
    'Fayl oxunur…', 'Şifrə açılır (AES-256-CBC)…', 'Şifrələnir (AES-256-CBC)…',
    'Açılır (gzip + tar)…', 'Sıxılır (tar + gzip)…',
    'Şifrə açma uğurlu oldu! Fayl saxlandı.', 'Şifrələmə uğurlu oldu! Fayl saxlandı.',
    'Yanlış fayl formatı: OpenSSL başlığı yoxdur.',
    'Şifrə açma alınmadı: yanlış parol və ya zədələnmiş fayl.',
    'Açıldıqdan sonra fayl tapılmadı.',
    'Şifrə açma alınmadı: yanlış parol və ya zədələnmiş fayl.',
    'CryptEngine yüklənmədi.', 'Sıxılma API-si mövcud deyil. iOS 16.4+ tələb olunur.',
    'Bu brauzer tələb olunan API-ni dəstəkləmir.',
    '100% oflayn · Məlumat bu cihazı heç vaxt tərk etmir', '.crypt3 faylı seçin',
    'Bu fayl artıq .crypt3 formatındadır, şifrə açma rejiminə keçin', 'Fayl saxlandı',
    'Paylaş', 'Dil axtar…'
  ]);

  add('ne', [
    'CryptCat = खुला स्रोत + अफलाइन एन्क्रिप्शन', 'डिक्रिप्ट', 'एन्क्रिप्ट', '.crypt3 फाइल यहाँ छोड्नुहोस्',
    'एन्क्रिप्ट गर्ने फाइल यहाँ छोड्नुहोस्', 'वा फाइल छान्न ट्याप गर्नुहोस्', 'फाइल चयन गरियो',
    'पासवर्ड', 'डिक्रिप्शन पासवर्ड', 'एन्क्रिप्शन पासवर्ड', 'आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्',
    'पासवर्ड पुष्टि गर्नुहोस्', 'पासवर्ड फेरि प्रविष्ट गर्नुहोस्', 'डिक्रिप्ट गरेर सेभ गर्नुहोस्',
    'एन्क्रिप्ट गरेर सेभ गर्नुहोस्', 'पासवर्ड मिल्यो', 'पासवर्ड मिलेन',
    'पासवर्ड फिंगरप्रिन्ट मिल्यो', 'पासवर्ड फिंगरप्रिन्ट मिलेन',
    'फाइल पढिँदै…', 'डिक्रिप्ट हुँदै (AES-256-CBC)…',
    'एन्क्रिप्ट हुँदै (AES-256-CBC)…', 'डिकम्प्रेस हुँदै (gzip + tar)…',
    'कम्प्रेस हुँदै (tar + gzip)…', 'डिक्रिप्शन सफल! फाइल सेभ भयो.',
    'एन्क्रिप्शन सफल! फाइल सेभ भयो.', 'अवैध फाइल ढाँचा: OpenSSL header छैन.',
    'डिक्रिप्शन असफल: गलत पासवर्ड वा बिग्रिएको फाइल.',
    'डिकम्प्रेसपछि कुनै फाइल भेटिएन.',
    'डिक्रिप्शन असफल: गलत पासवर्ड वा बिग्रिएको फाइल.',
    'CryptEngine लोड हुन सकेन.', 'Compression API उपलब्ध छैन. iOS 16.4+ चाहिन्छ.',
    'यो ब्राउजरले आवश्यक API समर्थन गर्दैन.',
    '100% अफलाइन · डेटा यो उपकरणबाट कहिल्यै बाहिरिँदैन', 'कृपया .crypt3 फाइल चयन गर्नुहोस्',
    'यो फाइल पहिले नै .crypt3 हो, डिक्रिप्ट मोडमा जानुहोस्', 'फाइल सेभ भयो',
    'सेयर गर्नुहोस्', 'भाषा खोज्नुहोस्…'
  ]);

  add('si', [
    'CryptCat = විවෘත මූලාශ්‍ර + නොබැඳි සංකේතනය', 'විකේතනය', 'සංකේතනය', '.crypt3 ගොනුව මෙහි දමන්න',
    'සංකේතනය කළ යුතු ගොනුව මෙහි දමන්න', 'හෝ ගොනුව තේරීමට තට්ටු කරන්න', 'ගොනුව තෝරා ඇත',
    'මුරපදය', 'විකේතන මුරපදය', 'සංකේතන මුරපදය', 'ඔබේ මුරපදය ඇතුළත් කරන්න',
    'මුරපදය තහවුරු කරන්න', 'මුරපදය නැවත ඇතුළත් කරන්න', 'විකේතනය කර සුරකින්න',
    'සංකේතනය කර සුරකින්න', 'මුරපද ගැළපේ', 'මුරපද නොගැළපේ',
    'මුරපද ඇඟිලි සලකුණ ගැළපේ', 'මුරපද ඇඟිලි සලකුණ නොගැළපේ',
    'ගොනුව කියවමින්…', 'විකේතනය කරමින් (AES-256-CBC)…',
    'සංකේතනය කරමින් (AES-256-CBC)…', 'විසංකෝචනය කරමින් (gzip + tar)…',
    'සංකෝචනය කරමින් (tar + gzip)…', 'විකේතනය සාර්ථකයි! ගොනුව සුරකින ලදී.',
    'සංකේතනය සාර්ථකයි! ගොනුව සුරකින ලදී.', 'අවලංගු ගොනු ආකෘතිය: OpenSSL header නැත.',
    'විකේතනය අසාර්ථකයි: වැරදි මුරපදයක් හෝ හානි වූ ගොනුවක්.',
    'විසංකෝචනයෙන් පසු ගොනු හමු නොවීය.',
    'විකේතනය අසාර්ථකයි: වැරදි මුරපදයක් හෝ හානි වූ ගොනුවක්.',
    'CryptEngine පූරණය කළ නොහැකි විය.', 'Compression API නොමැත. iOS 16.4+ අවශ්‍යයි.',
    'මෙම බ්‍රවුසරය අවශ්‍ය API සඳහා සහය නොදක්වයි.',
    '100% නොබැඳි · දත්ත මෙම උපාංගයෙන් පිට නොවේ', 'කරුණාකර .crypt3 ගොනුවක් තෝරන්න',
    'මෙම ගොනුව දැනටමත් .crypt3 වේ, විකේතන මාදිලියට මාරු වන්න',
    'ගොනුව සුරකින ලදී', 'බෙදාගන්න', 'භාෂා සොයන්න…'
  ]);

  add('km', [
    'CryptCat = ប្រភពបើកចំហ + ការអ៊ិនគ្រីបក្រៅបណ្តាញ', 'ឌីគ្រីប', 'អ៊ិនគ្រីប', 'ទម្លាក់ឯកសារ .crypt3 នៅទីនេះ',
    'ទម្លាក់ឯកសារដែលត្រូវអ៊ិនគ្រីបនៅទីនេះ', 'ឬចុចដើម្បីជ្រើសឯកសារ', 'បានជ្រើសឯកសារ',
    'ពាក្យសម្ងាត់', 'ពាក្យសម្ងាត់ឌីគ្រីប', 'ពាក្យសម្ងាត់អ៊ិនគ្រីប', 'បញ្ចូលពាក្យសម្ងាត់របស់អ្នក',
    'បញ្ជាក់ពាក្យសម្ងាត់', 'បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត', 'ឌីគ្រីប ហើយរក្សាទុក',
    'អ៊ិនគ្រីប ហើយរក្សាទុក', 'ពាក្យសម្ងាត់ត្រូវគ្នា', 'ពាក្យសម្ងាត់មិនត្រូវគ្នា',
    'ស្នាមម្រាមពាក្យសម្ងាត់ត្រូវគ្នា', 'ស្នាមម្រាមពាក្យសម្ងាត់មិនត្រូវគ្នា',
    'កំពុងអានឯកសារ…', 'កំពុងឌីគ្រីប (AES-256-CBC)…',
    'កំពុងអ៊ិនគ្រីប (AES-256-CBC)…', 'កំពុងបំបាត់ការបង្ហាប់ (gzip + tar)…',
    'កំពុងបង្ហាប់ (tar + gzip)…', 'ឌីគ្រីបជោគជ័យ! បានរក្សាទុកឯកសារ.',
    'អ៊ិនគ្រីបជោគជ័យ! បានរក្សាទុកឯកសារ.', 'ទ្រង់ទ្រាយឯកសារមិនត្រឹមត្រូវ: ខ្វះ OpenSSL header.',
    'ឌីគ្រីបបរាជ័យ: ពាក្យសម្ងាត់ខុស ឬឯកសារខូច.',
    'រកមិនឃើញឯកសារបន្ទាប់ពីបំបាត់ការបង្ហាប់.',
    'ឌីគ្រីបបរាជ័យ: ពាក្យសម្ងាត់ខុស ឬឯកសារខូច.',
    'មិនអាចផ្ទុក CryptEngine បានទេ.', 'Compression API មិនមានទេ. ត្រូវការ iOS 16.4+.',
    'កម្មវិធីរុករកនេះមិនគាំទ្រ API ដែលត្រូវការ.',
    'ក្រៅបណ្តាញ 100% · ទិន្នន័យមិនចាកចេញពីឧបករណ៍នេះទេ', 'សូមជ្រើសឯកសារ .crypt3',
    'ឯកសារនេះជាទ្រង់ទ្រាយ .crypt3 រួចហើយ សូមប្តូរទៅរបៀបឌីគ្រីប',
    'បានរក្សាទុកឯកសារ​នៅ', 'ចែករំលែក', 'ស្វែងរកភាសា…'
  ]);

  add('he', [
    'CryptCat = קוד פתוח + הצפנה לא מקוונת', 'פענוח', 'הצפנה', 'שחררו כאן קובץ .crypt3',
    'שחררו כאן קובץ להצפנה', 'או הקישו כדי לבחור קובץ', 'נבחר קובץ',
    'סיסמה', 'סיסמת פענוח', 'סיסמת הצפנה', 'הזינו את הסיסמה',
    'אישור סיסמה', 'הזינו שוב את הסיסמה', 'פענח ושמור', 'הצפן ושמור',
    'הסיסמאות תואמות', 'הסיסמאות אינן תואמות', 'טביעת הסיסמה תואמת',
    'טביעת הסיסמה אינה תואמת', 'קורא קובץ…', 'מפענח (AES-256-CBC)…',
    'מצפין (AES-256-CBC)…', 'מחלץ דחיסה (gzip + tar)…', 'דוחס (tar + gzip)…',
    'הפענוח הצליח! הקובץ נשמר.', 'ההצפנה הצליחה! הקובץ נשמר.',
    'פורמט קובץ לא תקין: חסר כותר OpenSSL.',
    'הפענוח נכשל: סיסמה שגויה או קובץ פגום.',
    'לא נמצאו קבצים לאחר חילוץ הדחיסה.',
    'הפענוח נכשל: סיסמה שגויה או קובץ פגום.',
    'טעינת CryptEngine נכשלה.', 'Compression API אינו זמין. נדרש iOS 16.4+.',
    'דפדפן זה אינו תומך ב-API הנדרש.',
    '100% לא מקוון · הנתונים לעולם אינם עוזבים את המכשיר הזה', 'בחרו קובץ .crypt3',
    'קובץ זה כבר בפורמט .crypt3, עברו למצב פענוח', 'הקובץ נשמר ב',
    'שתף', 'חיפוש שפה…'
  ]);

  add('el', [
    'CryptCat = Ανοικτός κώδικας + Κρυπτογράφηση εκτός σύνδεσης', 'Αποκρυπτογράφηση', 'Κρυπτογράφηση',
    'Αφήστε εδώ το αρχείο .crypt3', 'Αφήστε εδώ το αρχείο για κρυπτογράφηση',
    'ή πατήστε για επιλογή αρχείου', 'Επιλέχθηκε αρχείο', 'Κωδικός',
    'Κωδικός αποκρυπτογράφησης', 'Κωδικός κρυπτογράφησης', 'Πληκτρολογήστε τον κωδικό σας',
    'Επιβεβαίωση κωδικού', 'Πληκτρολογήστε ξανά τον κωδικό', 'Αποκρυπτογράφηση και αποθήκευση',
    'Κρυπτογράφηση και αποθήκευση', 'Οι κωδικοί ταιριάζουν', 'Οι κωδικοί δεν ταιριάζουν',
    'Το αποτύπωμα κωδικού ταιριάζει', 'Το αποτύπωμα κωδικού δεν ταιριάζει',
    'Ανάγνωση αρχείου…', 'Αποκρυπτογράφηση (AES-256-CBC)…',
    'Κρυπτογράφηση (AES-256-CBC)…', 'Αποσυμπίεση (gzip + tar)…',
    'Συμπίεση (tar + gzip)…', 'Η αποκρυπτογράφηση πέτυχε! Το αρχείο αποθηκεύτηκε.',
    'Η κρυπτογράφηση πέτυχε! Το αρχείο αποθηκεύτηκε.',
    'Μη έγκυρη μορφή αρχείου: λείπει η κεφαλίδα OpenSSL.',
    'Η αποκρυπτογράφηση απέτυχε: λάθος κωδικός ή κατεστραμμένο αρχείο.',
    'Δεν βρέθηκαν αρχεία μετά την αποσυμπίεση.',
    'Η αποκρυπτογράφηση απέτυχε: λάθος κωδικός ή κατεστραμμένο αρχείο.',
    'Αποτυχία φόρτωσης του CryptEngine.', 'Το Compression API δεν είναι διαθέσιμο. Απαιτείται iOS 16.4+.',
    'Αυτό το πρόγραμμα περιήγησης δεν υποστηρίζει το απαιτούμενο API.',
    '100% εκτός σύνδεσης · Τα δεδομένα δεν φεύγουν ποτέ από αυτήν τη συσκευή',
    'Επιλέξτε ένα αρχείο .crypt3', 'Αυτό το αρχείο είναι ήδη .crypt3, αλλάξτε σε λειτουργία αποκρυπτογράφησης',
    'Το αρχείο αποθηκεύτηκε σε', 'Κοινή χρήση', 'Αναζήτηση γλώσσας…'
  ]);

  add('cs', [
    'CryptCat = Otevřený zdrojový kód + Offline šifrování', 'Dešifrovat', 'Šifrovat', 'Přetáhněte sem soubor .crypt3',
    'Přetáhněte sem soubor k zašifrování', 'nebo klepněte pro výběr souboru', 'Soubor vybrán',
    'Heslo', 'Heslo pro dešifrování', 'Heslo pro šifrování', 'Zadejte heslo',
    'Potvrdit heslo', 'Zadejte heslo znovu', 'Dešifrovat a uložit', 'Zašifrovat a uložit',
    'Hesla se shodují', 'Hesla se neshodují', 'Otisk hesla se shoduje',
    'Otisk hesla se neshoduje', 'Čtení souboru…', 'Dešifrování (AES-256-CBC)…',
    'Šifrování (AES-256-CBC)…', 'Dekomprese (gzip + tar)…', 'Komprese (tar + gzip)…',
    'Dešifrování proběhlo úspěšně! Soubor uložen.', 'Šifrování proběhlo úspěšně! Soubor uložen.',
    'Neplatný formát souboru: chybí hlavička OpenSSL.',
    'Dešifrování selhalo: špatné heslo nebo poškozený soubor.',
    'Po dekompresi nebyly nalezeny žádné soubory.',
    'Dešifrování selhalo: špatné heslo nebo poškozený soubor.',
    'CryptEngine se nepodařilo načíst.', 'Compression API není dostupné. Vyžaduje se iOS 16.4+.',
    'Tento prohlížeč nepodporuje požadované API.',
    '100% offline · Data nikdy neopustí toto zařízení', 'Vyberte soubor .crypt3',
    'Tento soubor již je .crypt3, přepněte do režimu dešifrování', 'Soubor uložen do',
    'Sdílet', 'Hledat jazyk…'
  ]);

  add('sv', [
    'CryptCat = Öppen källkod + Offlinekryptering', 'Dekryptera', 'Kryptera', 'Släpp .crypt3-filen här',
    'Släpp filen som ska krypteras här', 'eller tryck för att välja fil', 'Fil vald',
    'Lösenord', 'Dekrypteringslösenord', 'Krypteringslösenord', 'Ange ditt lösenord',
    'Bekräfta lösenord', 'Ange lösenordet igen', 'Dekryptera och spara', 'Kryptera och spara',
    'Lösenorden matchar', 'Lösenorden matchar inte', 'Lösenordsfingeravtrycket matchar',
    'Lösenordsfingeravtrycket matchar inte', 'Läser fil…', 'Dekrypterar (AES-256-CBC)…',
    'Krypterar (AES-256-CBC)…', 'Dekomprimerar (gzip + tar)…', 'Komprimerar (tar + gzip)…',
    'Dekryptering lyckades! Filen sparades.', 'Kryptering lyckades! Filen sparades.',
    'Ogiltigt filformat: OpenSSL-huvud saknas.',
    'Dekryptering misslyckades: fel lösenord eller skadad fil.',
    'Inga filer hittades efter dekomprimering.',
    'Dekryptering misslyckades: fel lösenord eller skadad fil.',
    'CryptEngine kunde inte läsas in.', 'Komprimerings-API saknas. iOS 16.4+ krävs.',
    'Den här webbläsaren stöder inte nödvändigt API.',
    '100% offline · Data lämnar aldrig den här enheten', 'Välj en .crypt3-fil',
    'Den här filen är redan .crypt3, byt till dekrypteringsläge', 'Filen sparades i',
    'Dela', 'Sök språk…'
  ]);

  add('hu', [
    'CryptCat = Nyílt forráskód + Offline titkosítás', 'Visszafejtés', 'Titkosítás', 'Húzza ide a .crypt3 fájlt',
    'Húzza ide a titkosítandó fájlt', 'vagy koppintson fájl választásához', 'Fájl kiválasztva',
    'Jelszó', 'Visszafejtési jelszó', 'Titkosítási jelszó', 'Adja meg a jelszavát',
    'Jelszó megerősítése', 'Adja meg újra a jelszót', 'Visszafejtés és mentés',
    'Titkosítás és mentés', 'A jelszavak egyeznek', 'A jelszavak nem egyeznek',
    'A jelszó ujjlenyomata egyezik', 'A jelszó ujjlenyomata nem egyezik',
    'Fájl olvasása…', 'Visszafejtés (AES-256-CBC)…', 'Titkosítás (AES-256-CBC)…',
    'Kicsomagolás (gzip + tar)…', 'Tömörítés (tar + gzip)…',
    'A visszafejtés sikeres! A fájl mentve.', 'A titkosítás sikeres! A fájl mentve.',
    'Érvénytelen fájlformátum: hiányzik az OpenSSL fejléc.',
    'A visszafejtés sikertelen: hibás jelszó vagy sérült fájl.',
    'A kicsomagolás után nem található fájl.',
    'A visszafejtés sikertelen: hibás jelszó vagy sérült fájl.',
    'A CryptEngine betöltése sikertelen.', 'A Compression API nem érhető el. iOS 16.4+ szükséges.',
    'Ez a böngésző nem támogatja a szükséges API-t.',
    '100% offline · Az adatok soha nem hagyják el ezt az eszközt', 'Válasszon .crypt3 fájlt',
    'Ez a fájl már .crypt3 formátumú, váltson visszafejtési módra', 'Fájl mentve ide',
    'Megosztás', 'Nyelv keresése…'
  ]);
})();

(function () {
  'use strict';

  var titles = window.I18N_TITLE_OVERRIDES || {};
  for (var code in titles) {
    if (Object.prototype.hasOwnProperty.call(titles, code)) {
      window.I18N_EXTRA[code] = Object.assign({}, window.I18N_EXTRA[code] || {}, { appTitle: titles[code] });
    }
  }
})();
