import React from 'react';
import AppRoot from './components/AppRoot';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import './style/skeleton.css';


// Opt-out of persistent state and remove hash from url
var history = createBrowserHistory({
  queryKey: false
});

React.render((
  <Router history={history}>
    <Route path='/asd' component={AppRoot}>
    </Route>
  </Router>
), document.body);