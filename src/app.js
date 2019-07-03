import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute';
import Login from './containers/login';
import ContractLayout from './pages/contract/layout';
import Layout from './pages/layout';

class App extends Component {

  render () {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/contract" component={ContractLayout} />
        <PrivateRoute path="/" component={Layout} />
      </Switch>
    );
  }
}

export default App;
