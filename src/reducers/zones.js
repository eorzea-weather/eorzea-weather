import camelCase from 'lodash/camelCase';
import { ZONE_FETCH, ZONE_GET_ALL } from '../actions/zones';

export default (state = {}, action) => {
  const zoneId = camelCase(action.zoneId);
  switch (action.type) {
    case ZONE_GET_ALL:
      return {
        ...state,
        ...action.zones,
      };
    case ZONE_FETCH:
      return {
        ...state,
        [zoneId]: { id: zoneId, name: action.name },
      };
    default:
      return state;
  }
};
