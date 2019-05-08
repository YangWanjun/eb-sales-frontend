import { connect } from 'react-redux';
import SearchDialog from '../components/SearchDialog';
import { errorMessage } from '../actions/msg.actions';

const mapStateToProps = (state, ownProps) => ({
  errorMessages: state.msg.errorMessages,
  warningMessages: state.msg.warningMessages,
  successMessages: state.msg.successMessages,
  infoMessages: state.msg.infoMessages,
});

const mapDispatchToProps = dispatch => ({
  showErrorMsg(message) {
    dispatch(errorMessage(message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDialog);
