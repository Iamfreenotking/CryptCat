#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outRoot = path.join(root, 'store-listings');

const urls = {
  support: 'https://bullbullgo.com/support/cryptcat',
  marketing: 'https://bullbullgo.com/tools/crypt3_decryptor.html',
  privacy: 'https://bullbullgo.com/privacy/cryptcat'
};

const appleLocales = [
  ['ar-SA', 'Arabic', 'ar'], ['bn', 'Bangla', 'bn'], ['ca', 'Catalan', 'ca'],
  ['zh-Hans', 'Chinese (Simplified)', 'zh-Hans'], ['zh-Hant', 'Chinese (Traditional)', 'zh-Hant'],
  ['hr', 'Croatian', 'hr'], ['cs', 'Czech', 'cs'], ['da', 'Danish', 'da'], ['nl-NL', 'Dutch', 'nl'],
  ['en-AU', 'English (Australia)', 'en'], ['en-CA', 'English (Canada)', 'en'],
  ['en-GB', 'English (U.K.)', 'en'], ['en-US', 'English (U.S.)', 'en'],
  ['fi', 'Finnish', 'fi'], ['fr-FR', 'French', 'fr'], ['fr-CA', 'French (Canada)', 'fr'],
  ['de-DE', 'German', 'de'], ['el', 'Greek', 'el'], ['gu', 'Gujarati', 'gu'], ['he', 'Hebrew', 'he'],
  ['hi', 'Hindi', 'hi'], ['hu', 'Hungarian', 'hu'], ['id', 'Indonesian', 'id'], ['it', 'Italian', 'it'],
  ['ja', 'Japanese', 'ja'], ['kn', 'Kannada', 'kn'], ['ko', 'Korean', 'ko'], ['ms', 'Malay', 'ms'],
  ['ml', 'Malayalam', 'ml'], ['mr', 'Marathi', 'mr'], ['no', 'Norwegian', 'no'], ['or', 'Odia', 'or'],
  ['pl', 'Polish', 'pl'], ['pt-BR', 'Portuguese (Brazil)', 'pt'], ['pt-PT', 'Portuguese (Portugal)', 'pt'],
  ['pa', 'Punjabi', 'pa'], ['ro', 'Romanian', 'ro'], ['ru', 'Russian', 'ru'], ['sk', 'Slovak', 'sk'],
  ['sl', 'Slovenian', 'sl'], ['es-MX', 'Spanish (Mexico)', 'es'], ['es-ES', 'Spanish (Spain)', 'es'],
  ['sv', 'Swedish', 'sv'], ['ta', 'Tamil', 'ta'], ['te', 'Telugu', 'te'], ['th', 'Thai', 'th'],
  ['tr', 'Turkish', 'tr'], ['uk', 'Ukrainian', 'uk'], ['ur', 'Urdu', 'ur'], ['vi', 'Vietnamese', 'vi']
];

const googleLocales = [
  ['af', 'Afrikaans', 'af'], ['sq', 'Albanian', 'sq'], ['am', 'Amharic', 'am'], ['ar', 'Arabic', 'ar'],
  ['hy-AM', 'Armenian', 'hy'], ['az-AZ', 'Azerbaijani', 'az'], ['bn-BD', 'Bangla', 'bn'],
  ['eu-ES', 'Basque', 'eu'], ['be', 'Belarusian', 'be'], ['bg', 'Bulgarian', 'bg'],
  ['my-MM', 'Burmese', 'my'], ['ca', 'Catalan', 'ca'], ['zh-HK', 'Chinese (Hong Kong)', 'zh-Hant'],
  ['zh-CN', 'Chinese (Simplified)', 'zh-Hans'], ['zh-TW', 'Chinese (Traditional)', 'zh-Hant'],
  ['hr', 'Croatian', 'hr'], ['cs-CZ', 'Czech', 'cs'], ['da-DK', 'Danish', 'da'], ['nl-NL', 'Dutch', 'nl'],
  ['en-AU', 'English (Australia)', 'en'], ['en-CA', 'English (Canada)', 'en'],
  ['en-US', 'English (United States)', 'en'], ['en-GB', 'English (United Kingdom)', 'en'],
  ['en-IN', 'English (India)', 'en'], ['en-SG', 'English (Singapore)', 'en'], ['en-ZA', 'English (South Africa)', 'en'],
  ['et', 'Estonian', 'et'], ['fil', 'Filipino', 'fil'], ['fi-FI', 'Finnish', 'fi'],
  ['fr-CA', 'French (Canada)', 'fr'], ['fr-FR', 'French (France)', 'fr'], ['gl-ES', 'Galician', 'gl'],
  ['ka-GE', 'Georgian', 'ka'], ['de-DE', 'German', 'de'], ['el-GR', 'Greek', 'el'], ['gu', 'Gujarati', 'gu'],
  ['iw-IL', 'Hebrew', 'he'], ['hi-IN', 'Hindi', 'hi'], ['hu-HU', 'Hungarian', 'hu'], ['is-IS', 'Icelandic', 'is'],
  ['id', 'Indonesian', 'id'], ['it-IT', 'Italian', 'it'], ['ja-JP', 'Japanese', 'ja'], ['kn-IN', 'Kannada', 'kn'],
  ['kk', 'Kazakh', 'kk'], ['km-KH', 'Khmer', 'km'], ['ko-KR', 'Korean', 'ko'], ['ky-KG', 'Kyrgyz', 'ky'],
  ['lo-LA', 'Lao', 'lo'], ['lv', 'Latvian', 'lv'], ['lt', 'Lithuanian', 'lt'], ['mk-MK', 'Macedonian', 'mk'],
  ['ms-MY', 'Malay (Malaysia)', 'ms'], ['ms', 'Malay', 'ms'], ['ml-IN', 'Malayalam', 'ml'], ['mr-IN', 'Marathi', 'mr'],
  ['mn-MN', 'Mongolian', 'mn'], ['ne-NP', 'Nepali', 'ne'], ['no-NO', 'Norwegian', 'no'], ['fa', 'Persian', 'fa'],
  ['fa-AE', 'Persian (UAE)', 'fa'], ['fa-AF', 'Persian (Afghanistan)', 'fa'], ['fa-IR', 'Persian (Iran)', 'fa'],
  ['pl-PL', 'Polish', 'pl'], ['pt-BR', 'Portuguese (Brazil)', 'pt'], ['pt-PT', 'Portuguese (Portugal)', 'pt'],
  ['pa', 'Punjabi', 'pa'], ['ro', 'Romanian', 'ro'], ['rm', 'Romansh', 'rm'], ['ru-RU', 'Russian', 'ru'],
  ['sr', 'Serbian', 'sr'], ['si-LK', 'Sinhala', 'si'], ['sk', 'Slovak', 'sk'], ['sl', 'Slovenian', 'sl'],
  ['es-419', 'Spanish (Latin America)', 'es'], ['es-ES', 'Spanish (Spain)', 'es'], ['es-US', 'Spanish (United States)', 'es'],
  ['sw', 'Swahili', 'sw'], ['sv-SE', 'Swedish', 'sv'], ['ta-IN', 'Tamil', 'ta'], ['te-IN', 'Telugu', 'te'],
  ['th', 'Thai', 'th'], ['tr-TR', 'Turkish', 'tr'], ['uk', 'Ukrainian', 'uk'], ['ur', 'Urdu', 'ur'], ['vi', 'Vietnamese', 'vi']
];

