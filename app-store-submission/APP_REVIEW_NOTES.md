# App Review Notes

Prepared date: 2026-06-25

## Review Contact

Contact:
Use your Apple Developer account contact name and email.

Phone:
Use your Apple Developer account phone number.

## Demo Account

Demo account required:
No

Reason:
The app has no login, account system, paid content, or server-side feature gate.

## Reviewer Instructions

CryptCat is an offline file encryption and decryption utility.

Suggested test steps:
1. Launch the app.
2. Turn off network access if desired; the core encryption and decryption flow still works offline.
3. Tap Encrypt.
4. Select any small test file from Files, Photos, or a shared document provider.
5. Enter the same password twice.
6. Tap Encrypt & Save.
7. Save or share the generated `.crypt3` file.
8. Tap Decrypt.
9. Select the generated `.crypt3` file.
10. Enter the same password.
11. Tap Decrypt & Save.
12. Confirm that the original file is restored.

No external API, cloud storage, account, analytics, ads, or internet connection is required for the core workflow.

## Export Compliance Note

This app uses encryption for local file encryption/decryption. It should not be submitted as a non-encryption app. Complete Apple's export compliance questionnaire truthfully in App Store Connect and upload documentation if Apple requests it.

## Privacy Note

The app does not collect user data. User-selected files, photos, videos, documents, passwords, keys, and outputs stay on the user's device unless the user manually saves or shares a file through iOS system controls.

## Known Device Support

The current iOS target supports iPhone and iPad. Because the Xcode target includes iPad support, App Store Connect requires iPad screenshots in addition to iPhone screenshots.

## Build Verification

Latest local verification completed:
- iPhone 16 Pro Max Simulator: build and launch succeeded.
- iPad Pro 13-inch Simulator: build and launch succeeded.
- Generated native screenshots at Apple-required sizes.

Android production build is still blocked locally because no Java Runtime/JDK is installed on this Mac.
