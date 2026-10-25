# CryptCat 简明说明

CryptCat 在设备本地加密和解密文件。照片、视频、音频、PDF、TXT、ZIP 等文件都可以选择。

## 使用步骤

1. 选择文件。
2. 输入加密密码。
3. 再输入一次密码确认。
4. 点击“加密并保存”。
5. v2 会生成 `.cryptcat` 文件。

解密时选择 `.cryptcat` 文件，输入原密码，再点击“解密并保存”。旧的 `.crypt3` 文件会自动识别并走兼容流程。

## 加密算法

v2 使用带版本号的文件头。Argon2id 或 scrypt 把密码派生为 256 位密钥；XChaCha20-Poly1305 或 AES-256-GCM 同时加密和校验数据，密码错误或文件被改动时会拒绝解密。旧版 `.crypt3` 继续使用 AES-256-CBC 和 OpenSSL 兼容的旧密码派生方式。

新文件建议使用 v2。密码仍然很重要，不要使用太短或常见的密码。

## 离线部署

网页端是静态文件。把 `www/` 目录内容放到 OpenResty、Nginx、Apache，或本地 HTTP 服务即可。加密和解密不需要 PHP、MySQL、Gemini key 或互联网。

本机测试：`cd www && python3 -m http.server 8080`，然后打开 `http://127.0.0.1:8080/`。

