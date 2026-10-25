# CryptCat en palabras sencillas

CryptCat cifra y descifra archivos directamente en tu dispositivo: fotos, vídeos, audio, PDF, TXT, ZIP y otros archivos.

Elige un archivo, escribe la contraseña, confírmala y pulsa “Cifrar y guardar”. El formato v2 crea un archivo `.cryptcat`. Para descifrar, elige el archivo, escribe la misma contraseña y pulsa “Descifrar y guardar”. Los archivos antiguos `.crypt3` se detectan automáticamente.

El formato v2 usa Argon2id o scrypt para derivar una clave de 256 bits y XChaCha20-Poly1305 o AES-256-GCM para cifrar y comprobar los datos. Los archivos antiguos siguen usando AES-256-CBC para mantener la compatibilidad.

La versión web es estática y funciona sin internet. Publica el contenido de `www/` en OpenResty, Nginx o Apache. Para probarla: `cd www && python3 -m http.server 8080`.

