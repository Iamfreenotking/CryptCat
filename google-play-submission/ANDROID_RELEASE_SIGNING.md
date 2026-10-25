# Android Release Signing - CryptCat

Do not commit keystores or passwords to this project.

The Android build now reads release signing values only from local environment variables:

- `CRYPTCAT_UPLOAD_STORE_FILE`
- `CRYPTCAT_UPLOAD_STORE_PASSWORD`
- `CRYPTCAT_UPLOAD_KEY_ALIAS`
- `CRYPTCAT_UPLOAD_KEY_PASSWORD`

## Create A New Upload Keystore

Use this only if you do not already have a Google Play upload keystore for CryptCat.

```sh
mkdir -p "$HOME/.cryptcat-android"
keytool -genkeypair \
  -v \
  -storetype PKCS12 \
  -keystore "$HOME/.cryptcat-android/cryptcat-upload.jks" \
  -alias cryptcat-upload \
  -keyalg RSA \
  -keysize 4096 \
  -validity 10000
```

Choose a strong password and store it in a password manager. Losing this key can block future updates unless Google Play support resets the upload key.

## Build A Signed Release AAB

```sh
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export ANDROID_HOME="/Users/goodday/Library/Android/sdk"
export ANDROID_SDK_ROOT="/Users/goodday/Library/Android/sdk"
export CRYPTCAT_UPLOAD_STORE_FILE="$HOME/.cryptcat-android/cryptcat-upload.jks"
export CRYPTCAT_UPLOAD_STORE_PASSWORD="YOUR_STORE_PASSWORD"
export CRYPTCAT_UPLOAD_KEY_ALIAS="cryptcat-upload"
export CRYPTCAT_UPLOAD_KEY_PASSWORD="YOUR_KEY_PASSWORD"

cd "/Users/goodday/Documents/qurancn/final_fix 2/crypt3-app/android"
./gradlew clean :app:bundleRelease
```

Signed output:

```sh
/Users/goodday/Documents/qurancn/final_fix 2/crypt3-app/android/app/build/outputs/bundle/release/app-release.aab
```

## Verify Signing

```sh
"/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/jarsigner" \
  -verify -verbose -certs \
  "/Users/goodday/Documents/qurancn/final_fix 2/crypt3-app/android/app/build/outputs/bundle/release/app-release.aab"
```

The current unsigned validation build reports `jar is unsigned` because no upload keystore environment variables were provided.

