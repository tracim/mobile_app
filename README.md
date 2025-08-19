<img src="./src/branding/logo.png" alt="Tracim's logo" width="250">
<br /><br /><br />




#### Disclaimer
Doc written for react-native 0.70.4. Not everything has been tested now app is using react-native 0.80.2.


# Tracim's mobile app

Tracim is an [open source](https://github.com/tracim/tracim) software designed to help you and your team to a better collaboration.

Any questions, remarks? Reach us on [Tracim Community](https://public-community.tracim.fr/). <br />
More information on our [website](https://www.tracim.fr).

The **Tracim's mobile app** allows you to access multiple Tracim servers quickly and easily.


## Setting up the development environment

Tracim's mobile app uses [React Native CLI](https://reactnative.dev/docs/environment-setup) and supports Android and iOS.

### Android development

Requirements:
- [Android Studio](https://developer.android.com/studio)
  - requires Android Studio 2025+
- [Node](https://nodejs.org/en/download/package-manager/)
  - requires node 22+
- [Java Development Kit](http://openjdk.java.net/)
  - requires java 17

Install dependencies:
```bash
npm install
```

### iOS development

Requirements:
- Node & Watchman (you can use [Homebrew](http://brew.sh/) to install)
- Ruby 2.7.6 (you can use a [Ruby version manager](https://github.com/rbenv/rbenv) if you only want to change the version on this project)
- [Bundler](https://bundler.io/) to install Cocoapods
- [Xcode](https://apps.apple.com/fr/app/xcode/id497799835)

Install dependencies:
```bash
npx pod-install ios
```

or

```bash
cd ios
pod install
```


## Setup devices

You will need to setup a device to test the application. You can use a real device or an emulator.

See the [React Native documentation](https://reactnative.dev/docs/running-on-device) for more information.


## Running the application

Metro takes in an entry file and various options, and returns a single JavaScript file that includes all your code and
its dependencies. — [Metro Docs](https://facebook.github.io/metro/docs/concepts)

Start Metro:
```bash
npx react-native start
```

In another terminal, run the app:
```
npx react-native run-android
```

or

```
npx react-native run-ios
```


## Contributing

### Bugs and feature requests

If the bug you have found or the feature you want is directly in Tracim itself, you can create an issue in the [Tracim repository](https://github.com/tracim/tracim/issues).

If the bug or feature is application specific, i.e., related to features that you do not find using Tracim in a browser mode, you can submit your issue in [this repository](https://github.com/tracim/mobile_app/issues).

### Coding

You can also [review the code and propose changes](https://github.com/tracim/mobile_app/pulls).

For more information, see the [Contributing](https://github.com/tracim/mobile_app/blob/main/CONTRIBUTING.md) page.


## License

To know about Tracim's License, see [LICENSE.md](https://github.com/tracim/tracim/blob/develop/LICENSE.md).


## Troubleshooting

### react-native: not found
Sometimes after pulling the latest developments and trying to run `npx react-native start` the following error appears:
```
> tracim_mobile_app@0.0.1 start
> react-native start

sh: 1: react-native: not found
```
To fix this, re-run the `npm install` command.

### Cache clean and rebuild

```bash
npx react-native start --reset-cache
```
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### [Android] Open react native dev tools

```bash
adb shell input keyevent 82
```

### [Android] Check your environment setup

```bash
npx react-native doctor
```
- Adb: requires ANDROID_HOME correct
- JDK: requires JAVA_HOME correct
- Android Studio: if not ok, install it in /opt/ works. Or create a symlink
- Android SDK, if Versions found: N/A
  - android studio > tools > sdk manager > sdk tools (tab) > check "android sdk command line tool (latest)"

### [Android] SDK location not found

- Go to `mobile_app/android/`
- Create a file called `local.properties` and for the content you paste your Android SDK path:
  - in Windows `sdk.dir = C:\\Users\\<USERNAME>\\AppData\\Local\\Android\\sdk`
  - in MacOS `sdk.dir = /Users/<USERNAME>/Library/Android/sdk`
  - in Linux `sdk.dir = /home/<USERNAME>/Android/Sdk`

### [Android] BUILD FAILED when run-android

A build can fail for several reasons, if your error is the same as below, you probably have an old version of the application installed on your phone/simulator. Uninstall the old version and relaunch the command.

```
error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup.
Error: Command failed: ./gradlew app:installDebug -PreactNativeDevServerPort=8081
```

### [android] Missing ANDROID_HOME or JAVA_HOME or adb
You might need to run:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64/
```

### [android] Update your javac version
javac is the java compiler for the SDK. To select javac version from the already installed ones:

```bash
update-alternatives --config javac
```

### [iOS] No such module found
You probably opened `xcodeproj` instead of `xcworkspace`. You should always open on Xcode th file `mobile_app/ios/mobile_app.xcworkspace`.
