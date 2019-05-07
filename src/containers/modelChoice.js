import { connect } from 'react-redux';
import ModelChoice from '../components/Control/ModelChoice';
import { warningMessage } from '../actions/msg.actions';

const mapStateToProps = (state, ownProps) => ({
  errorMessages: state.msg.errorMessages,
  warningMessages: state.msg.warningMessages,
  successMessages: state.msg.successMessages,
  infoMessages: state.msg.infoMessages,
});

const mapDispatchToProps = dispatch => ({
  showWarningMsg(message) {
    dispatch(warningMessage(message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelChoice);
