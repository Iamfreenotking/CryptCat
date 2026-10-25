# CryptCat en langage simple

CryptCat chiffre et déchiffre les fichiers directement sur l’appareil : photos, vidéos, audio, PDF, TXT, ZIP et autres fichiers.

Choisissez un fichier, saisissez le mot de passe, confirmez-le, puis appuyez sur « Chiffrer et enregistrer ». Le format v2 crée un fichier `.cryptcat`. Pour déchiffrer, choisissez le fichier, saisissez le même mot de passe et appuyez sur « Déchiffrer et enregistrer ». Les anciens fichiers `.crypt3` sont reconnus automatiquement.

Le format v2 utilise Argon2id ou scrypt pour dériver une clé de 256 bits, puis XChaCha20-Poly1305 ou AES-256-GCM pour chiffrer et vérifier les données. L’ancien chemin AES-256-CBC reste présent pour la compatibilité.

La version Web est statique et fonctionne hors ligne. Servez le contenu de `www/` avec OpenResty, Nginx ou Apache. Test local : `cd www && python3 -m http.server 8080`.

