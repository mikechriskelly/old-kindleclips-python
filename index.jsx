import React from 'react';
import mui from 'material-ui';
require('./style.css');


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

React.render(<App/>, document.querySelector("#myApp"));