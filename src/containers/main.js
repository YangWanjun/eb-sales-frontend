import { connect } from 'react-redux';
import Main from '../components/main';
import { logoutAndRedirect } from '../actions/auth.actions';
import { getMe, clearMe } from '../actions/user.actions';

const mapStateToProps = (state, ownProps) => {
  return {
    statusCode: state.status.httpStatusCode,
    loggedIn: state.auth.loggedIn,
    user: state.user.me,
    perms: state.user.perms,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logoutAndRedirect());
      dispatch(clearMe());
    },
    onMount() {
      dispatch(getMe());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
