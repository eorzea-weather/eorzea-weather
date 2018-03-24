import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../components/Html';

export default ({ htmlWebpackPlugin: { files } }) => [
  '<!DOCTYPE html>',
  ReactDOM.renderToStaticMarkup(<Html files={files} />),
].join('\n');
