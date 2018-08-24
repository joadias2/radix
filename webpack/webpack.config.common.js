const Paths = require('./paths');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        include: Paths.Source,
        exclude: /node_modules/,
      },
    ],
  },
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
  },
};
