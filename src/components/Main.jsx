import PropTypes from 'prop-types';
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import { Provider as ReduxProvider } from 'react-redux';
import * as locales from '../locales';
import configureStore from '../store/configureStore';
import App from './App';

const store = configureStore();

addLocaleData(jaLocaleData);

const Main = ({ locale }) => {
  const messages = locales[locale] || locales.en;

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
