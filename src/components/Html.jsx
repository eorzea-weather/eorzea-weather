import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

const Html = ({ children, files }) => {
  const helmet = Helmet.renderStatic();

  return (
    <html lang="en" {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {/* eslint-disable-next-line react/no-danger */}
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.from,Object.assign,Object.values,Promise,URL" />
        {files.js.map(path => (
          <script key={`script-${path}`} src={path} />
        ))}
      </body>
    </html>
  );
};

Html.propTypes = {
  children: PropTypes.node.isRequired,
  files: PropTypes.shape({
    js: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default Html;
