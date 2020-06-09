# React Native Quick Tips

## Running in a Native Emulator

### iOS

-   Open the `/ios/AllSocialMobile.xcworkspace` file in Xcode
-   After opening the project in XCode, select the desired iOS simulator on top left corder of the screen
-   Press the play button (triangle) to launch the app on a simulator

### Android

-   Open the `/android` folder using Android Studio's "Open and existing Android Studio project" option
-   Follow Android Studio's [official guide](https://developer.android.com/studio/run/managing-avds.html#createavd) on creating a Android virtual device if you haven't create one yet
-   Press the play button (triangle) on Android Studio's main screen to launch the app on a virtual device

## Running on Device

-   [iOS Guide](https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-ios-devices)
-   [Android Guide](https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-ios-devices)

## Opening the Debug Menu

-   **iOS** - CMD + D
-   **Android** - CMD + M

## Reload

-   **iOS** - CMD + R
-   **Android** - Double tap R on your keyboard

## App Icons

-   Generate the Icons with [this](https://makeappicon.com/) or [this](https://appicon.co/)
    -   **iOS** - Place the contents into: `/ios/AllSocialMobile/Images.xcassets/AppIcon.appiconset`
    -   **Android** - Place the contents into: `/android/app/src/main/res/mipmap-*/ic_launcher.png`

## Custom Icon Fonts

-   Generate the Font by importing the SVGs [here](https://icomoon.io/app/#/select)
-   Select "Generate Font"
-   Click the gear icon and configure the font class settings desired
-   Click "Download"
-   Unzip and place the `.ttf` file in the `src/res/fonts` folder
    <!-- - Run `react-native link` and the font file should be added to the Android and iOS projects -->
-   Add the `.json` file from the unzipped folder to the `src/res/custom` folder
-   Use custom icon from font as follows:

```javascript
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "src/constants/custom/config.json";
import { registerCustomIconType } from "react-native-elements";

const CustomIconSet = createIconSetFromIcoMoon(icoMoonConfig);
registerCustomIconType("custom", CustomIconSet);
```

### [Go Back To Home Page](./../README.md)
