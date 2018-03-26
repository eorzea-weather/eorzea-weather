import localForage from 'localforage';
import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import jaLocaleData from 'react-intl/locale-data/ja';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import enMessages from './locales/en.json';
import jaMessages from './locales/ja.json';

addLocaleData(jaLocaleData);

const getCurrentLocale = async () => {
  const cachedLocale = await localForage.getItem('locale');
  const parsedUrl = new URL(window.location.href);
  if (parsedUrl.searchParams && parsedUrl.searchParams.has('locale')) {
    const locale = parsedUrl.searchParams.get('locale');
    parsedUrl.searchParams.delete('locale');
    window.history.replaceState(null, document.title, parsedUrl.href);
    if (!cachedLocale || locale !== cachedLocale) {
      await localForage.setItem('locale', locale);
      return locale;
    }
  }
  return cachedLocale || (navigator.language || '').split('-')[0] || 'en';
};

const render = (element, container) => new Promise((resolve, reject) => {
  try {
    ReactDOM.render(element, container, resolve);
  } catch (error) {
    reject(error);
  }
});

const main = async () => {
  const container = document.getElementById('root');
  const locale = await getCurrentLocale();
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
