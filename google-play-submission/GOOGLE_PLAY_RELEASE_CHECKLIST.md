# Google Play Release Checklist - CryptCat

Baseline date: 2026-06-27.

## Completed Locally

- Android project builds on this Mac with Android Studio JBR.
- `compileSdkVersion` is 36.
- `targetSdkVersion` is 36.
- `minSdkVersion` is 24.
- Debug APK builds successfully.
- Release AAB builds successfully.
- Android app label is `CryptCat`.
- Android package name is `com.bullbullgo.crypt3`.
- Android `INTERNET` permission removed.
- Unused Haptics plugin removed, so `VIBRATE` permission is no longer present.
- Web/Android public assets include the 100-language scripts.
- CSP keeps `connect-src 'none'`.
- Static release gate found no network APIs and no embedded API key patterns in the packaged web bundle.

## Commands Already Verified

```sh
npm test
JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
ANDROID_HOME="/Users/goodday/Library/Android/sdk" \
ANDROID_SDK_ROOT="/Users/goodday/Library/Android/sdk" \
./node_modules/.bin/cap sync android
JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" \
ANDROID_HOME="/Users/goodday/Library/Android/sdk" \
ANDROID_SDK_ROOT="/Users/goodday/Library/Android/sdk" \
./gradlew clean :app:assembleDebug :app:bundleRelease
```

Run the Gradle command from:

```sh
/Users/goodday/Documents/qurancn/final_fix 2/crypt3-app/android
```

## Current Local Outputs

- Debug APK: `/Users/goodday/Documents/qurancn/final_fix 2/crypt3-app/android/app/build/outputs/apk/debug/app-debug.apk`
- Release AAB: `/Users/goodday/Documents/qurancn/final_fix 2/crypt3-app/android/app/build/outputs/bundle/release/app-release.aab`

The current release AAB is a build-validation artifact until it is signed with your Google Play upload key.

## Blocking Items Before Upload

- Create or select the Google Play upload keystore.
- Set local signing environment variables.
- Rebuild `:app:bundleRelease`.
- Verify the rebuilt AAB is signed.
- Upload the signed AAB in Google Play Console.
- Upload app icon, feature graphic, phone screenshots, and tablet screenshots.
- Complete Data Safety, Content Rating, App Access, Ads, and Target Audience declarations.
- Publish privacy policy and support pages to stable HTTPS URLs.
- If this is a new personal Google Play developer account, complete Google Play's required closed testing period before production access.

## Manual Device Testing Still Required

- Real Android phone install and first launch.
- Android 13, 14, 15, and 16 smoke testing if devices are available.
- Large-screen / tablet layout smoke testing.
- First-launch Chinese, English, Spanish, French, Russian, Arabic, and Traditional Chinese language detection.
- Encrypt and decrypt: photo, video, audio, PDF, TXT, ZIP.
- Wrong password failure.
- Airplane mode operation.
- Save/share workflow.
- App cold start, background/foreground, rotation, and low-memory recovery.

## Official References

- Target API requirements: https://developer.android.com/google/play/requirements/target-sdk
- Android app signing: https://developer.android.com/studio/publish/app-signing
- Android App Bundle: https://developer.android.com/guide/app-bundle
- Google Play Data safety: https://support.google.com/googleplay/android-developer/answer/10787469
- Google Play closed testing for new personal developer accounts: https://support.google.com/googleplay/android-developer/answer/14151465

