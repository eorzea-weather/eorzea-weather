const HtmlPlugin = require('html-webpack-plugin');

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
    publicPath: '/',
  },
  plugins: [
    new HtmlPlugin({
      title: 'Eorzea Weather',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
