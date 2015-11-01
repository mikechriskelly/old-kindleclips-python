import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';
import Main from './components/Main';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import './style/skeleton.css';
import './style/style.css';

// Opt-out of persistent state and remove hash from url
let history = createBrowserHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Route path='/' component={AppRoot}>
      <IndexRoute component={Main} />
    </Route>
  </Router>
), document.getElementById('App'));