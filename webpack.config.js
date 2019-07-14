const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin');

const env = process.env.NODE_ENV || 'development';

const htmlPluginOptions = {
  inject: false,
  minify: {
    caseSensitive: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true,
  },
  template: path.resolve(__dirname, 'src', 'templates', 'index.jsx'),
};

module.exports = {
  mode: env === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        exclude: /\/node_modules\/(?:core-js|css-vendor|jss-(?:[^/]+)|localforage|lodash|react|react-dom)\//,
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    new EnvironmentPlugin({
      GOOGLE_ANALYTICS_TRACKING_ID: null,
      NODE_ENV: env,
    }),
    new CopyPlugin([
      path.resolve(__dirname, 'src', 'images', 'favicon.ico'),
    ]),
    new HtmlPlugin({
      ...htmlPluginOptions,
      filename: 'index.en.html',
    }),
    new HtmlPlugin({
      ...htmlPluginOptions,
      filename: 'index.ja.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
