import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import enMessages from '../locales/en.json';
import jaMessages from '../locales/ja.json';
import App from './App';

addLocaleData(jaLocaleData);

export default class Main extends Component {
  static defaultProps = {
    locale: 'en',
  };

  static propTypes = {
    locale: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.locale !== nextProps.locale;
  }

  render() {
    const { locale } = this.props;
    const messages = locale === 'ja' ? jaMessages : enMessages;

    return (
      <IntlProvider locale={locale} messages={messages}>
        <App />
      </IntlProvider>
    );
  }
}
