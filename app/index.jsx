import React from 'react';
import AppRoot from './components/AppRoot';
import clippings from 'json!./data/clippings.json';
import './style/skeleton.css';

console.log(clippings);

function run() {
  React.render(<AppRoot clippings={clippings}/>, document.body);
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}