import { connect } from 'react-redux';
import SimpleSnackbar from '../components/Control/Snackbar';

const mapStateToProps = (state, ownProps) => ({
  errorMessages: state.msg.errorMessages,
  warningMessages: state.msg.warningMessages,
  successMessages: state.msg.successMessages,
  infoMessages: state.msg.infoMessages,
});

export default connect(mapStateToProps, null)(SimpleSnackbar);
