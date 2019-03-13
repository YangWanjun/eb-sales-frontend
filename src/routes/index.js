import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { PrivateRoute } from '../components/privateRoute';
import Login from '../containers/login';
import Layout from '../containers/app';

const history = createBrowserHistory();

class Routes extends Component {

  render () {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Layout} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
