const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Paths = require('./paths');

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          'fast-sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
          },
        },
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
    minimizer: [
      new UglifyWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          options: {
            discardComments: {
              removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
          },
          canPrint: false,
        },
      }),
    ],
  },
};
