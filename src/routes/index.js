import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from '../layout'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
