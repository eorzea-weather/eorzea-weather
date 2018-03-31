import { connect } from 'react-redux';
import WeatherTable from '../components/WeatherTable';

const mapStateToProps = (state, { zoneId }) => ({
  data: state.weathers[zoneId],
});

export default connect(mapStateToProps)(WeatherTable);
