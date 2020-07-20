import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { I18nProvider } from '@react-aria/i18n';
import { AppProps } from 'next/app';
import Router from 'next/router';
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Provider as ZoneProvider } from '@/context/zone';
import tracker from '@/utils/tracker';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

type PageProps = {
  locale: string;
};

const MyApp = ({ Component, pageProps }: AppProps<PageProps>): JSX.Element => {
  useEffect(() => {
    const handleRouteChangeComplete = (url: string) => {
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

  const locale = (pageProps as PageProps).locale || 'en';

  return (
    <I18nProvider locale={locale}>
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

export default MyApp;
