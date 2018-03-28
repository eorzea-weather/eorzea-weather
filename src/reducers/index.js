import { combineReducers } from 'redux';
import weathers from './weathers';
import zones from './zones';

export default combineReducers({
  weathers,
  zones,
});