const text = {
  en: t('CryptCat', 'Offline file encryption', 'Encrypt and decrypt files offline. Files and passwords stay on your device.', 'CryptCat helps you encrypt and decrypt files offline on your phone or tablet. Choose a file, enter a password, and save a .cryptcat file. Older .crypt3 files can still be opened. Files and passwords stay on this device. The app does not require internet for encryption or decryption. Keep your password safe. CryptCat cannot recover a lost password.', 'encryption,offline,file,privacy,password,documents,photos'),
  'zh-Hans': t('加密猫', '离线文件加密', '离线加密和解密文件。文件和密码只保存在你的设备上。', '加密猫可以在手机或平板上离线加密和解密文件。选择文件，输入密码，然后保存 .cryptcat 文件。旧的 .crypt3 文件仍然可以打开。文件和密码只留在本设备上。加密和解密不需要联网。请妥善保存密码，加密猫无法找回丢失的密码。', '加密,离线,文件,隐私,密码,文档,照片'),
  'zh-Hant': t('加密貓', '離線檔案加密', '離線加密和解密檔案。檔案和密碼只保存在你的裝置上。', '加密貓可以在手機或平板上離線加密和解密檔案。選擇檔案，輸入密碼，然後儲存 .cryptcat 檔案。舊的 .crypt3 檔案仍然可以開啟。檔案和密碼只留在本裝置上。加密和解密不需要網路。請妥善保存密碼，加密貓無法找回遺失的密碼。', '加密,離線,檔案,隱私,密碼,文件,照片'),
  ar: t('قط التشفير', 'تشفير ملفات دون إنترنت', 'شفّر الملفات وافتحها دون إنترنت. تبقى الملفات وكلمات المرور على جهازك.', 'يساعدك قط التشفير على تشفير الملفات وفك تشفيرها دون إنترنت على هاتفك أو جهازك اللوحي. اختر ملفا، أدخل كلمة مرور، واحفظ ملف .cryptcat. يمكن أيضا فتح ملفات .crypt3 القديمة. تبقى الملفات وكلمات المرور على هذا الجهاز. لا يحتاج التطبيق إلى الإنترنت للتشفير أو فك التشفير. احفظ كلمة المرور جيدا، فلا يمكن استعادتها إذا فُقدت.', 'تشفير,دون إنترنت,ملفات,خصوصية,كلمة مرور'),
  bn: t('ক্রিপ্টক্যাট', 'অফলাইন ফাইল এনক্রিপশন', 'অফলাইনে ফাইল এনক্রিপ্ট ও ডিক্রিপ্ট করুন। ফাইল ও পাসওয়ার্ড আপনার ডিভাইসেই থাকে।', 'ক্রিপ্টক্যাট ফোন বা ট্যাবলেটে অফলাইনে ফাইল এনক্রিপ্ট ও ডিক্রিপ্ট করতে সাহায্য করে। একটি ফাইল বেছে নিন, পাসওয়ার্ড দিন, তারপর .cryptcat ফাইল সংরক্ষণ করুন। পুরোনো .crypt3 ফাইলও খোলা যাবে। ফাইল ও পাসওয়ার্ড এই ডিভাইসেই থাকে। এনক্রিপশন বা ডিক্রিপশনের জন্য ইন্টারনেট লাগে না। পাসওয়ার্ড নিরাপদে রাখুন; হারালে ক্রিপ্টক্যাট তা ফিরিয়ে দিতে পারবে না।', 'এনক্রিপশন,অফলাইন,ফাইল,গোপনীয়তা,পাসওয়ার্ড'),
  ca: t('CriptoGat', 'Xifrat de fitxers offline', 'Xifra i desxifra fitxers sense internet. Els fitxers i les contrasenyes es queden al dispositiu.', 'CriptoGat t’ajuda a xifrar i desxifrar fitxers sense internet al mòbil o a la tauleta. Tria un fitxer, introdueix una contrasenya i desa un fitxer .cryptcat. També pots obrir fitxers antics .crypt3. Els fitxers i les contrasenyes es queden en aquest dispositiu. L’app no necessita internet per xifrar ni desxifrar. Guarda bé la contrasenya: CriptoGat no pot recuperar una contrasenya perduda.', 'xifrat,offline,fitxer,privadesa,contrasenya'),
  hr: t('KriptoMačka', 'Izvanmrežno šifriranje', 'Šifrirajte i dešifrirajte datoteke bez interneta. Datoteke i lozinke ostaju na uređaju.', 'KriptoMačka pomaže šifrirati i dešifrirati datoteke bez interneta na telefonu ili tabletu. Odaberite datoteku, unesite lozinku i spremite .cryptcat datoteku. Starije .crypt3 datoteke i dalje se mogu otvoriti. Datoteke i lozinke ostaju na ovom uređaju. Aplikaciji ne treba internet za šifriranje ni dešifriranje. Čuvajte lozinku jer je aplikacija ne može vratiti ako je izgubite.', 'šifriranje,offline,datoteka,privatnost,lozinka'),
  cs: t('KryptoKočka', 'Offline šifrování souborů', 'Šifrujte a dešifrujte soubory offline. Soubory a hesla zůstávají v zařízení.', 'KryptoKočka pomáhá šifrovat a dešifrovat soubory offline v telefonu nebo tabletu. Vyberte soubor, zadejte heslo a uložte soubor .cryptcat. Starší soubory .crypt3 lze stále otevřít. Soubory a hesla zůstávají v tomto zařízení. Aplikace nepotřebuje internet pro šifrování ani dešifrování. Heslo si bezpečně uložte; ztracené heslo nelze obnovit.', 'šifrování,offline,soubor,soukromí,heslo'),
  da: t('KryptoKat', 'Offline filkryptering', 'Krypter og dekrypter filer offline. Filer og adgangskoder bliver på din enhed.', 'KryptoKat hjælper dig med at kryptere og dekryptere filer offline på telefon eller tablet. Vælg en fil, indtast en adgangskode, og gem en .cryptcat-fil. Ældre .crypt3-filer kan stadig åbnes. Filer og adgangskoder bliver på denne enhed. Appen kræver ikke internet til kryptering eller dekryptering. Pas godt på adgangskoden; KryptoKat kan ikke gendanne en mistet adgangskode.', 'kryptering,offline,fil,privatliv,adgangskode'),
  nl: t('CryptoKat', 'Offline bestandsversleuteling', 'Versleutel en ontsleutel bestanden offline. Bestanden en wachtwoorden blijven op je apparaat.', 'CryptoKat helpt je bestanden offline te versleutelen en te ontsleutelen op je telefoon of tablet. Kies een bestand, voer een wachtwoord in en bewaar een .cryptcat-bestand. Oude .crypt3-bestanden kunnen nog steeds worden geopend. Bestanden en wachtwoorden blijven op dit apparaat. De app heeft geen internet nodig voor versleuteling of ontsleuteling. Bewaar je wachtwoord goed; CryptoKat kan een verloren wachtwoord niet herstellen.', 'versleuteling,offline,bestand,privacy,wachtwoord'),
  fi: t('KryptoKissa', 'Offline-tiedostosalaus', 'Salaa ja pura tiedostoja ilman nettiä. Tiedostot ja salasanat pysyvät laitteellasi.', 'KryptoKissa auttaa salaamaan ja purkamaan tiedostoja ilman internetiä puhelimella tai tabletilla. Valitse tiedosto, anna salasana ja tallenna .cryptcat-tiedosto. Vanhoja .crypt3-tiedostoja voi edelleen avata. Tiedostot ja salasanat pysyvät tällä laitteella. Sovellus ei tarvitse internetiä salaukseen tai purkuun. Säilytä salasana huolellisesti; kadonnutta salasanaa ei voi palauttaa.', 'salaus,offline,tiedosto,yksityisyys,salasana'),
  fr: t('CryptoChat', 'Chiffrement hors ligne', 'Chiffrez et déchiffrez vos fichiers hors ligne. Fichiers et mots de passe restent sur l’appareil.', 'CryptoChat vous aide à chiffrer et déchiffrer des fichiers hors ligne sur téléphone ou tablette. Choisissez un fichier, saisissez un mot de passe, puis enregistrez un fichier .cryptcat. Les anciens fichiers .crypt3 restent lisibles. Les fichiers et mots de passe restent sur cet appareil. L’app n’a pas besoin d’internet pour chiffrer ou déchiffrer. Gardez votre mot de passe en lieu sûr : CryptoChat ne peut pas le récupérer.', 'chiffrement,hors ligne,fichier,confidentialité,mot de passe'),
  de: t('KryptoKatze', 'Offline-Dateiverschlüsselung', 'Dateien offline verschlüsseln und entschlüsseln. Dateien und Passwörter bleiben auf deinem Gerät.', 'KryptoKatze hilft dir, Dateien offline auf Smartphone oder Tablet zu verschlüsseln und zu entschlüsseln. Wähle eine Datei, gib ein Passwort ein und speichere eine .cryptcat-Datei. Ältere .crypt3-Dateien lassen sich weiterhin öffnen. Dateien und Passwörter bleiben auf diesem Gerät. Die App braucht kein Internet zum Ver- oder Entschlüsseln. Bewahre dein Passwort gut auf; verlorene Passwörter können nicht wiederhergestellt werden.', 'verschlüsselung,offline,datei,datenschutz,passwort'),
  el: t('ΚρυπτοΓάτα', 'Κρυπτογράφηση εκτός σύνδεσης', 'Κρυπτογραφήστε και αποκρυπτογραφήστε αρχεία χωρίς internet. Τα αρχεία και οι κωδικοί μένουν στη συσκευή.', 'Το ΚρυπτοΓάτα βοηθά να κρυπτογραφείτε και να αποκρυπτογραφείτε αρχεία χωρίς internet σε τηλέφωνο ή tablet. Επιλέξτε αρχείο, βάλτε κωδικό και αποθηκεύστε αρχείο .cryptcat. Τα παλιά αρχεία .crypt3 ανοίγουν ακόμη. Τα αρχεία και οι κωδικοί μένουν σε αυτή τη συσκευή. Η εφαρμογή δεν χρειάζεται internet για τη λειτουργία της. Κρατήστε τον κωδικό σας ασφαλή· δεν μπορεί να ανακτηθεί αν χαθεί.', 'κρυπτογράφηση,offline,αρχεία,ιδιωτικότητα,κωδικός'),
  gu: t('ક્રિપ્ટોબિલાડી', 'ઓફલાઇન ફાઇલ એન્ક્રિપ્શન', 'ઇન્ટરનેટ વગર ફાઇલ એન્ક્રિપ્ટ અને ડિક્રિપ્ટ કરો. ફાઇલ અને પાસવર્ડ તમારા ઉપકરણમાં જ રહે છે.', 'ક્રિપ્ટોબિલાડી ફોન અથવા ટેબ્લેટ પર ઇન્ટરનેટ વગર ફાઇલ એન્ક્રિપ્ટ અને ડિક્રિપ્ટ કરવામાં મદદ કરે છે. ફાઇલ પસંદ કરો, પાસવર્ડ દાખલ કરો અને .cryptcat ફાઇલ સાચવો. જૂની .crypt3 ફાઇલ પણ ખોલી શકાય છે. ફાઇલ અને પાસવર્ડ આ ઉપકરણમાં જ રહે છે. એન્ક્રિપ્શન અથવા ડિક્રિપ્શન માટે ઇન્ટરનેટ જરૂરી નથી. પાસવર્ડ સાચવી રાખો; ખોવાયેલો પાસવર્ડ પાછો મેળવી શકાતો નથી.', 'એન્ક્રિપ્શન,ઓફલાઇન,ફાઇલ,ગોપનીયતા,પાસવર્ડ'),
  he: t('קריפטו חתול', 'הצפנת קבצים אופליין', 'הצפנה ופענוח של קבצים ללא אינטרנט. הקבצים והסיסמאות נשארים במכשיר.', 'קריפטו חתול עוזר להצפין ולפענח קבצים ללא אינטרנט בטלפון או בטאבלט. בחרו קובץ, הזינו סיסמה ושמרו קובץ .cryptcat. ניתן עדיין לפתוח קבצי .crypt3 ישנים. הקבצים והסיסמאות נשארים במכשיר הזה. האפליקציה לא צריכה אינטרנט להצפנה או לפענוח. שמרו היטב את הסיסמה; אי אפשר לשחזר סיסמה שאבדה.', 'הצפנה,אופליין,קובץ,פרטיות,סיסמה'),
  hi: t('क्रिप्टकैट', 'ऑफलाइन फाइल एन्क्रिप्शन', 'बिना इंटरनेट फाइल एन्क्रिप्ट और डिक्रिप्ट करें। फाइल और पासवर्ड आपके डिवाइस पर रहते हैं।', 'क्रिप्टकैट फोन या टैबलेट पर बिना इंटरनेट फाइल एन्क्रिप्ट और डिक्रिप्ट करने में मदद करता है। फाइल चुनें, पासवर्ड डालें और .cryptcat फाइल सेव करें। पुरानी .crypt3 फाइलें भी खुलती रहेंगी। फाइल और पासवर्ड इसी डिवाइस पर रहते हैं। एन्क्रिप्शन या डिक्रिप्शन के लिए इंटरनेट की जरूरत नहीं है। अपना पासवर्ड सुरक्षित रखें; खोया पासवर्ड वापस नहीं मिल सकता।', 'एन्क्रिप्शन,ऑफलाइन,फाइल,निजता,पासवर्ड'),
  hu: t('KriptoMacska', 'Offline fájltitkosítás', 'Titkosíts és fejts vissza fájlokat offline. A fájlok és jelszavak az eszközön maradnak.', 'A KriptoMacska segít fájlokat titkosítani és visszafejteni internet nélkül telefonon vagy tableten. Válassz fájlt, adj meg jelszót, majd ments .cryptcat fájlt. A régi .crypt3 fájlok továbbra is megnyithatók. A fájlok és jelszavak ezen az eszközön maradnak. Az appnak nincs szüksége internetre. Őrizd meg a jelszavadat; az elveszett jelszó nem állítható vissza.', 'titkosítás,offline,fájl,adatvédelem,jelszó'),
  id: t('KucingKripto', 'Enkripsi file offline', 'Enkripsi dan buka file tanpa internet. File dan kata sandi tetap di perangkat Anda.', 'KucingKripto membantu mengenkripsi dan membuka file tanpa internet di ponsel atau tablet. Pilih file, masukkan kata sandi, lalu simpan file .cryptcat. File lama .crypt3 tetap bisa dibuka. File dan kata sandi tetap berada di perangkat ini. Aplikasi tidak memerlukan internet untuk enkripsi atau dekripsi. Simpan kata sandi dengan baik; kata sandi yang hilang tidak dapat dipulihkan.', 'enkripsi,offline,file,privasi,kata sandi'),
  it: t('CriptoGatto', 'Crittografia file offline', 'Cripta e decripta file offline. File e password restano sul dispositivo.', 'CriptoGatto ti aiuta a criptare e decriptare file offline su telefono o tablet. Scegli un file, inserisci una password e salva un file .cryptcat. I vecchi file .crypt3 restano apribili. File e password restano su questo dispositivo. L’app non richiede internet per criptare o decriptare. Conserva bene la password: non può essere recuperata se la perdi.', 'crittografia,offline,file,privacy,password'),
  ja: t('暗号猫', 'オフラインファイル暗号化', 'インターネットなしでファイルを暗号化・復号。ファイルとパスワードは端末内に残ります。', '暗号猫は、スマートフォンやタブレットでファイルをオフラインで暗号化・復号するためのアプリです。ファイルを選び、パスワードを入力して .cryptcat ファイルを保存します。古い .crypt3 ファイルも開けます。ファイルとパスワードはこの端末内に残ります。暗号化と復号にインターネットは不要です。パスワードは安全に保管してください。失くしたパスワードは復元できません。', '暗号化,オフライン,ファイル,プライバシー,パスワード'),
  kn: t('ಕ್ರಿಪ್ಟೋಬೆಕ್ಕು', 'ಆಫ್‌ಲೈನ್ ಫೈಲ್ ಎನ್ಕ್ರಿಪ್ಷನ್', 'ಇಂಟರ್‌ನೆಟ್ ಇಲ್ಲದೆ ಫೈಲ್ ಎನ್ಕ್ರಿಪ್ಟ್ ಮತ್ತು ಡಿಕ್ರಿಪ್ಟ್ ಮಾಡಿ. ಫೈಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಸಾಧನದಲ್ಲೇ ಇರುತ್ತವೆ.', 'ಕ್ರಿಪ್ಟೋಬೆಕ್ಕು ಫೋನ್ ಅಥವಾ ಟ್ಯಾಬ್ಲೆಟ್‌ನಲ್ಲಿ ಇಂಟರ್‌ನೆಟ್ ಇಲ್ಲದೆ ಫೈಲ್‌ಗಳನ್ನು ಎನ್ಕ್ರಿಪ್ಟ್ ಮತ್ತು ಡಿಕ್ರಿಪ್ಟ್ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ, ಪಾಸ್‌ವರ್ಡ್ ನೀಡಿ ಮತ್ತು .cryptcat ಫೈಲ್ ಉಳಿಸಿ. ಹಳೆಯ .crypt3 ಫೈಲ್‌ಗಳನ್ನೂ ತೆರೆಯಬಹುದು. ಫೈಲ್ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಈ ಸಾಧನದಲ್ಲೇ ಇರುತ್ತವೆ. ಪಾಸ್‌ವರ್ಡ್ ಸುರಕ್ಷಿತವಾಗಿ ಇಡಿ; ಕಳೆದುಹೋದ ಪಾಸ್‌ವರ್ಡ್ ಮರಳಿ ಸಿಗುವುದಿಲ್ಲ.', 'ಎನ್ಕ್ರಿಪ್ಷನ್,ಆಫ್‌ಲೈನ್,ಫೈಲ್,ಗೌಪ್ಯತೆ,ಪಾಸ್‌ವರ್ಡ್'),
  ko: t('암호고양이', '오프라인 파일 암호화', '인터넷 없이 파일을 암호화하고 복호화하세요. 파일과 비밀번호는 기기에만 남습니다.', '암호고양이는 휴대폰이나 태블릿에서 인터넷 없이 파일을 암호화하고 복호화하도록 돕습니다. 파일을 선택하고 비밀번호를 입력한 뒤 .cryptcat 파일로 저장하세요. 이전 .crypt3 파일도 계속 열 수 있습니다. 파일과 비밀번호는 이 기기에만 남습니다. 암호화와 복호화에 인터넷이 필요하지 않습니다. 비밀번호를 안전하게 보관하세요. 잃어버린 비밀번호는 복구할 수 없습니다.', '암호화,오프라인,파일,개인정보,비밀번호'),
  ms: t('KucingKripto', 'Sulitkan fail luar talian', 'Sulit dan nyahsulit fail tanpa internet. Fail dan kata laluan kekal pada peranti anda.', 'KucingKripto membantu menyulitkan dan menyahsulit fail tanpa internet pada telefon atau tablet. Pilih fail, masukkan kata laluan dan simpan fail .cryptcat. Fail lama .crypt3 masih boleh dibuka. Fail dan kata laluan kekal pada peranti ini. Aplikasi tidak memerlukan internet untuk penyulitan atau nyahsulit. Simpan kata laluan dengan baik; kata laluan yang hilang tidak boleh dipulihkan.', 'penyulitan,luar talian,fail,privasi,kata laluan'),
  ml: t('ക്രിപ്റ്റോപൂച്ച', 'ഓഫ്‌ലൈൻ ഫയൽ എൻക്രിപ്ഷൻ', 'ഇന്റർനെറ്റ് ഇല്ലാതെ ഫയൽ എൻക്രിപ്റ്റ്, ഡിക്രിപ്റ്റ് ചെയ്യുക. ഫയലുകളും പാസ്‌വേഡുകളും ഉപകരണത്തിൽ തന്നെ.', 'ക്രിപ്റ്റോപൂച്ച ഫോൺ അല്ലെങ്കിൽ ടാബ്‌ലെറ്റിൽ ഇന്റർനെറ്റ് ഇല്ലാതെ ഫയലുകൾ എൻക്രിപ്റ്റ് ചെയ്യാനും ഡിക്രിപ്റ്റ് ചെയ്യാനും സഹായിക്കുന്നു. ഫയൽ തിരഞ്ഞെടുക്കുക, പാസ്‌വേഡ് നൽകുക, .cryptcat ഫയൽ സംരക്ഷിക്കുക. പഴയ .crypt3 ഫയലുകളും തുറക്കാം. ഫയലുകളും പാസ്‌വേഡുകളും ഈ ഉപകരണത്തിൽ തന്നെ ഇരിക്കും. പാസ്‌വേഡ് സൂക്ഷിക്കുക; നഷ്ടപ്പെട്ടാൽ തിരികെ ലഭ്യമല്ല.', 'എൻക്രിപ്ഷൻ,ഓഫ്‌ലൈൻ,ഫയൽ,സ്വകാര്യത,പാസ്‌വേഡ്'),
  mr: t('क्रिप्टोमांजर', 'ऑफलाइन फाइल एन्क्रिप्शन', 'इंटरनेटशिवाय फाइल एन्क्रिप्ट आणि डिक्रिप्ट करा. फाइल आणि पासवर्ड तुमच्या डिव्हाइसवरच राहतात.', 'क्रिप्टोमांजर फोन किंवा टॅबलेटवर इंटरनेटशिवाय फाइल एन्क्रिप्ट आणि डिक्रिप्ट करण्यात मदत करते. फाइल निवडा, पासवर्ड टाका आणि .cryptcat फाइल सेव्ह करा. जुन्या .crypt3 फाइल्सही उघडता येतात. फाइल आणि पासवर्ड याच डिव्हाइसवर राहतात. पासवर्ड सुरक्षित ठेवा; हरवलेला पासवर्ड परत मिळू शकत नाही.', 'एन्क्रिप्शन,ऑफलाइन,फाइल,गोपनीयता,पासवर्ड'),
  no: t('KryptoKatt', 'Offline filkryptering', 'Krypter og dekrypter filer uten internett. Filer og passord blir på enheten din.', 'KryptoKatt hjelper deg å kryptere og dekryptere filer uten internett på telefon eller nettbrett. Velg en fil, skriv inn et passord og lagre en .cryptcat-fil. Eldre .crypt3-filer kan fortsatt åpnes. Filer og passord blir på denne enheten. Appen trenger ikke internett for kryptering eller dekryptering. Ta vare på passordet; et mistet passord kan ikke gjenopprettes.', 'kryptering,offline,fil,personvern,passord'),
  or: t('କ୍ରିପ୍ଟୋବିଲେଇ', 'ଅଫଲାଇନ ଫାଇଲ ଏନକ୍ରିପ୍ସନ', 'ଇଣ୍ଟରନେଟ ବିନା ଫାଇଲ ଏନକ୍ରିପ୍ଟ ଓ ଡିକ୍ରିପ୍ଟ କରନ୍ତୁ। ଫାଇଲ ଓ ପାସୱାର୍ଡ ଡିଭାଇସରେ ରହେ।', 'କ୍ରିପ୍ଟୋବିଲେଇ ଫୋନ କିମ୍ବା ଟାବଲେଟରେ ଇଣ୍ଟରନେଟ ବିନା ଫାଇଲ ଏନକ୍ରିପ୍ଟ ଓ ଡିକ୍ରିପ୍ଟ କରିବାରେ ସହାୟତା କରେ। ଫାଇଲ ବାଛନ୍ତୁ, ପାସୱାର୍ଡ ଦିଅନ୍ତୁ ଏବଂ .cryptcat ଫାଇଲ ସେଭ କରନ୍ତୁ। ପୁରୁଣା .crypt3 ଫାଇଲ ମଧ୍ୟ ଖୋଲିବ। ପାସୱାର୍ଡ ସୁରକ୍ଷିତ ରଖନ୍ତୁ; ହରାଇଗଲେ ଫେରାଇ ଆଣିହେବ ନାହିଁ।', 'ଏନକ୍ରିପ୍ସନ,ଅଫଲାଇନ,ଫାଇଲ,ଗୋପନୀୟତା,ପାସୱାର୍ଡ'),
  pl: t('KryptoKot', 'Szyfrowanie plików offline', 'Szyfruj i odszyfruj pliki offline. Pliki i hasła zostają na urządzeniu.', 'KryptoKot pomaga szyfrować i odszyfrowywać pliki offline na telefonie lub tablecie. Wybierz plik, wpisz hasło i zapisz plik .cryptcat. Starsze pliki .crypt3 nadal można otworzyć. Pliki i hasła zostają na tym urządzeniu. Aplikacja nie wymaga internetu do szyfrowania ani odszyfrowywania. Zachowaj hasło; utraconego hasła nie da się odzyskać.', 'szyfrowanie,offline,plik,prywatność,hasło'),
  pt: t('CriptoGato', 'Criptografia offline', 'Criptografe e descriptografe arquivos offline. Arquivos e senhas ficam no dispositivo.', 'CriptoGato ajuda a criptografar e descriptografar arquivos offline no celular ou tablet. Escolha um arquivo, digite uma senha e salve um arquivo .cryptcat. Arquivos antigos .crypt3 ainda podem ser abertos. Arquivos e senhas ficam neste dispositivo. O app não precisa de internet para criptografar ou descriptografar. Guarde bem a senha; uma senha perdida não pode ser recuperada.', 'criptografia,offline,arquivo,privacidade,senha'),
  pa: t('ਕ੍ਰਿਪਟੋਬਿੱਲੀ', 'ਆਫਲਾਈਨ ਫਾਈਲ ਇਨਕ੍ਰਿਪਸ਼ਨ', 'ਇੰਟਰਨੈੱਟ ਬਿਨਾਂ ਫਾਈਲ ਇਨਕ੍ਰਿਪਟ ਅਤੇ ਡਿਕ੍ਰਿਪਟ ਕਰੋ। ਫਾਈਲਾਂ ਅਤੇ ਪਾਸਵਰਡ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ਤੇ ਰਹਿੰਦੇ ਹਨ।', 'ਕ੍ਰਿਪਟੋਬਿੱਲੀ ਫੋਨ ਜਾਂ ਟੈਬਲੈਟ ਤੇ ਇੰਟਰਨੈੱਟ ਬਿਨਾਂ ਫਾਈਲਾਂ ਇਨਕ੍ਰਿਪਟ ਅਤੇ ਡਿਕ੍ਰਿਪਟ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ। ਫਾਈਲ ਚੁਣੋ, ਪਾਸਵਰਡ ਦਿਓ ਅਤੇ .cryptcat ਫਾਈਲ ਸੇਵ ਕਰੋ। ਪੁਰਾਣੀਆਂ .crypt3 ਫਾਈਲਾਂ ਵੀ ਖੁੱਲ ਸਕਦੀਆਂ ਹਨ। ਫਾਈਲਾਂ ਅਤੇ ਪਾਸਵਰਡ ਇਸ ਡਿਵਾਈਸ ਤੇ ਹੀ ਰਹਿੰਦੇ ਹਨ। ਪਾਸਵਰਡ ਸੰਭਾਲ ਕੇ ਰੱਖੋ; ਗੁੰਮ ਪਾਸਵਰਡ ਮੁੜ ਨਹੀਂ ਮਿਲਦਾ।', 'ਇਨਕ੍ਰਿਪਸ਼ਨ,ਆਫਲਾਈਨ,ਫਾਈਲ,ਨਿੱਜਤਾ,ਪਾਸਵਰਡ'),
  ro: t('CriptoPisică', 'Criptare fișiere offline', 'Criptează și decriptează fișiere offline. Fișierele și parolele rămân pe dispozitiv.', 'CriptoPisică te ajută să criptezi și să decriptezi fișiere offline pe telefon sau tabletă. Alege un fișier, introdu o parolă și salvează un fișier .cryptcat. Fișierele vechi .crypt3 pot fi deschise în continuare. Fișierele și parolele rămân pe acest dispozitiv. Aplicația nu are nevoie de internet pentru criptare sau decriptare. Păstrează parola în siguranță; nu poate fi recuperată dacă se pierde.', 'criptare,offline,fișier,confidențialitate,parolă'),
  ru: t('Криптокот', 'Шифрование файлов офлайн', 'Шифруйте и расшифровывайте файлы без интернета. Файлы и пароли остаются на устройстве.', 'Криптокот помогает шифровать и расшифровывать файлы без интернета на телефоне или планшете. Выберите файл, введите пароль и сохраните файл .cryptcat. Старые файлы .crypt3 по-прежнему можно открыть. Файлы и пароли остаются на этом устройстве. Приложению не нужен интернет для шифрования или расшифровки. Берегите пароль: потерянный пароль восстановить нельзя.', 'шифрование,офлайн,файл,приватность,пароль'),
  sk: t('KryptoMačka', 'Offline šifrovanie súborov', 'Šifrujte a dešifrujte súbory offline. Súbory a heslá zostávajú v zariadení.', 'KryptoMačka pomáha šifrovať a dešifrovať súbory offline v telefóne alebo tablete. Vyberte súbor, zadajte heslo a uložte súbor .cryptcat. Staršie súbory .crypt3 sa stále dajú otvoriť. Súbory a heslá zostávajú v tomto zariadení. Aplikácia nepotrebuje internet. Heslo si bezpečne uložte; stratené heslo nemožno obnoviť.', 'šifrovanie,offline,súbor,súkromie,heslo'),
  sl: t('KriptoMačka', 'Šifriranje datotek offline', 'Šifrirajte in dešifrirajte datoteke brez interneta. Datoteke in gesla ostanejo v napravi.', 'KriptoMačka pomaga šifrirati in dešifrirati datoteke brez interneta na telefonu ali tablici. Izberite datoteko, vnesite geslo in shranite datoteko .cryptcat. Stare datoteke .crypt3 je še vedno mogoče odpreti. Datoteke in gesla ostanejo v tej napravi. Aplikacija ne potrebuje interneta za šifriranje ali dešifriranje. Geslo skrbno shranite; izgubljenega gesla ni mogoče obnoviti.', 'šifriranje,offline,datoteka,zasebnost,geslo'),
  es: t('CriptoGato', 'Cifrado sin conexión', 'Cifra y descifra archivos sin internet. Tus archivos y contraseñas se quedan en el dispositivo.', 'CriptoGato te ayuda a cifrar y descifrar archivos sin internet en tu teléfono o tablet. Elige un archivo, escribe una contraseña y guarda un archivo .cryptcat. Los archivos antiguos .crypt3 se pueden seguir abriendo. Tus archivos y contraseñas se quedan en este dispositivo. La app no necesita internet para cifrar ni descifrar. Guarda bien tu contraseña; no se puede recuperar si la pierdes.', 'cifrado,sin conexión,archivo,privacidad,contraseña'),
  sv: t('KryptoKatt', 'Offline filkryptering', 'Kryptera och dekryptera filer offline. Filer och lösenord stannar på enheten.', 'KryptoKatt hjälper dig att kryptera och dekryptera filer offline på telefon eller surfplatta. Välj en fil, ange ett lösenord och spara en .cryptcat-fil. Äldre .crypt3-filer kan fortfarande öppnas. Filer och lösenord stannar på den här enheten. Appen behöver inte internet för kryptering eller dekryptering. Spara lösenordet säkert; ett förlorat lösenord kan inte återställas.', 'kryptering,offline,fil,integritet,lösenord'),
  ta: t('கிரிப்டோபூனை', 'ஆஃப்லைன் கோப்பு குறியாக்கம்', 'இணையம் இல்லாமல் கோப்புகளை குறியாக்கவும் திறக்கவும். கோப்புகளும் கடவுச்சொற்களும் உங்கள் சாதனத்திலேயே இருக்கும்.', 'கிரிப்டோபூனை கைபேசி அல்லது டேப்லெட்டில் இணையம் இல்லாமல் கோப்புகளை குறியாக்கவும் திறக்கவும் உதவுகிறது. கோப்பைத் தேர்ந்தெடுத்து, கடவுச்சொல் கொடுத்து, .cryptcat கோப்பாக சேமிக்கவும். பழைய .crypt3 கோப்புகளையும் திறக்கலாம். கோப்புகளும் கடவுச்சொற்களும் இந்த சாதனத்திலேயே இருக்கும். கடவுச்சொல்லை பாதுகாப்பாக வைத்திருங்கள்; இழந்தால் மீட்க முடியாது.', 'குறியாக்கம்,ஆஃப்லைன்,கோப்பு,தனியுரிமை,கடவுச்சொல்'),
  te: t('క్రిప్టోపిల్లి', 'ఆఫ్‌లైన్ ఫైల్ ఎన్‌క్రిప్షన్', 'ఇంటర్నెట్ లేకుండా ఫైళ్లను ఎన్‌క్రిప్ట్ మరియు డిక్రిప్ట్ చేయండి. ఫైళ్లు, పాస్‌వర్డ్‌లు మీ పరికరంలోనే ఉంటాయి.', 'క్రిప్టోపిల్లి ఫోన్ లేదా టాబ్లెట్‌లో ఇంటర్నెట్ లేకుండా ఫైళ్లను ఎన్‌క్రిప్ట్ మరియు డిక్రిప్ట్ చేయడానికి సహాయపడుతుంది. ఫైల్ ఎంచుకుని, పాస్‌వర్డ్ ఇవ్వండి, .cryptcat ఫైల్‌గా సేవ్ చేయండి. పాత .crypt3 ఫైళ్లను కూడా తెరవచ్చు. ఫైళ్లు మరియు పాస్‌వర్డ్‌లు ఈ పరికరంలోనే ఉంటాయి. పాస్‌వర్డ్‌ను జాగ్రత్తగా ఉంచండి; పోయిన పాస్‌వర్డ్ తిరిగి రాదు.', 'ఎన్‌క్రిప్షన్,ఆఫ్‌లైన్,ఫైల్,గోప్యత,పాస్‌వర్డ్'),
  th: t('แมวคริปโต', 'เข้ารหัสไฟล์ออฟไลน์', 'เข้ารหัสและถอดรหัสไฟล์โดยไม่ใช้อินเทอร์เน็ต ไฟล์และรหัสผ่านอยู่บนอุปกรณ์ของคุณ', 'แมวคริปโตช่วยเข้ารหัสและถอดรหัสไฟล์แบบออฟไลน์บนโทรศัพท์หรือแท็บเล็ต เลือกไฟล์ ใส่รหัสผ่าน แล้วบันทึกเป็นไฟล์ .cryptcat ไฟล์เก่า .crypt3 ยังเปิดได้ ไฟล์และรหัสผ่านอยู่บนอุปกรณ์นี้ แอปไม่ต้องใช้อินเทอร์เน็ตสำหรับการเข้ารหัสหรือถอดรหัส โปรดเก็บรหัสผ่านให้ดี เพราะกู้คืนไม่ได้หากลืม', 'เข้ารหัส,ออฟไลน์,ไฟล์,ความเป็นส่วนตัว,รหัสผ่าน'),
  tr: t('KriptoKedi', 'Çevrimdışı dosya şifreleme', 'Dosyaları internetsiz şifreleyin ve açın. Dosyalar ve parolalar cihazınızda kalır.', 'KriptoKedi, telefonda veya tablette dosyaları internet olmadan şifrelemenize ve açmanıza yardım eder. Bir dosya seçin, parola girin ve .cryptcat dosyası olarak kaydedin. Eski .crypt3 dosyaları da açılabilir. Dosyalar ve parolalar bu cihazda kalır. Uygulama şifreleme veya çözme için internet gerektirmez. Parolanızı güvenli saklayın; kaybolan parola geri getirilemez.', 'şifreleme,çevrimdışı,dosya,gizlilik,parola'),
  uk: t('Криптокіт', 'Шифрування файлів офлайн', 'Шифруйте й розшифровуйте файли без інтернету. Файли та паролі залишаються на пристрої.', 'Криптокіт допомагає шифрувати й розшифровувати файли без інтернету на телефоні або планшеті. Виберіть файл, введіть пароль і збережіть файл .cryptcat. Старі файли .crypt3 також можна відкрити. Файли та паролі залишаються на цьому пристрої. Додатку не потрібен інтернет для шифрування чи розшифрування. Бережіть пароль; втрачений пароль відновити неможливо.', 'шифрування,офлайн,файл,приватність,пароль'),
  ur: t('کرپٹو بلی', 'آف لائن فائل انکرپشن', 'انٹرنیٹ کے بغیر فائلیں انکرپٹ اور ڈکرپٹ کریں۔ فائلیں اور پاس ورڈ آپ کے آلے پر رہتے ہیں۔', 'کرپٹو بلی فون یا ٹیبلیٹ پر انٹرنیٹ کے بغیر فائلیں انکرپٹ اور ڈکرپٹ کرنے میں مدد دیتی ہے۔ فائل منتخب کریں، پاس ورڈ درج کریں اور .cryptcat فائل محفوظ کریں۔ پرانی .crypt3 فائلیں بھی کھولی جا سکتی ہیں۔ فائلیں اور پاس ورڈ اسی آلے پر رہتے ہیں۔ پاس ورڈ محفوظ رکھیں؛ گم شدہ پاس ورڈ واپس نہیں مل سکتا۔', 'انکرپشن,آف لائن,فائل,پرائیویسی,پاس ورڈ'),
  vi: t('Mèo Mã Hóa', 'Mã hóa tệp ngoại tuyến', 'Mã hóa và giải mã tệp không cần internet. Tệp và mật khẩu ở lại trên thiết bị.', 'Mèo Mã Hóa giúp bạn mã hóa và giải mã tệp ngoại tuyến trên điện thoại hoặc máy tính bảng. Chọn tệp, nhập mật khẩu rồi lưu tệp .cryptcat. Tệp cũ .crypt3 vẫn có thể mở. Tệp và mật khẩu ở lại trên thiết bị này. Ứng dụng không cần internet để mã hóa hoặc giải mã. Hãy giữ mật khẩu cẩn thận; mật khẩu bị mất không thể khôi phục.', 'mã hóa,ngoại tuyến,tệp,riêng tư,mật khẩu'),
  af: t('CryptCat', 'Vanlyn lêerkodering', 'Kodeer en ontsluit lêers vanlyn. Lêers en wagwoorde bly op jou toestel.', 'CryptCat help jou om lêers vanlyn op jou foon of tablet te kodeer en te ontsluit. Kies ’n lêer, voer ’n wagwoord in en stoor ’n .cryptcat-lêer. Ouer .crypt3-lêers kan steeds oopgemaak word. Lêers en wagwoorde bly op hierdie toestel. Die app het nie internet nodig vir kodering of ontsluiting nie. Hou jou wagwoord veilig; ’n verlore wagwoord kan nie herstel word nie.', 'kodering,vanlyn,lêer,privaatheid,wagwoord'),
  sq: t('MacjaKripto', 'Kriptim skedarësh offline', 'Kripto dhe hap skedarë pa internet. Skedarët dhe fjalëkalimet mbeten në pajisjen tënde.', 'MacjaKripto të ndihmon të kriptosh dhe të hapësh skedarë pa internet në telefon ose tablet. Zgjidh një skedar, vendos fjalëkalimin dhe ruaj një skedar .cryptcat. Skedarët e vjetër .crypt3 mund të hapen ende. Skedarët dhe fjalëkalimet mbeten në këtë pajisje. Aplikacioni nuk kërkon internet. Ruaje mirë fjalëkalimin; fjalëkalimi i humbur nuk rikuperohet.', 'kriptim,offline,skedar,privatësi,fjalëkalim'),
  am: t('ክሪፕቶድመት', 'ከመስመር ውጭ ፋይል ማመስጠር', 'ፋይሎችን ያለ ኢንተርኔት ያመስጥሩ እና ይክፈቱ። ፋይሎችና የይለፍ ቃሎች በመሣሪያዎ ላይ ይቆያሉ።', 'ክሪፕቶድመት በስልክ ወይም ታብሌት ላይ ፋይሎችን ያለ ኢንተርኔት ለማመስጠር እና ለመክፈት ይረዳል። ፋይል ይምረጡ፣ የይለፍ ቃል ያስገቡ እና .cryptcat ፋይል ያስቀምጡ። የቀድሞ .crypt3 ፋይሎችም ይከፈታሉ። ፋይሎችና የይለፍ ቃሎች በዚህ መሣሪያ ላይ ይቆያሉ። የይለፍ ቃልዎን በጥንቃቄ ያስቀምጡ፤ ከጠፋ መመለስ አይቻልም።', 'ማመስጠር,ኦፍላይን,ፋይል,ግላዊነት,የይለፍ ቃል'),
  hy: t('ԿրիպտոԿատու', 'Ֆայլերի օֆլայն կոդավորում', 'Կոդավորեք և բացեք ֆայլերը առանց ինտերնետի։ Ֆայլերն ու գաղտնաբառերը մնում են սարքում։', 'ԿրիպտոԿատուն օգնում է կոդավորել և բացել ֆայլերը առանց ինտերնետի հեռախոսում կամ պլանշետում։ Ընտրեք ֆայլ, մուտքագրեք գաղտնաբառ և պահեք .cryptcat ֆայլ։ Հին .crypt3 ֆայլերը նույնպես կարող են բացվել։ Ֆայլերն ու գաղտնաբառերը մնում են այս սարքում։ Պահեք գաղտնաբառը ապահով․ կորցրած գաղտնաբառը վերականգնել հնարավոր չէ։', 'կոդավորում,օֆլայն,ֆայլ,գաղտնիություն,գաղտնաբառ'),
  az: t('KriptoPişik', 'Oflayn fayl şifrələmə', 'Faylları internet olmadan şifrələyin və açın. Fayllar və parollar cihazınızda qalır.', 'KriptoPişik telefonda və ya planşetdə faylları internet olmadan şifrələməyə və açmağa kömək edir. Fayl seçin, parol daxil edin və .cryptcat faylı kimi saxlayın. Köhnə .crypt3 faylları da açılır. Fayllar və parollar bu cihazda qalır. Parolu təhlükəsiz saxlayın; itirilmiş parol bərpa olunmur.', 'şifrələmə,oflayn,fayl,məxfilik,parol'),
  eu: t('KriptoKatua', 'Lineaz kanpoko fitxategi-zifratzea', 'Zifratu eta deszifratu fitxategiak internetik gabe. Fitxategiak eta pasahitzak gailuan geratzen dira.', 'KriptoKatuak telefonoan edo tabletan fitxategiak internetik gabe zifratu eta deszifratzeko laguntzen du. Aukeratu fitxategi bat, sartu pasahitza eta gorde .cryptcat fitxategia. .crypt3 fitxategi zaharrak ere ireki daitezke. Fitxategiak eta pasahitzak gailu honetan geratzen dira. Gorde pasahitza ondo; galdutako pasahitza ezin da berreskuratu.', 'zifratzea,offline,fitxategia,pribatutasuna,pasahitza'),
  be: t('КрыптаКот', 'Афлайн-шыфраванне файлаў', 'Шыфруйце і адкрывайце файлы без інтэрнэту. Файлы і паролі застаюцца на прыладзе.', 'КрыптаКот дапамагае шыфраваць і адкрываць файлы без інтэрнэту на тэлефоне або планшэце. Выберыце файл, увядзіце пароль і захавайце файл .cryptcat. Старыя файлы .crypt3 таксама адкрываюцца. Файлы і паролі застаюцца на гэтай прыладзе. Беражыце пароль; страчаны пароль аднавіць нельга.', 'шыфраванне,афлайн,файл,прыватнасць,пароль'),
  bg: t('КриптоКотка', 'Офлайн шифроване', 'Шифровайте и отваряйте файлове без интернет. Файловете и паролите остават на устройството.', 'КриптоКотка помага да шифровате и отваряте файлове без интернет на телефон или таблет. Изберете файл, въведете парола и запазете .cryptcat файл. Старите .crypt3 файлове също могат да се отварят. Файловете и паролите остават на това устройство. Пазете паролата си; изгубена парола не може да се възстанови.', 'шифроване,офлайн,файл,поверителност,парола'),
  my: t('Cryptoကြောင်', 'အော့ဖ်လိုင်း ဖိုင်စာဝှက်', 'အင်တာနက်မလိုဘဲ ဖိုင်များကို စာဝှက်ပြီး ပြန်ဖွင့်ပါ။ ဖိုင်နှင့် စကားဝှက်များသည် စက်ထဲတွင်သာရှိသည်။', 'Cryptoကြောင် သည် ဖုန်း သို့မဟုတ် တက်ဘလက်ပေါ်တွင် အင်တာနက်မလိုဘဲ ဖိုင်များကို စာဝှက်ပြီး ပြန်ဖွင့်ရန် ကူညီသည်။ ဖိုင်တစ်ခုရွေးပါ၊ စကားဝှက်ထည့်ပါ၊ .cryptcat ဖိုင်အဖြစ် သိမ်းပါ။ .crypt3 ဖိုင်ဟောင်းများကိုလည်း ဖွင့်နိုင်သည်။ ဖိုင်နှင့် စကားဝှက်များသည် ဤစက်ထဲတွင်သာ ရှိသည်။ စကားဝှက်ကို သေချာသိမ်းပါ; ပျောက်သွားလျှင် ပြန်ယူ၍မရပါ။', 'စာဝှက်,အော့ဖ်လိုင်း,ဖိုင်,ကိုယ်ရေးလုံခြုံမှု,စကားဝှက်'),
  et: t('KrüptoKass', 'Võrguühenduseta failikrüpteering', 'Krüpteeri ja ava faile ilma internetita. Failid ja paroolid jäävad seadmesse.', 'KrüptoKass aitab telefonis või tahvelarvutis faile ilma internetita krüpteerida ja avada. Vali fail, sisesta parool ja salvesta .cryptcat-fail. Vanad .crypt3-failid avanevad endiselt. Failid ja paroolid jäävad sellesse seadmesse. Hoia parooli turvaliselt; kaotatud parooli ei saa taastada.', 'krüpteerimine,offline,fail,privaatsus,parool'),
  fil: t('CryptPusa', 'Offline na pag-encrypt', 'I-encrypt at buksan ang mga file nang walang internet. Nananatili sa device ang file at password.', 'Tinutulungan ka ng CryptPusa na i-encrypt at buksan ang mga file nang walang internet sa phone o tablet. Pumili ng file, ilagay ang password, at i-save bilang .cryptcat file. Mabubuksan pa rin ang lumang .crypt3 files. Nananatili sa device na ito ang mga file at password. Ingatan ang password; hindi na ito mababawi kapag nawala.', 'encryption,offline,file,privacy,password'),
  gl: t('CriptoGato', 'Cifrado de ficheiros offline', 'Cifra e descifra ficheiros sen internet. Os ficheiros e contrasinais quedan no dispositivo.', 'CriptoGato axuda a cifrar e descifrar ficheiros sen internet no móbil ou tableta. Escolle un ficheiro, introduce un contrasinal e garda un ficheiro .cryptcat. Os antigos .crypt3 tamén se poden abrir. Os ficheiros e contrasinais quedan neste dispositivo. Garda ben o contrasinal; se o perdes non se pode recuperar.', 'cifrado,offline,ficheiro,privacidade,contrasinal'),
  ka: t('კრიპტოკატა', 'ფაილების ოფლაინ დაშიფვრა', 'დაშიფრეთ და გახსენით ფაილები ინტერნეტის გარეშე. ფაილები და პაროლები რჩება მოწყობილობაზე.', 'კრიპტოკატა გეხმარებათ ტელეფონზე ან ტაბლეტზე ფაილების ინტერნეტის გარეშე დაშიფვრასა და გახსნაში. აირჩიეთ ფაილი, შეიყვანეთ პაროლი და შეინახეთ .cryptcat ფაილი. ძველი .crypt3 ფაილებიც იხსნება. ფაილები და პაროლები ამ მოწყობილობაზე რჩება. შეინახეთ პაროლი უსაფრთხოდ; დაკარგული პაროლი ვერ აღდგება.', 'დაშიფვრა,ოფლაინ,ფაილი,პირადულობა,პაროლი'),
  is: t('Dulkisa', 'Dulkóðun skráa án nets', 'Dulkóðaðu og opnaðu skrár án internets. Skrár og lykilorð verða áfram í tækinu.', 'Dulkisa hjálpar þér að dulkóða og opna skrár án internets í síma eða spjaldtölvu. Veldu skrá, sláðu inn lykilorð og vistaðu .cryptcat-skrá. Eldri .crypt3-skrár er enn hægt að opna. Skrár og lykilorð verða áfram í þessu tæki. Geymdu lykilorðið vel; glatað lykilorð er ekki hægt að endurheimta.', 'dulkóðun,offline,skrá,persónuvernd,lykilorð'),
  kk: t('КриптоМысық', 'Офлайн файл шифрлау', 'Файлдарды интернетсіз шифрлап, ашыңыз. Файлдар мен құпиясөздер құрылғыда қалады.', 'КриптоМысық телефонда немесе планшетте файлдарды интернетсіз шифрлап, ашуға көмектеседі. Файл таңдаңыз, құпиясөз енгізіңіз және .cryptcat файлын сақтаңыз. Ескі .crypt3 файлдарын да ашуға болады. Файлдар мен құпиясөздер осы құрылғыда қалады. Құпиясөзді сақтаңыз; жоғалған құпиясөз қалпына келмейді.', 'шифрлау,офлайн,файл,құпиялылық,құпиясөз'),
  km: t('ឆ្មាគ្រីបតូ', 'អ៊ិនគ្រីបឯកសារអុហ្វឡាញ', 'អ៊ិនគ្រីប និងបើកឯកសារដោយមិនចាំបាច់មានអ៊ីនធឺណិត។ ឯកសារ និងពាក្យសម្ងាត់នៅលើឧបករណ៍។', 'ឆ្មាគ្រីបតូជួយអ៊ិនគ្រីប និងបើកឯកសារដោយមិនចាំបាច់មានអ៊ីនធឺណិតលើទូរស័ព្ទ ឬថេប្លេត។ ជ្រើសឯកសារ បញ្ចូលពាក្យសម្ងាត់ ហើយរក្សាទុកជា .cryptcat។ ឯកសារ .crypt3 ចាស់ក៏នៅតែអាចបើកបាន។ សូមរក្សាពាក្យសម្ងាត់ឱ្យល្អ ព្រោះបើបាត់មិនអាចយកមកវិញបានទេ។', 'អ៊ិនគ្រីប,អុហ្វឡាញ,ឯកសារ,ឯកជនភាព,ពាក្យសម្ងាត់'),
  ky: t('КриптоМышык', 'Офлайн файл шифрлөө', 'Файлдарды интернетсиз шифрлеп жана ачыңыз. Файлдар менен сырсөздөр түзмөктө калат.', 'КриптоМышык телефондо же планшетте файлдарды интернетсиз шифрлеп жана ачууга жардам берет. Файл тандап, сырсөз киргизип, .cryptcat файлын сактаңыз. Эски .crypt3 файлдары да ачылат. Файлдар менен сырсөздөр ушул түзмөктө калат. Сырсөздү сактаңыз; жоголгон сырсөз калыбына келбейт.', 'шифрлөө,офлайн,файл,купуялык,сырсөз'),
  lo: t('ແມວຄຣິບໂຕ', 'ເຂົ້າລະຫັດໄຟລ໌ອອບລາຍ', 'ເຂົ້າລະຫັດ ແລະ ເປີດໄຟລ໌ໂດຍບໍ່ໃຊ້ອິນເຕີເນັດ. ໄຟລ໌ ແລະ ລະຫັດຜ່ານຢູ່ໃນອຸປະກອນ.', 'ແມວຄຣິບໂຕຊ່ວຍເຂົ້າລະຫັດ ແລະ ເປີດໄຟລ໌ໂດຍບໍ່ໃຊ້ອິນເຕີເນັດໃນໂທລະສັບ ຫຼື ແທັບເລັດ. ເລືອກໄຟລ໌, ໃສ່ລະຫັດຜ່ານ ແລະ ບັນທຶກເປັນ .cryptcat. ໄຟລ໌ .crypt3 ເກົ່າຍັງເປີດໄດ້. ເກັບລະຫັດຜ່ານໃຫ້ດີ; ຖ້າຫາຍແລ້ວກູ້ຄືນບໍ່ໄດ້.', 'ເຂົ້າລະຫັດ,ອອບລາຍ,ໄຟລ໌,ຄວາມສ່ວນຕົວ,ລະຫັດຜ່ານ'),
  lv: t('KriptoKaķis', 'Bezsaistes failu šifrēšana', 'Šifrē un atver failus bez interneta. Faili un paroles paliek ierīcē.', 'KriptoKaķis palīdz šifrēt un atvērt failus bez interneta telefonā vai planšetē. Izvēlieties failu, ievadiet paroli un saglabājiet .cryptcat failu. Vecos .crypt3 failus joprojām var atvērt. Faili un paroles paliek šajā ierīcē. Glabājiet paroli droši; pazaudētu paroli nevar atgūt.', 'šifrēšana,bezsaiste,fails,privātums,parole'),
  lt: t('KriptoKatė', 'Failų šifravimas be interneto', 'Šifruokite ir atverkite failus be interneto. Failai ir slaptažodžiai lieka įrenginyje.', 'KriptoKatė padeda šifruoti ir atverti failus be interneto telefone ar planšetėje. Pasirinkite failą, įveskite slaptažodį ir išsaugokite .cryptcat failą. Senus .crypt3 failus vis dar galima atverti. Failai ir slaptažodžiai lieka šiame įrenginyje. Saugokite slaptažodį; prarasto slaptažodžio atkurti negalima.', 'šifravimas,be interneto,failas,privatumas,slaptažodis'),
  mk: t('КриптоМачка', 'Офлајн шифрирање', 'Шифрирајте и отворајте датотеки без интернет. Датотеките и лозинките остануваат на уредот.', 'КриптоМачка помага да шифрирате и отворате датотеки без интернет на телефон или таблет. Изберете датотека, внесете лозинка и зачувајте .cryptcat датотека. Старите .crypt3 датотеки сè уште може да се отворат. Датотеките и лозинките остануваат на овој уред. Чувајте ја лозинката; изгубена лозинка не може да се врати.', 'шифрирање,офлајн,датотека,приватност,лозинка'),
  mn: t('КриптоМуур', 'Офлайн файл шифрлэлт', 'Интернетгүйгээр файл шифрлэж, нээнэ. Файл ба нууц үг төхөөрөмж дээр үлдэнэ.', 'КриптоМуур нь утас эсвэл таблет дээр интернетгүйгээр файл шифрлэж, нээхэд тусална. Файл сонгоод, нууц үг оруулж, .cryptcat файл болгон хадгална. Хуучин .crypt3 файлуудыг мөн нээж болно. Файл ба нууц үг энэ төхөөрөмж дээр үлдэнэ. Нууц үгээ сайн хадгал; алдсан нууц үгийг сэргээх боломжгүй.', 'шифрлэлт,офлайн,файл,нууцлал,нууц үг'),
  ne: t('क्रिप्टोबिरालो', 'अफलाइन फाइल इन्क्रिप्सन', 'इन्टरनेट बिना फाइल इन्क्रिप्ट र डिक्रिप्ट गर्नुहोस्। फाइल र पासवर्ड उपकरणमै रहन्छन्।', 'क्रिप्टोबिरालोले फोन वा ट्याबलेटमा इन्टरनेट बिना फाइल इन्क्रिप्ट र डिक्रिप्ट गर्न मद्दत गर्छ। फाइल छान्नुहोस्, पासवर्ड दिनुहोस् र .cryptcat फाइल सेभ गर्नुहोस्। पुराना .crypt3 फाइल पनि खुल्छन्। फाइल र पासवर्ड यही उपकरणमा रहन्छन्। पासवर्ड सुरक्षित राख्नुहोस्; हराएको पासवर्ड फिर्ता ल्याउन सकिँदैन।', 'इन्क्रिप्सन,अफलाइन,फाइल,गोपनीयता,पासवर्ड'),
  fa: t('گربه‌رمز', 'رمزگذاری آفلاین فایل', 'فایل‌ها را بدون اینترنت رمزگذاری و باز کنید. فایل‌ها و گذرواژه‌ها روی دستگاه می‌مانند.', 'گربه‌رمز به شما کمک می‌کند فایل‌ها را روی گوشی یا تبلت بدون اینترنت رمزگذاری و باز کنید. یک فایل انتخاب کنید، گذرواژه وارد کنید و فایل .cryptcat ذخیره کنید. فایل‌های قدیمی .crypt3 هم باز می‌شوند. فایل‌ها و گذرواژه‌ها روی همین دستگاه می‌مانند. گذرواژه را امن نگه دارید؛ گذرواژه گم‌شده قابل بازیابی نیست.', 'رمزگذاری,آفلاین,فایل,حریم خصوصی,گذرواژه'),
  rm: t('CryptCat', 'Criptaziun da datotecas offline', 'Criptescha e decriptescha datotecas senza internet. Datotecas e pleds-clav restan sin tes apparat.', 'CryptCat gida a criptar e decriptar datotecas senza internet sin telefon u tablet. Tscherna ina datoteca, endatescha in pled-clav e memorisescha ina datoteca .cryptcat. Datotecas veglias .crypt3 pon anc vegnir avertas. Datotecas e pleds-clav restan sin quest apparat. Tegna bain tes pled-clav; in pled-clav pers na po betg vegnir restaurà.', 'criptaziun,offline,datoteca,privacitad,pled-clav'),
  sr: t('КриптоМачка', 'Офлајн шифровање', 'Шифрујте и отварајте датотеке без интернета. Датотеке и лозинке остају на уређају.', 'КриптоМачка помаже да шифрујете и отварате датотеке без интернета на телефону или таблету. Изаберите датотеку, унесите лозинку и сачувајте .cryptcat датотеку. Старе .crypt3 датотеке и даље могу да се отворе. Датотеке и лозинке остају на овом уређају. Чувајте лозинку; изгубљена лозинка не може да се врати.', 'шифровање,офлајн,датотека,приватност,лозинка'),
  si: t('ක්‍රිප්ටෝබළලා', 'නොබැඳි ගොනු සංකේතනය', 'අන්තර්ජාලය නැතිව ගොනු සංකේතනය කර විවෘත කරන්න. ගොනු සහ මුරපද උපාංගයේම තබාගනී.', 'ක්‍රිප්ටෝබළලා දුරකථනයේ හෝ ටැබ්ලටයේ අන්තර්ජාලය නැතිව ගොනු සංකේතනය කර විවෘත කිරීමට උදව් කරයි. ගොනුවක් තෝරන්න, මුරපදය ඇතුළත් කරන්න, .cryptcat ගොනුවක් ලෙස සුරකින්න. පැරණි .crypt3 ගොනුද විවෘත කළ හැක. මුරපදය ආරක්ෂිතව තබන්න; නැතිවූ මුරපදය නැවත ලබාගත නොහැක.', 'සංකේතනය,නොබැඳි,ගොනුව,පෞද්ගලිකත්වය,මුරපදය'),
  sw: t('PakaKripto', 'Usimbaji faili bila intaneti', 'Simba na fungua faili bila intaneti. Faili na nywila hubaki kwenye kifaa chako.', 'PakaKripto husaidia kusimba na kufungua faili bila intaneti kwenye simu au tableti. Chagua faili, weka nywila na hifadhi faili la .cryptcat. Faili za zamani .crypt3 bado zinaweza kufunguliwa. Faili na nywila hubaki kwenye kifaa hiki. Hifadhi nywila yako vizuri; nywila iliyopotea haiwezi kurejeshwa.', 'usimbaji,oflaini,faili,faragha,nywila')
};

