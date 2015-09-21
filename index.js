var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();

var isDevelopment = process.env.NODE_ENV !== 'production';
var port = isDevelopment ? 3000 : process.env.PORT;
var publicPath = path.resolve(__dirname, 'public');

// Point to static assets
app.use(express.static(publicPath))

app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: publicPath
  });
})

// Run the server
app.listen(port, function() {
  console.log('Server running on port ' + port);
});

if (isDevelopment) {
  var config = require('./config/webpack-dev.js');
  var WebpackDevServer = require('webpack-dev-server');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
  }).listen(port, 'localhost', function (err, result) {
    if (err) { console.log(err) }
    console.log('Server running on port ' + port);
  });
}