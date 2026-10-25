import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = decodeURIComponent(new URL('..', import.meta.url).pathname);
const locales = ['en', 'zh-Hans', 'hi', 'es', 'fr', 'ar', 'bn', 'pt', 'ru', 'ur'];
const screenshots = [
  'web-step-1-select-file.png',
  'web-step-2-password.png',
  'web-step-3-encrypt.png',
];

for (const locale of locales) {
  const file = join(root, 'docs', `USER_GUIDE.${locale}.md`);
  if (!existsSync(file)) throw new Error(`Missing visual guide: ${file}`);
  const text = readFileSync(file, 'utf8');
  for (const screenshot of screenshots) {
    if (!text.includes(`images/${screenshot}`)) {
      throw new Error(`${file} does not reference ${screenshot}`);
    }
  }
  if (!/encrypt|cifrar|chiffr|criptograf|зашиф|تشفير|এনক্রিপ্ট|एन्क्रिप्ट|خفیہ/i.test(text)) {
    throw new Error(`${file} is missing an encryption step`);
  }
  if (!/decrypt|descifrar|déchiffr|descriptograf|расшифр|فك التشفير|ডিক্রিপ্ট|डिक्रिप्ट|کھول|解密|解码/i.test(text)) {
    throw new Error(`${file} is missing a decryption step`);
  }
}

console.log(`Visual guides passed: ${locales.length} languages, ${screenshots.length} screenshots each`);
