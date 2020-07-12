import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from '../components/Layout';
import tracker from '../utils/tracker';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const MyApp = ({
  Component, locale, messages, pageProps,
}) => {
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
    const renderedStyles = document.getElementById('server-rendered-styles');

    if (renderedStyles?.parentNode) {
      renderedStyles.parentNode.removeChild(renderedStyles);
    }
  }, []);

  return (
    <IntlProvider key={locale} locale={locale} messages={messages}>
      <MuiThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiThemeProvider>
    </IntlProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.string).isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

MyApp.getInitialProps = async ({ router, ...ctx }) => {
  const appProps = await App.getInitialProps({ ...ctx, router });
  const locale = ['en', 'ja'].includes(router.query.locale) ? router.query.locale : 'en';
  const { default: messages } = await import(`../locales/${locale}.json`);

  return {
    ...appProps,
    locale,
    messages,
  };
};

export default MyApp;
