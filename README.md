# CryptCat

<p align="center">
  <img src="www/cryptcat-logo.png" alt="CryptCat icon" width="220">
</p>

Offline file encryption and decryption for the Web.

CryptCat works on the device. The normal encryption and decryption flow does not need an account, a server, or an internet connection. Pick a file, enter a password, and save the encrypted result.

<p align="center">
  <a href="https://bullbullgo.com/cryptcat/"><strong>Open the CryptCat Web Demo</strong></a>
</p>

## Read this in your language

Choose the README that is easiest for you:

1. [English](docs/README.en.md)
2. [中文（简体）](docs/README.zh-Hans.md)
3. [हिन्दी](docs/README.hi.md)
4. [Español](docs/README.es.md)
5. [Français](docs/README.fr.md)
6. [العربية](docs/README.ar.md)
7. [বাংলা](docs/README.bn.md)
8. [Português](docs/README.pt.md)
9. [Русский](docs/README.ru.md)
10. [اردو](docs/README.ur.md)

## Project layout

- `www/`: the complete offline Web application, UI, translations, legacy crypto, v2 crypto, and bundled libsodium.
- `docs/`: multilingual documentation and the ordered visual Web tutorial.
- `scripts/`: offline test and release-gate scripts.

The public repository intentionally excludes the private iOS and Android source trees. They remain on the developer computer and are not part of this Web repository.

## 图文操作教程（10 种语言）

每份教程都按图片和文字的实际操作顺序编写：选择文件、输入密码、加密保存、选择加密文件、输入解密密码、解密保存。

1. [English tutorial](docs/USER_GUIDE.en.md)
2. [中文（简体）教程](docs/USER_GUIDE.zh-Hans.md)
3. [हिन्दी教程](docs/USER_GUIDE.hi.md)
4. [Guía en español](docs/USER_GUIDE.es.md)
5. [Guide en français](docs/USER_GUIDE.fr.md)
6. [دليل العربية](docs/USER_GUIDE.ar.md)
7. [বাংলা নির্দেশিকা](docs/USER_GUIDE.bn.md)
8. [Guia em português](docs/USER_GUIDE.pt.md)
9. [Руководство на русском](docs/USER_GUIDE.ru.md)
10. [اردو رہنما](docs/USER_GUIDE.ur.md)

每份教程使用相同的三张操作截图，方便用户按图完成操作：

- [第 1 步：选择文件](docs/images/web-step-1-select-file.png)
- [第 2 步：输入并确认密码](docs/images/web-step-2-password.png)
- [第 3 步：加密并保存](docs/images/web-step-3-encrypt.png)

## Important security boundary

CryptCat is local-first, but no software can honestly promise “100% secure” or “unbreakable.” Your password is the key material. If it is lost, the file cannot be recovered by the app. Keep backups of the original files and encrypted files, and never commit passwords, API keys, signing keys, or private user files.

The bundled implementation currently supports:

- Legacy `.crypt3`: OpenSSL-compatible `Salted__` envelope, AES-256-CBC, and the legacy EVP_BytesToKey/MD5 derivation used for compatibility.
- v2 `.cryptcat`: versioned `CRYPTCAT` header with Argon2id or scrypt key derivation, and authenticated encryption using XChaCha20-Poly1305 or AES-256-GCM.
- Automatic format detection: `.cryptcat` uses the v2 path; legacy `.crypt3` remains readable through the compatibility path.

These are implementation descriptions, not a guarantee that every future release or every platform build has identical security properties. Review changes, run the tests, and obtain an independent security review before handling high-value or regulated data.

## Run the Web version offline

No API key is needed.

```sh
cd www
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`. For a file-server deployment, publish the contents of `www/` as a static directory. Do not publish `node_modules/`, mobile source trees, signing files, test output, or local encrypted files.

## Test before publishing

```sh
npm test
npm run test:launcher-built
```

Also test offline launch, wrong-password rejection, correct-password round trips, `.cryptcat` output, legacy `.crypt3` decryption, narrow and wide browser windows, file picker behavior, and refresh/reload behavior. The tutorial images are usage guidance, not a replacement for a clean release test.

## License

MIT. See [LICENSE](LICENSE).

