
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../reducers';

export default () => {
  const store = createStore(
    rootReducer,
    devToolsEnhancer(),
  );

  return store;
};
