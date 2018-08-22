const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('./paths');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: Paths.HtmlTemplate,
    }),
  ],
  // Webpack Dev Server is a development server running in-memory,
  // meaning the bundle contents aren't written out to files but
  // stored in memory.
  // It refreshes content automatically in the browser while you
  // develop your application.
  devServer: {
    overlay: true,
    open: true,
  },
};
