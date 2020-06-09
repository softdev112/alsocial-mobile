# Code Push

## What is it?

A dynamic update experience for deployed applications

## How to use it?

-   Install appcenter cli
    -   `npm install -g appcenter-cli`
-   Login to appcenter cli
    -   `appcenter login`
-   From within the root of the project you can deploy updates to production apps via these commands:

    -   **Android**: `appcenter codepush release-react -a All-Social/AllSocialMobile-Android -d Production -t 1.0.229`
    -   **iOS**: `appcenter codepush release-react -a All-Social/AllSocialMobile-iOS -d Production -t 1.0.229`

## Uploading Note

`-t x.x.x` is IMPORTANT for pushing updates to a specific app version based on the `versionName` value in the `defaultConfig` of `android/app/build.gradle` and the `CFBundleShortVersionString` value in `ios/AllSocialMobile/Info.plist`. **_TRIPLE CHECK THIS VALUE_** before pushing an update as you could change either an internal testing or production app based on this tag.
