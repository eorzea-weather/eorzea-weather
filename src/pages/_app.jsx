import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { I18nProvider } from '@react-aria/i18n';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Provider as ZoneProvider } from '../context/zone';
import tracker from '../utils/tracker';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      tracker.track({
        path: url,
        title: document.title,
      });
    };

    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    const renderedStyles = document.getElementById('jss-server-side');

    if (renderedStyles?.parentNode) {
      renderedStyles.parentNode.removeChild(renderedStyles);
    }
  }, []);

  return (
    <I18nProvider locale={pageProps.locale || 'en'}>
      <MuiThemeProvider theme={theme}>
        <ZoneProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ZoneProvider>
      </MuiThemeProvider>
    </I18nProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    locale: PropTypes.string,
  }).isRequired,
};

export default MyApp;
