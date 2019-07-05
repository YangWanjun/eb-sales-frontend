import { connect } from 'react-redux';
import TopBar from '../components/topBar';


const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.auth.loggedIn,
  accountInfo: state.user.me,
  notifications: state.notification.notifications,
});

export default connect(mapStateToProps, null)(TopBar);
