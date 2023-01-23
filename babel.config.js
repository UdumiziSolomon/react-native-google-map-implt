module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],
      'react-native-reanimated/plugin',
      [
        "module-resolver",
        {
          root: ["."],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.png', '.jpg', '.jsx'],
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
