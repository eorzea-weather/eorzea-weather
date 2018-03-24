import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import enMessages from './locales/en.json';
import jaMessages from './locales/ja.json';

addLocaleData(jaLocaleData);

const getCurrentScript = () => {
  if (document.currentScript) {
    return document.currentScript;
  }
  const scripts = document.getElementsByTagName('script');
  return scripts[scripts.length - 1];
};

const createContainer = () => {
  const currentScript = getCurrentScript();
  const container = document.createElement('div');
  container.id = 'root';
  currentScript.parentNode.insertBefore(container, currentScript.previousSibling);
  return container;
};

const render = (element, container) => new Promise((resolve, reject) => {
  try {
    ReactDOM.render(element, container, resolve);
  } catch (error) {
    reject(error);
  }
});

const main = async () => {
  const container = createContainer();
  const locale = (navigator.language || '').split('-')[0] || 'en';
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
