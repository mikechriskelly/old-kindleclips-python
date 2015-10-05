import React from 'react';
import AppRoot from './components/AppRoot';
import { Router, Route, Link } from 'react-router';

import './style/skeleton.css';

React.render((
  <Router>
    <Route path='/' component={AppRoot}>
    </Route>
  </Router>
), document.body);