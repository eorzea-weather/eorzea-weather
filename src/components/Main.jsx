import PropTypes from 'prop-types';
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import enMessages from '../locales/en.json';
import jaMessages from '../locales/ja.json';
import rootReducer from '../reducers';
import App from './App';

const store = createStore(rootReducer);

addLocaleData(jaLocaleData);

const Main = ({ locale }) => {
  const messages = locale === 'ja' ? jaMessages : enMessages;

  return (
    <ReduxProvider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    </ReduxProvider>
  );
};

Main.defaultProps = {
  locale: 'en',
};

Main.propTypes = {
  locale: PropTypes.string,
};

export default Main;
