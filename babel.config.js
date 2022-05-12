module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "^@\/(.+)": "./src/\\1",
          "^@const\/(.+)": "./src/@const/\\1",
          "^@core\/(.+)": "./src/@core/\\1",
          "^@libs\/(.+)": "./src/@libs/\\1",
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      }
    ]
  ]
};