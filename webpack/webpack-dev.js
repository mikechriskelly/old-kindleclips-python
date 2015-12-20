var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './app/index.jsx',
  devtool: 'eval',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot', 'babel']
    },
    { test: /\.css$/, 
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      exclude: /(node_modules|bower_components)/ 
    }]
  },
  devServer: {
    colors: true,
    contentBase: './build',
    hot: false,
    inline: true, 
    progress: true,
    noInfo: true  
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './app/template.html'
    })
  ]
};
