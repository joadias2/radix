const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Paths = require('./paths');

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // Name of the generated classes.
              // Used to scope classes to components.
              localIdentName: '[local]__[hash:base64:5]',
              // Enables css modules.
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
          'fast-sass-loader',
        ],
      },
    ],
  },
  plugins: [
    // Clean the /dist folder before each build,
    // so that only used files will be generated.
    new CleanWebpackPlugin([Paths.Build]),
    new HtmlWebpackPlugin({
      inject: true,
      template: Paths.HtmlTemplate,
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
    // Generates separate CSS files instead of
    // bundling the CSS within javascript.
    // HtmlWebpackPlugin picks it up automatically
    // and injects it into index.html.
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
