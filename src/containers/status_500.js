import { connect } from 'react-redux';
import Status500 from '../pages/status_500';

const mapStateToProps = (state, ownProps) => ({
  statusCode: state.status.httpStatusCode,
});

export default connect(mapStateToProps, null)(Status500);
