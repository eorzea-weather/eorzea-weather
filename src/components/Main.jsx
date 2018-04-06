import blue from 'material-ui/colors/blue';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import { Provider as ReduxProvider } from 'react-redux';
import * as locales from '../locales';
import configureStore from '../store/configureStore';
import App from './App';

addLocaleData(jaLocaleData);

const store = configureStore();
const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const Main = ({ locale }) => {
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
};

export default Main;
