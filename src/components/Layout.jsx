import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import AppHeader from './AppHeader';

const locales = ['en', 'ja'];

const useStyles = makeStyles(
  (theme) => createStyles({
    footer: {
      color: theme.palette.getContrastText(
        theme.palette.grey[900],
      ),
      backgroundColor: theme.palette.grey[900],
      marginTop: theme.spacing(4),
      padding: `${theme.spacing(4)}px 0`,
    },
    footerInner: {
      textAlign: 'right',
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',

      '&:hover': {
        color: 'inherit',
        textDecoration: 'underline',
      },
    },
  }),
);

const Layout = ({ children }) => {
  const intl = useIntl();
  const router = useRouter();
  const classes = useStyles();

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

      <footer className={classes.footer}>
        <Container className={classes.footerInner}>
          <Link as={`/${intl.locale}/privacy`} href="/[locale]/privacy">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={classes.link}>
              <FormattedMessage defaultMessage="Privacy" id="footer.privacy_policy" />
            </a>
          </Link>
        </Container>
      </footer>
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
