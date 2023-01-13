module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        "module-resolver",
        {
          root: ["."],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.png', '.jpg'],
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@fonts": "./src/assets/fonts",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens/",
            "@navigations": "./src/navigations/",
          },
        },
      ],

    ],
  };
};
