# CryptCat آسان زبان میں

CryptCat فائلوں کو آپ کے اپنے ڈیوائس پر encrypt اور decrypt کرتا ہے، جیسے تصاویر، ویڈیوز، آڈیو، PDF، TXT اور ZIP۔

فائل منتخب کریں، پاس ورڈ لکھیں، دوبارہ تصدیق کریں، پھر “Encrypt and save” دبائیں۔ v2 `.cryptcat` فائل بناتا ہے۔ decrypt کرنے کے لیے وہی پاس ورڈ لکھیں۔ پرانی `.crypt3` فائل خودکار طور پر پہچانی جاتی ہے۔

v2 پاس ورڈ سے 256-bit key بنانے کے لیے Argon2id یا scrypt، اور فائل کو encrypt اور چیک کرنے کے لیے XChaCha20-Poly1305 یا AES-256-GCM استعمال کرتا ہے۔ پرانی فائلوں کے لیے AES-256-CBC کی compatibility برقرار ہے۔

Web ورژن offline چلتا ہے۔ `www/` کا مواد OpenResty، Nginx یا Apache پر رکھیں۔ مقامی جانچ کے لیے `cd www && python3 -m http.server 8080` چلائیں۔

