var kindleMyClippings = require('kindle-my-clippings');
var fs = require('fs');

var options = {
  file: 'My\ Clippings.txt',
  format: 'json'
};

kindleMyClippings.init(options, function (data) {
    // data is an object with parsed clippings
    fs.writeFile('clippings.json', data, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('File Saved!');
    });
});


