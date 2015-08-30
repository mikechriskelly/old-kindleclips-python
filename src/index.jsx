import React from 'react';
import AppRoot from './components/AppRoot';

require('./style/skeleton.css');

loadJSON('./data/my_clippings.json', function(response) {
  var clippings = JSON.parse(response);
  console.log(clippings);
  React.render(<AppRoot clippings={clippings}/>, document.querySelector('#AppRoot'));
});

function loadJSON(path, callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', path, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}