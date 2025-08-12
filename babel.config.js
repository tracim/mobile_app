module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      'react-native-reanimated/plugin',
      'react-native-worklets/plugin', // INFO - CH - 2025-08-12 - must be last
  ]
};
