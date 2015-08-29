import React from 'react';
import mui from 'material-ui';
require('./style.css');

loadJSON(function(response) {
  var actual_JSON = JSON.parse(response);
  console.log(actual_JSON);
  React.render(<App clippings={actual_JSON} />, document.querySelector("#myApp"));
});

export class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <p>My simple React Webpack Babel App</p>
        <MyAwesomeReactComponent/>
      </div>
    );
  }
}

var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;

var MyAwesomeReactComponent = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function() {
    return (
        <RaisedButton label="Default" />
    );
  }
});
module.exports = MyAwesomeReactComponent;

export class Header extends React.Component {
  render() {
    return (
      <h1>I'm a Header</h1>
    );
  }
}



function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', './data/my_clippings.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}