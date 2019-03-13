import { connect } from 'react-redux';
import Layout from '../layout';
import { logoutAndRedirect } from '../actions/auth.actions';
import { getMe, clearMe } from '../actions/user.actions';

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
  
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
