const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        exclude: /\/node_modules\/(?:core-js|css-vendor|jss-default-unit|jss-global|jss-nested|jss-props-sort|jss-vendor-prefixer|localforage|lodash|react|react-dom)\//,
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
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlPlugin({
      favicon: path.resolve(__dirname, 'src', 'images', 'favicon.ico'),
      inject: false,
      template: path.resolve(__dirname, 'src', 'templates', 'index.jsx'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
