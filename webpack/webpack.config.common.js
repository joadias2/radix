const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Paths = require('./paths');

module.exports = {
  output: {
    // Lesser garbage collection.
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // Skip the typechecking.
              // This can be done in a separate thread.
              transpileOnly: true,
              // Use the watch API from tsc.
              // Only the needed modules will be
              // rebuilt during incremental builds.
              experimentalWatchApi: true,
            },
          },
        ],
        include: Paths.Source,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    modules: [
      Paths.Source,
      'node_modules',
    ],
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
    symlinks: false,
  },
};
