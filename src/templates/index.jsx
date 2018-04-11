import * as path from 'path';
import { createGenerateClassName } from 'material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
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
  sheetsRegistry,
  store,
}) => {
  const generateClassName = createGenerateClassName();
  const element = (
    <JssProvider generateClassName={generateClassName} registry={sheetsRegistry}>
      <StaticRouter context={context} location={location}>
        <Main locale={locale} store={store} />
      </StaticRouter>
    </JssProvider>
  );
  return ReactDOM.renderToString(element);
};

export default ({ htmlWebpackPlugin: { files, options } }) => {
  const filename = `/${(options.filename || 'index.html')}`;
  const location = filename.replace(/(?:\.\w{2})?.html$/, '').replace(/\/index$/, '/');
  const locale = (path.basename(filename, '.html').split('.') || [])[1] || 'en';
  const store = configureStore();
  Object.values(zones).forEach(zoneId => store.dispatch(fetchZone(zoneId, { locale })));
  const sheetsRegistry = new SheetsRegistry();
  const context = {};
  const children = createChildren({
    context,
    locale,
    location,
    sheetsRegistry,
    store,
  });
  const html = (
    <Html files={files} preloadedState={store.getState()} styles={sheetsRegistry.toString()}>
      {children}
    </Html>
  );
  return [
    '<!DOCTYPE html>',
    ReactDOM.renderToStaticMarkup(html),
  ].join('\n');
};
