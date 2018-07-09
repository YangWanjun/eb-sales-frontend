import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory'
import { Router, Route, Link } from 'react-router'
import Layout from '../layout'

const customHistory = createBrowserHistory();

class Routes extends Component {
  render () {
      return (
        <Router history={customHistory}>
          <Route path="/" component={Layout}>
            <Route path="members"/>
          </Route>
        </Router>
      );
  }
}

export default Routes;
