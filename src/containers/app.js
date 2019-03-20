import { connect } from 'react-redux';
import Layout from '../layout';
import { logoutAndRedirect } from '../actions/auth.actions';
import { getMe, clearMe } from '../actions/user.actions';

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.user.me,
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
