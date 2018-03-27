import PropTypes from 'prop-types';
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import enMessages from '../locales/en.json';
import jaMessages from '../locales/ja.json';
import App from './App';

addLocaleData(jaLocaleData);

const Main = ({ locale }) => {
  const messages = locale === 'ja' ? jaMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  );
};

Main.defaultProps = {
  locale: 'en',
};

Main.propTypes = {
  locale: PropTypes.string,
};

export default Main;
