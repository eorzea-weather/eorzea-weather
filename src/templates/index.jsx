import { ServerStyleSheets, StylesProvider, createGenerateClassName } from '@material-ui/styles';
import * as path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { fetchZone } from '../actions/zones';
import Html from '../components/Html';
import Main from '../components/Main';
import configureStore from '../store/configureStore';
import * as zones from '../zones';

const createChildren = ({
  context,
  locale,
  location,
  sheets,
  store,
}) => {
  const generateClassName = createGenerateClassName();
  const element = (
    <StylesProvider generateClassName={generateClassName}>
      <StaticRouter context={context} location={location}>
        <Main locale={locale} store={store} />
      </StaticRouter>
    </StylesProvider>
  );
  return ReactDOM.renderToString(sheets.collect(element));
};

export default ({ htmlWebpackPlugin: { files, options } }) => {
  const filename = `/${(options.filename || 'index.html')}`;
  const location = filename.replace(/(?:\.\w{2})?.html$/, '').replace(/\/index$/, '/');
  const locale = (path.basename(filename, '.html').split('.') || [])[1] || 'en';
  const store = configureStore();
  Object.values(zones).forEach(zoneId => store.dispatch(fetchZone(zoneId, { locale })));
  const sheets = new ServerStyleSheets();
  const context = {};
  const children = createChildren({
    context,
    locale,
    location,
    sheets,
    store,
  });
  const html = (
    <Html files={files} preloadedState={store.getState()} styles={sheets.toString()}>
      {children}
    </Html>
  );
  return [
    '<!DOCTYPE html>',
    ReactDOM.renderToStaticMarkup(html),
  ].join('\n');
};
