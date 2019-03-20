import { connect } from 'react-redux';
import TopBar from '../components/topBar';


const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, null)(TopBar);
