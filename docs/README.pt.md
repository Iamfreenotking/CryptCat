# CryptCat em linguagem simples

O CryptCat cifra e decifra arquivos diretamente no dispositivo: fotos, vídeos, áudio, PDF, TXT, ZIP e outros formatos.

Escolha um arquivo, digite a senha, confirme a senha e toque em “Cifrar e salvar”. O v2 cria um arquivo `.cryptcat`. Para decifrar, escolha o arquivo, digite a mesma senha e toque em “Decifrar e salvar”. Arquivos antigos `.crypt3` são reconhecidos automaticamente.

O v2 usa Argon2id ou scrypt para criar uma chave de 256 bits e XChaCha20-Poly1305 ou AES-256-GCM para cifrar e verificar os dados. O caminho antigo AES-256-CBC continua disponível para compatibilidade.

A versão Web é estática e funciona sem internet. Publique o conteúdo de `www/` no OpenResty, Nginx ou Apache. Para testar localmente: `cd www && python3 -m http.server 8080`.

