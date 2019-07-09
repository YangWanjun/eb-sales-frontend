import { connect } from 'react-redux';
import AccountInfo from '../components/AccountInfo';
import { logoutAndRedirect } from '../actions/auth.actions';
import { clearMe } from '../actions/user.actions';

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.auth.loggedIn,
  accountInfo: state.user.me,
});

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logoutAndRedirect());
      dispatch(clearMe());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
