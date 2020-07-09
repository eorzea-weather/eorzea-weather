import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import AppHeader from './AppHeader';

const locales = ['en', 'ja'];

const Layout = ({ children }) => {
  const intl = useIntl();
  const router = useRouter();

  const path = router.asPath.startsWith(`/${intl.locale}`)
    ? router.asPath.replace(/^\/[^/]+/, '')
    : undefined;

  return (
    <>
      <Helmet defaultTitle="Eorzea Weather" htmlAttributes={{ lang: intl.locale }} titleTemplate="%s - Eorzea Weather">
        <link href="/favicon.ico" rel="icon" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        {typeof path === 'string' && <link href={path.length > 0 ? path : '/'} hrefLang="x-default" rel="alternate" />}
        {typeof path === 'string' && locales.filter((v) => v !== intl.locale).map((v) => (
          <link href={`/${v}${path}`} hrefLang={v} key={`lang-${v}`} rel="alternate" />
        ))}
      </Helmet>

      <CssBaseline />

      <AppHeader />

      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
