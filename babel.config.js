module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // include if you use Reanimated
  };
};

// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add this plugin for the new JSX transform
      ['@babel/plugin-transform-react-jsx', {
        runtime: 'automatic'
      }]
    ],
  };
};