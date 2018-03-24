import PropTypes from 'prop-types';
import React from 'react';

const Html = ({ files }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta content="initial-scale=1,width=device-width" name="viewport" />
      <title>Eorzea Weather</title>
    </head>
    <body>
      <div id="root" />
      {files.js.map(path => (
        <script src={path} />
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
