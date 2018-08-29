const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Paths = require('./paths');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          // Injects CSS into <style> tags.
          // Enables HMR for CSS.
          'style-loader',
          {
            // Allows webpack resolves any url() statements.
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
          // Way faster than sass-loader.
          // Implements some caching solutions.
          'fast-sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: Paths.HtmlTemplate,
    }),
    // Enables HMR in conjunction with the
    // hot: true setting in devServer.
    // We could pass the --hot flag to the
    // webpack-dev-server in the npm script
    // to get the same result.
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  // Webpack Dev Server is a development server running in-memory,
  // meaning the bundle contents aren't written out to files but
  // stored in memory.
  // It refreshes content automatically in the browser while you
  // develop your application.
  devServer: {
    // stats: 'errors-only',
    overlay: true,
    open: true,
    hot: true,
    // 404s return index.html.
    historyApiFallback: true,
  },
};
