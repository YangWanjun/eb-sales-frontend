import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { logoutAndRedirect } from '../actions/auth.actions';
import { getMe, clearMe } from '../actions/user.actions';
import Layout from '../layout';
import { PrivateRoute } from '../components/privateRoute';
import Login from '../containers/login';

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

const mapStateToProps = (state, ownProps) => ({
  me: state.user.me
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logoutAndRedirect());
    dispatch(clearMe());
  },
  onMount() {
    dispatch(getMe());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
