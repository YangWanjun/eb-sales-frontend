import { connect } from 'react-redux';
import Status405 from '../pages/status_405';

const mapStateToProps = (state, ownProps) => ({
  statusCode: state.status.httpStatusCode,
});

export default connect(mapStateToProps, null)(Status405);
