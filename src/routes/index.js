import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Layout from '../layout';
import { alertActions } from '../reducers/alert.actions';
import { PrivateRoute } from '../components/privateRoute';
import login from '../components/login';

const history = createBrowserHistory();

class Routes extends Component {

  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render () {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={login} />
            <PrivateRoute path="/" component={Layout} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(Routes);
