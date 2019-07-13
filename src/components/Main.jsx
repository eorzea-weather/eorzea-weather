import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import { Provider as ReduxProvider } from 'react-redux';
import { storeShape } from 'react-redux/es/utils/PropTypes';
import * as locales from '../locales';
import App from './App';

addLocaleData(jaLocaleData);

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const Main = ({ locale, store }) => {
  const messages = locales[locale] || locales.en;

  return (
    <ReduxProvider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </IntlProvider>
    </ReduxProvider>
  );
};

Main.defaultProps = {
  locale: 'en',
};

Main.propTypes = {
  locale: PropTypes.string,
  store: storeShape.isRequired,
};

export default Main;
