import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute';
import Login from './containers/login';
import Layout from './containers/app';

class App extends Component {

  render () {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Layout} />
      </Switch>
    );
  }
}

export default App;
