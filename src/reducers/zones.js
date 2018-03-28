import camelCase from 'lodash/camelCase';
import { ZONE_FETCH } from '../actions/zones';

export default (state = {}, action) => {
  const zoneId = camelCase(action.zoneId);
  switch (action.type) {
    case ZONE_FETCH:
      return {
        ...state,
        [zoneId]: { name: action.name },
      };
    default:
      return state;
  }
};
