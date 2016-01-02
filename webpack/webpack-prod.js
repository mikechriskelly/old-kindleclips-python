var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './app/template.html'
    }),
    new CopyWebpackPlugin([
      { from: 'app/assets', to: 'assets' }
    ])
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel' },
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        exclude: /(node_modules|bower_components)/ }
    ]
  }
};