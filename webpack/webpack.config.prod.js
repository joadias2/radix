const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    // Clean the /dist folder before each build,
    // so that only used files will be generated.
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Radix - The Ultimate React + Typescript Boilerplate',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyURLs: true,
      },
    }),
  ],
};
