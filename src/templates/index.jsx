import * as path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Html from '../components/Html';
import Main from '../components/Main';

export default ({ htmlWebpackPlugin: { files, options } }) => {
  const filename = `/${(options.filename || 'index.html')}`;
  const location = filename.replace(/(?:\.\w{2})?.html$/, '').replace(/\/index$/, '/');
  const locale = (path.basename(filename, '.html').split('.') || [])[1] || 'en';
  const context = {};
  const app = (
    <StaticRouter context={context} location={location}>
      <Main locale={locale} />
    </StaticRouter>
  );
  ReactDOM.renderToString(app);
  const html = (
    <Html files={files}>
      {''}
    </Html>
  );
  return [
    '<!DOCTYPE html>',
    ReactDOM.renderToStaticMarkup(html),
  ].join('\n');
};
