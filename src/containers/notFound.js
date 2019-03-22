import { connect } from 'react-redux';
import NotFound from '../pages/not_found';

const mapStateToProps = (state, ownProps) => ({
  statusCode: state.status.httpStatusCode,
});

export default connect(mapStateToProps, null)(NotFound);
