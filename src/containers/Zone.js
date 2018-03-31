import camelCase from 'lodash/camelCase';
import { connect } from 'react-redux';
import Zone from '../components/Zone';

const mapStateToProps = (state, { match: { params } }) => {
  const zoneId = camelCase(params.zoneId);
  return {
    zone: state.zones[zoneId] || { id: zoneId, name: '' },
  };
};

export default connect(mapStateToProps)(Zone);
