import 'regenerator-runtime/runtime';
import localForage from 'localforage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';

const getCurrentLocale = async () => {
  const cachedLocale = await localForage.getItem('locale');
  const parsedUrl = new URL(window.location.href);
  if (parsedUrl.searchParams && parsedUrl.searchParams.has('locale')) {
    const locale = parsedUrl.searchParams.get('locale');
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
  const element = (
    <Router>
      <Main locale={locale} />
    </Router>
  );
  await render(element, container);
};

// eslint-disable-next-line no-console
main().catch(error => console.error(error));
