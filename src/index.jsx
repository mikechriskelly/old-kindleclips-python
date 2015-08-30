import React from 'react';
import AppRoot from './components/AppRoot';

import clippings from 'json!./data/clippings.json';
console.log(clippings)

require('./style/skeleton.css');

React.render(<AppRoot clippings={clippings}/>, document.querySelector('#AppRoot'));