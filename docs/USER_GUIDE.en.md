# CryptCat visual step-by-step guide

This guide covers the Web app. Files and passwords are processed on your device. Normal encryption and decryption do not need an account or an internet connection.

## Encrypt a file

### Step 1: Choose a file

Open the page and click **Choose file**. Select a photo, video, audio file, PDF, TXT file, ZIP archive, or another file. The page shows the selected name and size.

![Step 1: choose a file](images/web-step-1-select-file.png)

### Step 2: Enter and confirm the password

Enter a password in **Encryption password**. Enter the same password again in **Confirm password**. Continue only when the page says the passwords match. If it says they do not match, correct the second entry.

![Step 2: enter and confirm the password](images/web-step-2-password.png)

### Step 3: Encrypt and save

Click **Encrypt and save**. The browser saves a new file ending in `.cryptcat`. Do not close or refresh the page until saving finishes.

![Step 3: encrypt and save](images/web-step-3-encrypt.png)

## Decrypt a file

### Step 4: Choose the encrypted file

Open **Decrypt**, click **Choose encrypted file**, and select the `.cryptcat` file. Older `.crypt3` files are also supported and are detected automatically.

### Step 5: Enter the decryption password

Enter the original password in **Decryption password**. A wrong password must fail. The app must not treat a failed attempt as a recovered file.

### Step 6: Decrypt and save

Click **Decrypt and save**. Open the restored file and check that its contents are correct before deleting any original or encrypted copy.

## Safety notes

- If you lose the password, CryptCat cannot recover the file.
- Do not put passwords, API keys, signing keys, or private files in GitHub issues.
- The v2 format is `.cryptcat`; legacy `.crypt3` files remain readable.

## Offline check

Disconnect the network, open the page, and repeat the six steps. The normal Web workflow should still work.
