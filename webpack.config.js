const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        exclude: /\/node_modules\/(?:css-vendor|jss-default-unit|jss-global|jss-nested|jss-props-sort|jss-vendor-prefixer)\//,
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, 'src', 'templates', 'index.jsx'),
      title: 'Eorzea Weather',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
