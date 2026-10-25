# CryptCat Store Listing Localizations

Prepared for future App Store Connect and Google Play Console submission.

## Scope

- App Store metadata: 50 official App Store localization entries.
- Google Play metadata: 86 official Play Console store listing language entries.
- In-app interface: 100 locales remain in the app bundle.

## Files

- `app-store/<locale>/metadata.json`: App Store Connect fields.
- `app-store/all-localizations.csv`: spreadsheet-friendly App Store fields.
- `google-play/<locale>/metadata.json`: Google Play store listing fields.
- `google-play/all-localizations.csv`: spreadsheet-friendly Google Play fields.
- `manifest.json`: counts, official source URLs, and app-only locale coverage.

## Production Notes

- These files are metadata drafts for store consoles; they do not change app runtime behavior.
- Before final submission, run native speaker/legal review for the languages that will be published.
- Do not add claims such as "unbreakable", "military grade", or "guaranteed secure".
- Keep the privacy promise aligned with the app: no account, no ads, no analytics, and no internet required for core encryption/decryption.
- Screenshots should be localized separately in App Store Connect and Play Console when practical.

## Official References

- Apple App Store localizations: https://developer.apple.com/help/app-store-connect/reference/app-information/app-store-localizations
- Google Play translations: https://support.google.com/googleplay/android-developer/answer/9844778
