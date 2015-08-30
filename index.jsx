import React from 'react';
require('./style.css');

loadJSON('./data/my_clippings.json', function(response) {
  var clippings = JSON.parse(response);
  console.log(clippings);
  React.render(<App clippings={clippings} />, document.querySelector('#myApp'));
});

export class App extends React.Component {
  render() {
    return (
      <div className="content">
        <Header/>
        <ClippingsList clippings={this.props.clippings} />
      </div>
    );
  }
}

export class Header extends React.Component {
  render() {
    return (
      <h1>Bookshelf</h1>
    );
  }
}

export class ClippingsList extends React.Component {
  render() {
    var rows = [];
    this.props.clippings.forEach(function(clipping) {
      rows.push(<p key={clipping.title}>{clipping.title}</p>);
    });
    return (
      <p>{rows}</p>
    );
  }
}



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