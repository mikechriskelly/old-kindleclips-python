var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './app/index.jsx' // Appʼs entry point
  ],
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
    {
      test: /\.css$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'style!css'
    }]
  },
  devServer: {
    colors: true,
    contentBase: './build',
    hot: true,
    inline: true, 
    progress: true,
    proxy: { '/api/*': 'http://localhost:5000/'},
    noInfo: true  
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './app/template.html'
    })
  ]
};
