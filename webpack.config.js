/* eslint-disable no-undef */
module.exports = {
  entry: {
    omnibox: './src/workers/omnibox.js',
    textScraper: './src/workers/textScraper.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/transform-runtime']],
          },
        },
      },
    ],
  },
};
