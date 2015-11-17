'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'src'),
  jsPath = path.join(path.join(srcPath, 'js'));

module.exports = {
  target: 'web',
  cache: true,
  entry: {
    view: path.join(jsPath, 'view.js'),
    test: path.join(jsPath, 'test.js')
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
    library: ['Ig', '[name]'],
    pathInfo: true
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'},
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test.html',
      template: 'src/test.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ],

  debug: true,
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
};
