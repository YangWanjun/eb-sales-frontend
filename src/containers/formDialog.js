import { connect } from 'react-redux';
import FormDialog from '../components/Form/index';
import { addProjectMember } from '../actions/dialog.actions';

const mapStateToProps = (state, ownProps) => ({
  open: state.dialog.add_project_member,
});
  
const mapDispatchToProps = dispatch => ({
  onOpen() {
    dispatch(addProjectMember(true));
  },
  onClose() {
    dispatch(addProjectMember(false));
  },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
