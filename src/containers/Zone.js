import camelCase from 'lodash/camelCase';
import { connect } from 'react-redux';
import Zone from '../components/Zone';

const mapStateToProps = (state, { match: { params } }) => {
  const zoneId = camelCase(params.zoneId);
  return {
    weathers: state.weathers[zoneId],
    zone: state.zones[zoneId],
  };
};

export default connect(mapStateToProps)(Zone);
