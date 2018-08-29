const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Paths = require('./paths');

module.exports = {
  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[chunkhash].js',
  },
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
        use: [
          'cache-loader',
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Clean the /dist folder before each build,
    // so that only used files will be generated.
    new CleanWebpackPlugin(['dist'], {
      root: Paths.Root,
    }),
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
    // Write the manifest within index.html to avoid another request.
    // We are splitting the manifest from our entry chunks in optimization.runtimeChunk.
    // Since the output file is small, it is better to inline it within index.html
    // instead of issuing another HTTP request.
    new InlineManifestWebpackPlugin('manifest'),
    // Generates separate CSS files instead of
    // bundling the CSS within javascript.
    // HtmlWebpackPlugin picks it up automatically
    // and injects it into index.html.
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
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
    // Extract the manifest into its separate file.
    // This way we can start loading the files of the project
    // faster instead of having to wait for the vendor bundle to be loaded.
    // Every time the hashes webpack generates change, then the manifest changes
    // as well. If we don't extract it, it will be bundled within the vendors bundle.
    // Thus, invalidating the vendors bundle everu time we change application code.
    // Extracting the manifest prevents this catastrophic event to our client caching.
    runtimeChunk: {
      name: 'manifest',
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
