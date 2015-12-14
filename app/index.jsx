import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';
import Main from './components/Main';
import { Router, Route, IndexRoute } from 'react-router';

import './style/skeleton.css';
import './style/style.css';

ReactDOM.render((
  <Router>
    <Route path='/' component={AppRoot}>
      <IndexRoute component={Main} />
    </Route>
  </Router>
), document.getElementById('App'));