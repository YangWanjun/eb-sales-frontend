import { connect } from 'react-redux';
import ShowNotification from '../components/ShowNotification';

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notification.notifications,
});

export default connect(mapStateToProps, null)(ShowNotification);
