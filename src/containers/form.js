import { connect } from 'react-redux';
import FormComponent from '../components/Form/Form';
import { warningMessage, errorMessage, successMessage } from '../actions/msg.actions';

const mapStateToProps = (state, ownProps) => ({
  errorMessages: state.msg.errorMessages,
  warningMessages: state.msg.warningMessages,
  successMessages: state.msg.successMessages,
  infoMessages: state.msg.infoMessages,
});

const mapDispatchToProps = dispatch => ({
  showWarningMsg(message) {
    dispatch(warningMessage(message));
  },
  showErrorMsg(message) {
    dispatch(errorMessage(message));
  },
  showSuccessMsg(message) {
    dispatch(successMessage(message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
