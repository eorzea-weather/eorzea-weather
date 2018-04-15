import 'regenerator-runtime/runtime';
import localForage from 'localforage';
import isEqual from 'lodash/isEqual';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchZone } from './actions/zones';
import Main from './components/Main';
import configureStore from './store/configureStore';
import * as zoneList from './zones';

const getCachedLocale = async () => {
  try {
    const locale = await localForage.getItem('locale');
    return locale;
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    return null;
  }
};

const getCurrentLocale = async () => {
  const cachedLocale = await getCachedLocale();
  const parsedUrl = new URL(window.location.href);
  if (parsedUrl.searchParams && parsedUrl.searchParams.has('locale')) {
    const locale = parsedUrl.searchParams.get('locale');
    if (!cachedLocale || locale !== cachedLocale) {
      try {
        await localForage.setItem('locale', locale);
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
      return locale;
    }
  }
  return cachedLocale || (navigator.language || '').split('-')[0] || 'en';
};

const getPreloadedState = ({ locale }) => {
  if (document.documentElement.lang !== locale) {
    return {};
  }
  const element = document.getElementById('preloaded-state');
  const json = element ? element.textContent : '{}';
  return JSON.parse(json);
};

const render = (element, container) => new Promise((resolve, reject) => {
  const methodName = (container.firstChild && container.firstChild.hasAttribute('data-reactroot')) ? 'hydrate' : 'render';
  try {
    ReactDOM[methodName](element, container, resolve);
  } catch (error) {
    reject(error);
  }
});

const main = async () => {
  const container = document.getElementById('root');
  const locale = await getCurrentLocale();
  const preloadedState = getPreloadedState({ locale });
  const store = configureStore(preloadedState);
  const zoneIds = Object.values(zoneList);
  if (!isEqual(Object.keys(store.getState().zones), zoneIds)) {
    zoneIds.forEach(zoneId => store.dispatch(fetchZone(zoneId, { locale })));
  }
  const element = (
    <Router>
      <Main locale={locale} store={store} />
    </Router>
  );
  await render(element, container);
};

// eslint-disable-next-line no-console
main().catch(error => console.error(error));
