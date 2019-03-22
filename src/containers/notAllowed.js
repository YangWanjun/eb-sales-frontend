import { connect } from 'react-redux';
import NotAllowed from '../pages/not_allowed';

const mapStateToProps = (state, ownProps) => ({
  statusCode: state.status.httpStatusCode,
});

export default connect(mapStateToProps, null)(NotAllowed);
