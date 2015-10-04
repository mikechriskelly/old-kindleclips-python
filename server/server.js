var express = require('express');
var path = require('path');

var app = express();

var static_path = path.join(__dirname, './../build');

app.enable('trust proxy');

app.get('/', function (req, res) {
  res.header('Cache-Control', 'max-age=60, must-revalidate, private');
  res.sendFile('index.html', {
    root: static_path
  });
});

app.use('/', express.static(static_path, {
  maxage: 31557600
}));

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log('App listening on port ' + port);
});