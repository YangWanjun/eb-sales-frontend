import { connect } from 'react-redux';
import ProjectDetail from '../../pages/project_detail';
import { addProjectMember } from '../../actions/dialog.actions';
  
const mapDispatchToProps = dispatch => ({
  showAddProjectMember() {
    dispatch(addProjectMember(true));
  },
});

export default connect(null, mapDispatchToProps)(ProjectDetail);
