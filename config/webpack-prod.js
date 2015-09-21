var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index.jsx' // Appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel',
        include: path.join(__dirname, 'src') },
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.css$/,
        loader: 'style!css',
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'css') }
    ]
  }
}