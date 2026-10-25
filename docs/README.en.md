# CryptCat in plain English

CryptCat encrypts and decrypts files directly on your device. It can handle photos, videos, audio, PDFs, text files, ZIP files, and other file types supported by the device picker.

## How to use it

1. Choose a file.
2. Enter an encryption password.
3. Confirm the password.
4. Tap **Encrypt and save**.
5. The app creates a `.cryptcat` file in v2 mode.

To decrypt, choose a `.cryptcat` file, enter the same password, and tap **Decrypt and save**. Older `.crypt3` files are detected and opened by the compatibility path.

## What the algorithms mean

The v2 format uses a versioned header. Argon2id or scrypt turns the password into a 256-bit key. XChaCha20-Poly1305 or AES-256-GCM encrypts the data and authenticates it, so accidental changes or a wrong password are rejected. The legacy path remains for old `.crypt3` files and uses AES-256-CBC with OpenSSL-compatible legacy password derivation.

V2 is the recommended format for new files. Password strength still matters. Do not reuse a short or common password.

## Offline and local deployment

The web app is static. Serve the contents of `www/` from OpenResty, Nginx, Apache, or a local HTTP server. No PHP, MySQL, Gemini key, or internet connection is required for encryption and decryption.

For a local test: `cd www && python3 -m http.server 8080`, then open `http://127.0.0.1:8080/`.

## Screenshots

The repository contains real test screenshots under `app-store-submission/screenshots/` and `google-play-submission/screenshots/`. They show file selection, encryption, decryption, password matching, tablets, and Android profiles.

