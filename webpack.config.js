const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: {
    app: './src/index.jsx'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules',
    ],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  },

};