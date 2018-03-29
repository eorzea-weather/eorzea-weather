import PropTypes from 'prop-types';
import React from 'react';

const Html = ({ files }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta content="initial-scale=1,width=device-width" name="viewport" />
      <title>Eorzea Weather</title>
      <link href="/favicon.ico" rel="icon" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    </head>
    <body>
      <div id="root" />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.from,Object.assign,Object.values,Promise,URL" />
      {files.js.map(path => (
        <script key={`script-${path}`} src={path} />
      ))}
    </body>
  </html>
);

Html.propTypes = {
  files: PropTypes.shape({
    js: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default Html;
