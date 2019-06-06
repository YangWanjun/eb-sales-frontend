import { connect } from 'react-redux';
import Loading from '../components/Loading';

const mapStateToProps = (state, ownProps) => ({
  loading: state.status.loading,
});

export default connect(mapStateToProps, null)(Loading);
