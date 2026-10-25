# Crypt3 Production Test Matrix

Date baseline: 2026-06-23.

## Source Basis

- Publicly reported Counterpoint 2025 global Top 10 models are treated as mandatory matrix entries.
- Publicly reported Counterpoint Q3 2025 Top 10 models are also mandatory entries.
- The remaining slots are practical active-fleet coverage across iPhone, Samsung Galaxy A/S/Z, Xiaomi/Redmi/POCO, OPPO, vivo, realme, Motorola, Google Pixel, and OnePlus.
- A verified public global Top 50 by active installed-base model was not available from open sources during this pass. If paid Counterpoint/IDC/Canalys/DeviceAtlas Top 50 data is obtained, update `scripts/test-device-matrix.mjs` and rerun `npm test`.

## Automated Gates

Run:

```sh
npm test
```

The test suite verifies:

- `.crypt3` encrypt/decrypt roundtrip.
- Wrong-password failure handling.
- 100 locale detection and complete translation bundles.
- Native iOS/Android locale priority over WebView/browser English.
- 50 target device profiles with unique model names.
- Mandatory public Top 10 model inclusion.
- iOS 16.4+ compatibility gate for CompressionStream/DecompressionStream.
- Android API 24+ project gate and Chromium/WebView 112+ target.
- Compact, standard, large, and foldable phone viewport coverage.
- 50 high-priority locales exercised across the device matrix.
- 100-language registry and title coverage verified in the locale gate.
- Offline release gate verifies CSP `connect-src 'none'`, no Android `INTERNET` permission, no network APIs, no embedded API keys, and synced Web/Android public assets.

## Manual / Cloud Device Gates

Before App Store / production release, run the same build on a real-device cloud:

- iOS: Xcode Cloud or TestFlight internal/external testers.
- Android: Firebase Test Lab, BrowserStack, or equivalent real-device grid.

For each device, test:

- First launch locale auto-detection.
- Manual language switching and persistence.
- RTL layout for Arabic, Urdu, Persian, Pashto, Sindhi, and Hebrew.
- Photo/video/PDF/TXT/ZIP encryption.
- `.crypt3` decryption and wrong-password failure.
- Offline mode with Wi-Fi and cellular disabled.
- Share sheet / Save to Files behavior.
- App cold start, background/foreground, and low-memory recovery.
- No network calls during core workflows.