function t(title, subtitle, shortDescription, fullDescription, keywords) {
  return {
    title,
    subtitle,
    promotionalText: shortDescription,
    shortDescription,
    fullDescription,
    keywords,
    whatsNew: shortDescription
  };
}

function loadAppLocaleCodes() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const rel of ['www/js/locales.js', 'www/js/locales-extra.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), ctx, { filename: rel });
  }
  return ctx.window.CRYPT3_LOCALES.list.map(loc => loc.code);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(file, value) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function csvCell(value) {
  return '"' + String(value).replace(/"/g, '""').replace(/\r?\n/g, '\\n') + '"';
}

function toCsv(rows) {
  const headers = Object.keys(rows[0]);
  return headers.join(',') + '\n' + rows.map(row => headers.map(h => csvCell(row[h] ?? '')).join(',')).join('\n') + '\n';
}

function listing(platform, locale, languageName, key) {
  const data = text[key];
  if (!data) throw new Error(`missing store listing text for ${key} (${locale})`);
  const shortDescription = platform === 'google-play' ? data.subtitle : data.shortDescription;
  const base = {
    platform,
    locale,
    languageName,
    title: data.title,
    subtitle: data.subtitle,
    shortDescription,
    promotionalText: data.promotionalText,
    fullDescription: data.fullDescription,
    keywords: data.keywords,
    whatsNew: shortDescription,
    supportUrl: urls.support,
    marketingUrl: urls.marketing,
    privacyPolicyUrl: urls.privacy,
    compliance: {
      noAccounts: true,
      noAds: true,
      noAnalytics: true,
      noInternetRequiredForCoreCrypto: true,
      noPasswordRecoveryClaim: true,
      nativeSpeakerLegalReviewRecommended: true
    }
  };
  if (platform === 'app-store') {
    return {
      ...base,
      appName: data.title,
      appStoreCategory: 'Utilities',
      appStoreSecondaryCategory: 'Productivity'
    };
  }
  return {
    ...base,
    googlePlayTitle: data.title
  };
}

function writeListings(platform, locales) {
  const rows = [];
  for (const [locale, languageName, key] of locales) {
    const data = listing(platform, locale, languageName, key);
    const dir = platform === 'app-store' ? 'app-store' : 'google-play';
    writeJson(path.join(outRoot, dir, locale, 'metadata.json'), data);
    rows.push({
      locale,
      languageName,
      title: data.title,
      subtitle: data.subtitle,
      shortDescription: data.shortDescription,
      promotionalText: data.promotionalText,
      keywords: data.keywords,
      whatsNew: data.whatsNew,
      fullDescription: data.fullDescription,
      supportUrl: data.supportUrl,
      marketingUrl: data.marketingUrl,
      privacyPolicyUrl: data.privacyPolicyUrl
    });
  }
  const dir = platform === 'app-store' ? 'app-store' : 'google-play';
  fs.writeFileSync(path.join(outRoot, dir, 'all-localizations.csv'), toCsv(rows));
}

function main() {
  ensureDir(outRoot);
  writeListings('app-store', appleLocales);
  writeListings('google-play', googleLocales);

  const appLocales = loadAppLocaleCodes();
  const storeKeys = new Set([...appleLocales, ...googleLocales].map(([, , key]) => key));
  const appOnly = appLocales.filter(code => {
    if (storeKeys.has(code)) return false;
    if (code === 'zh-Hans' || code === 'zh-Hant') return false;
    return true;
  });

  writeJson(path.join(outRoot, 'manifest.json'), {
    generatedAt: new Date().toISOString(),
    appName: 'CryptCat',
    sourceOfTruth: {
      appStoreLocalizations: 'https://developer.apple.com/help/app-store-connect/reference/app-information/app-store-localizations',
      googlePlayLocalizations: 'https://support.google.com/googleplay/android-developer/answer/9844778'
    },
    counts: {
      appStoreLocales: appleLocales.length,
      googlePlayLocales: googleLocales.length,
      appInterfaceLocales: appLocales.length,
      appOnlyLocales: appOnly.length
    },
    appStoreLocales: appleLocales.map(([locale, languageName]) => ({ locale, languageName })),
    googlePlayLocales: googleLocales.map(([locale, languageName]) => ({ locale, languageName })),
    appOnlyLocales: appOnly,
    policy: {
      storeOfficialLanguagesAreLocalized: true,
      unsupportedStoreLanguagesRemainInAppOnly: true,
      nativeReviewRecommendedBeforeSubmission: true
    }
  });

  fs.writeFileSync(path.join(outRoot, 'README.md'), `# CryptCat Store Listing Localizations

Prepared for future App Store Connect and Google Play Console submission.

## Scope

- App Store metadata: ${appleLocales.length} official App Store localization entries.
- Google Play metadata: ${googleLocales.length} official Play Console store listing language entries.
- In-app interface: ${appLocales.length} locales remain in the app bundle.

## Files

- \`app-store/<locale>/metadata.json\`: App Store Connect fields.
- \`app-store/all-localizations.csv\`: spreadsheet-friendly App Store fields.
- \`google-play/<locale>/metadata.json\`: Google Play store listing fields.
- \`google-play/all-localizations.csv\`: spreadsheet-friendly Google Play fields.
- \`manifest.json\`: counts, official source URLs, and app-only locale coverage.

## Production Notes

- These files are metadata drafts for store consoles; they do not change app runtime behavior.
- Before final submission, run native speaker/legal review for the languages that will be published.
- Do not add claims such as "unbreakable", "military grade", or "guaranteed secure".
- Keep the privacy promise aligned with the app: no account, no ads, no analytics, and no internet required for core encryption/decryption.
- Screenshots should be localized separately in App Store Connect and Play Console when practical.

## Official References

- Apple App Store localizations: https://developer.apple.com/help/app-store-connect/reference/app-information/app-store-localizations
- Google Play translations: https://support.google.com/googleplay/android-developer/answer/9844778
`);

  console.log(`Generated ${appleLocales.length} App Store and ${googleLocales.length} Google Play store listing localizations.`);
}

main();
