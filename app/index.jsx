import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import './style/skeleton.css';
import './style/style.css';

// Opt-out of persistent state and remove hash from url
var history = createBrowserHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Route path='/' component={AppRoot}>
    </Route>
  </Router>
), document.getElementById('App'));