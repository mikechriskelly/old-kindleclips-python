var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    proxy: { '/api/*': 'http://localhost:5000/'}
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Kindle Clippings Viewer'
    })    
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
        loader: 'style!css!',
        exclude: /(node_modules|bower_components)/ }
    ]
  }
};