import { connect } from 'react-redux';
import AppDrawer from '../components/AppDrawer';

const mapStateToProps = state => ({
  zones: state.zones || {},
});

export default connect(mapStateToProps)(AppDrawer);
