import camelCase from 'lodash/camelCase';
import { WEATHER_FETCH } from '../actions/weathers';

export default (state = {}, action) => {
  const zoneId = camelCase(action.zoneId);
  switch (action.type) {
    case WEATHER_FETCH:
      return {
        ...state,
        [zoneId]: action.weathers,
      };
    default:
      return state;
  }
};
