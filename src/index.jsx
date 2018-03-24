import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import enMessages from './locales/en.json';
import jaMessages from './locales/ja.json';

addLocaleData(jaLocaleData);

const getCurrentLocale = () => (navigator.language || '').split('-')[0] || 'en';

const render = (element, container) => new Promise((resolve, reject) => {
  try {
    ReactDOM.render(element, container, resolve);
  } catch (error) {
    reject(error);
  }
});

const main = async () => {
  const container = document.getElementById('root');
  const locale = getCurrentLocale();
  const messages = locale === 'ja' ? jaMessages : enMessages;
  const element = (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <App />
      </Router>
    </IntlProvider>
  );
  await render(element, container);
};

// eslint-disable-next-line no-console
main().catch(error => console.error(error));
