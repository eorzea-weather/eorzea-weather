import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

const createTrackingCode = () => `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
`.trim();

const Html = ({ children, files }) => {
  const helmet = Helmet.renderStatic();
  const {
    GOOGLE_ANALYTICS_TRACKING_ID: trackingId,
  } = process.env;

  return (
    <html lang="en" {...helmet.htmlAttributes.toComponent()}>
      <head>
        {trackingId && (
          <Fragment>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
            {/* eslint-disable-next-line react/no-danger */}
            <script dangerouslySetInnerHTML={{ __html: createTrackingCode().replace(/\n/g, '') }} />
          </Fragment>
        )}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {/* eslint-disable-next-line react/no-danger */}
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.from,Object.assign,Object.entries,Object.values,Promise,String.prototype.trim,URL" />
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
