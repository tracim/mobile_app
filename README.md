<img src="./src/branding/logo.png" alt="Tracim's logo" width="250">
</br>

# Tracim's mobile app

Tracim is an [open source](https://github.com/tracim/tracim) software designed to help you and your team to a better collaboration.

Any questions, remarks? Reach us on [Tracim Community](https://public-community.tracim.fr/). </br>
More informations on our [website](https://www.tracim.fr).

The **Tracim's mobile app** allows you to access multiple Tracim servers quickly and easily.


## Setting up the development environment

Tracim's mobile app uses [React Native CLI](https://reactnative.dev/docs/environment-setup) and supports Android and iOS.

### Android development

First, you will need:
- [Android Studio](https://developer.android.com/studio)
- [Node](https://nodejs.org/en/download/package-manager/)
- [Java Development Kit](http://openjdk.java.net/)
- [Watchman](https://facebook.github.io/watchman/docs/install/#buildinstall)

Then, to install our dependencies you can run:

```bash
npm install
```

### iOS development

First, you will need:
- Node & Watchman (you can use [Homebrew](http://brew.sh/) to install)
- Ruby 2.7.6 (you can use a [Ruby version manager](https://github.com/rbenv/rbenv) if you only want to change the version on this project)
- [Bundler](https://bundler.io/) to install Cocoapods
- [Xcode](https://apps.apple.com/fr/app/xcode/id497799835)

Then, to install our dependencies you can run:

```bash
npx pod-install ios
```

or

```bash
cd ios
pod install
```


## Setuping devices

You will need to setup a device to test the application. You can use a real device or an emulator.

See the [React Native documentation](https://reactnative.dev/docs/running-on-device) for more information.


## Running the application

First, you will need to start Metro, that "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies." — [Metro Docs](https://facebook.github.io/metro/docs/concepts)

```bash
npx react-native start
```

Then, in an other terminal you can run the application using:

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

Too know about Tracim's License, see [LICENSE.md](https://github.com/tracim/tracim/blob/develop/LICENSE.md).


## Troubleshooting

### react-native: not found
Sometimes after pulling the latest developments and trying to run `npx react-native start` the following error appears:
```
> tracim_mobile_app@0.0.1 start
> react-native start

sh: 1: react-native: not found
```
To fix this, re-run the `npm install` command.

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
export ANDROID_HOME=/home/<USERNAME>/Android/Sdk/
export JAVA_HOME=/usr/lib/jvm/java-<java_version>-openjdk-amd64/
export PATH=/home/<USERNAME>/Android/Sdk/platform-tools/:$PATH

### [android] Update your javac version
javac is java SDK. To select javac version from the already installed:

`sudo update-alternatives --config javac`

### [iOS] No such module found
You probably opened `xcodeproj` instead of `xcworkspace`. You should always open on Xcode th file `mobile_app/ios/mobile_app.xcworkspace`.
