// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* eslint-disable no-undef */
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    omnibox: './src/workers/omnibox.js',
    textScraper: './src/workers/textScraper.js',
    searchResults: './src/workers/searchResults.js',
  },
  output: {
    path: __dirname + '/extension/build',
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'search-results.html',
      template: 'src/views/search-results.html',
      excludeChunks: ['omnibox', 'textScraper'],
    }),
  ],
};
