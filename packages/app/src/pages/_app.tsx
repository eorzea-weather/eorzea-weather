import { I18nProvider } from '@react-aria/i18n';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import React, { FC, useCallback, useEffect } from 'react';
import Layout from '../components/Layout';
import Theme from '../components/Theme';
import { Provider as ZoneProvider } from '../context/zone';
import { Provider as SettingsProvider } from '../context/settings';
import tracker from '../utils/tracker';

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  const locale = router.locale ?? 'en';

  const handleRouteChangeComplete = useCallback((url: string) => {
    tracker.track({
      path: url,
      title: document.title,
    });
  }, []);

  useEffect(() => {
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [handleRouteChangeComplete]);

  useEffect(() => {
    const renderedStyles = document.getElementById('jss-server-side');

    renderedStyles?.parentNode?.removeChild(renderedStyles);
  }, []);

  return (
    <I18nProvider locale={locale}>
      <SettingsProvider>
        <Theme>
          <ZoneProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ZoneProvider>
        </Theme>
      </SettingsProvider>
    </I18nProvider>
  );
};

export default MyApp;
