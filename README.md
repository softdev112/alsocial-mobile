# all-social/mobile

All Social mobile app built using React Native

---

## Table of Contents

1. [Features](#features)
1. **Before You Start**
    1. [Getting Started with React Native](/docs/react-native.md)
    1. [React Native Quick Tips](/docs/quick-tips.md)
    1. [Understanding the File Structure](#understanding-the-file-structure)
1. **Using This Project**
    1. [Getting Up and Running](#getting-started)
    1. [Renaming the App](/docs/renaming.md)
    1. [Testing](/docs/testing.md)
    1. [Contributing](/docs/contributing.md)
    1. [Code Push](/docs/code-push.md)

---

## Features

### A Shared React Native Structure

| Feature                                                                                 | Summary                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                                                                                         | **Framework**                                                                                                                                                                                                                                    |
| [React Native](https://facebook.github.io/react-native/docs/getting-started)            | This contains structured 'business logic' (_i.e. actions, containers, reducers, constants, themes_) across the iOS/Android platforms, whilst allowing flexibility in View components to ensure the project looks and feels native on each device |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         | **Flux architecture**                                                                                                                                                                                                                            |
| [Redux](https://redux.js.org/introduction/getting-started)                              | A predictable state container - Helping you write applications that behave consistently and run in different environments                                                                                                                        |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         | **Data Caching / Offline**                                                                                                                                                                                                                       |
| [Redux Persist](https://github.com/rt2zz/redux-persist)                                 | Persist store data using AsyncStorage for native mobile                                                                                                                                                                                          |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         | **UI Toolkit/s**                                                                                                                                                                                                                                 |
| [React Native Elements](https://react-native-training.github.io/react-native-elements/) | Cross Platform React Native UI Toolkit                                                                                                                                                                                                           |
| [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)       | Easily use icons from a wide range of icon libraries, it's as simple as importing the icon font and then `<Icon name={'ios-alert-outline'} size={50} color={"#CCC"} />`                                                                          |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         |                                                                                                                                                                                                                                                  |
|                                                                                         | **Style**                                                                                                                                                                                                                                        |
| [ESLint Linting](https://eslint.org/)                                                   | ESLint linting code style guide                                                                                                                                                                                                                  |
| [Boilerplate](#understanding-the-file-structure)                                        | Directory/file structure for apps                                                                                                                                                                                                                |

---

## Getting Started

### 1. Setup

-   For `node/npm` ensure you use [nvm](https://github.com/creationix/nvm).
    Ensure you've followed the setup manuals for both iOS and Android in [Getting Started with React Native](/docs/react-native.md).
-   Copy `android/app/google-services.development.json` and create new file `android/app/google-services.json`.
-   Copy `ios/GoogleService-Info.development.plist` and create new file `ios/GoogleService-Info.plist`

### 2. Project Control

Run `yarn as` or `npm run as` in the terminal from the root directory `/mobile/` and select a desired option to continue.

#### Option 1: Initialize project

-   Checks to ensure required environment dependencies are present and installs them if not
-   Installs all `package.json` dependencies for React Native
-   Manipulates the Android/iOS projects to successfully build with their project dependencies

#### Option 2: Start package manager

Starts the React Native packager to develop on:

-   [An emulator](/docs/quick-tips.md#running-in-a-native-emulator) for Android and/or iOS
-   [A mobile device](/docs/quick-tips.md#running-on-device) for Android and/or iOS

#### Option 3: Start Android emulator

-   Requires a running Android virtual device from Android Studio. Please refer to [this guide](/docs/quick-tips.md#running-in-a-native-emulator) on creating an Android virtual device.
-   Installs and launches the app on the running virtual device

#### Option 4: Start iOS emulator

-   Prompts the user to select an iOS device to run the app on
-   Responds to an integer corresponding to a device then installs and launches the app on the selected iOS device

#### Option 5: Create a release build for Android or iOS

-   Prompts the user to select either Android or iOS to create a build for
-   Prompts the user to select either Release or Dev for the build type
-   Runs through the build signing process and creates a deployable app

---

## Understanding the File Structure

-   `/android` - The native Android files
-   `/docs` - Extra linked docs
-   `/ios` - The native iOS files
-   `/fastlane` - The native fastlane deployment config
-   `/scripts` - Custom scripts for easier handling of the code
-   `/src` - Contains the source code for both React Native mobile apps
