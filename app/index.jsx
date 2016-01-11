import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './components/AppRoot';
import Main from './components/Main';
import Setup from './components/Setup';
import Browse from './components/Browse';
import RandomClip from './components/RandomClip';

import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import './style/skeleton.css';
import './style/style.css';

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={AppRoot}>
      <IndexRoute component={Setup} step='1' />
      <Route path='setup' component={Setup} step='2' />
      <Route path='clips' component={Main}>
        <IndexRoute component={RandomClip} />
        <Route path='random' component={RandomClip} />
        <Route path='browse' component={Browse} />
      </Route>
    </Route>
  </Router>
), document.getElementById('App'));