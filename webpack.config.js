const history = require('connect-history-api-fallback');
const HtmlPlugin = require('html-webpack-plugin');
const convert = require('koa-connect');
const path = require('path');

const htmlPluginOptions = {
  inject: false,
  template: path.resolve(__dirname, 'src', 'templates', 'index.jsx'),
};

module.exports = (env = process.env.NODE_ENV || 'development') => ({
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
    new HtmlPlugin({
      ...htmlPluginOptions,
      favicon: path.resolve(__dirname, 'src', 'images', 'favicon.ico'),
      filename: 'index.html',
    }),
    ...(env === 'production' ? [
      new HtmlPlugin({
        ...htmlPluginOptions,
        filename: 'index.ja.html',
      }),
    ] : []),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  ...(env === 'development' ? {
    serve: {
      add(app) {
        app.use(convert(history()));
      },
    },
  } : {}),
});
