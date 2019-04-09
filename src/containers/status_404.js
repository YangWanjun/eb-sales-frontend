import { connect } from 'react-redux';
import Status404 from '../pages/status_404';

const mapStateToProps = (state, ownProps) => ({
  statusCode: state.status.httpStatusCode,
});

export default connect(mapStateToProps, null)(Status404);
