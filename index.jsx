import React from 'react';
require('./style.css');

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
      </div>
    );
  }
}

React.render(<App/>, document.querySelector("#myApp"));