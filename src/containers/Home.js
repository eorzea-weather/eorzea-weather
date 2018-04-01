import { connect } from 'react-redux';
import Home from '../components/Home';

const mapStateToProps = state => ({
  zones: state.zones || {},
});

export default connect(mapStateToProps)(Home);
