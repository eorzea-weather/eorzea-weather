import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

const polyfills = [
  'Array.from',
  'Map',
  'Object.assign',
  'Object.entries',
  'Object.values',
  'Promise',
  'String.prototype.trim',
  'URL',
];

const createTrackingCode = () => `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
`.trim();

const Html = ({
  children,
  files,
  preloadedState,
  styles,
}) => {
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
            <script dangerouslySetInnerHTML={{ __html: createTrackingCode() }} />
          </Fragment>
        )}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: styles }} id="server-rendered-styles" />
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: children && '' }} id="root" />
        <script src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfills.join(',')}`} />
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(preloadedState) }} id="preloaded-state" type="application/json" />
        {files.js.map(path => (
          <script key={`script-${path}`} src={path} />
        ))}
      </body>
    </html>
  );
};

Html.defaultProps = {
  preloadedState: {},
};

Html.propTypes = {
  children: PropTypes.node.isRequired,
  files: PropTypes.shape({
    js: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  preloadedState: PropTypes.objectOf(PropTypes.any),
  styles: PropTypes.string.isRequired,
};

export default Html;
