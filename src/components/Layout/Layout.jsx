import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useLocale, useMessageFormatter } from '@react-aria/i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { AVAILABLE_LOCALES } from '../../constants';
import AppHeader from '../AppHeader';
import messages from './intl';

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      color: theme.palette.getContrastText(theme.palette.grey[900]),
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
  const { dir, locale } = useLocale();
  const messageFormatter = useMessageFormatter(messages);
  const router = useRouter();
  const classes = useStyles();

  const path = router.asPath.startsWith(`/${locale}`)
    ? router.asPath.replace(/^\/[^/]+/, '')
    : undefined;

  return (
    <>
      <Helmet
        defaultTitle="Eorzea Weather"
        htmlAttributes={{ dir, lang: locale }}
        titleTemplate="%s - Eorzea Weather"
      >
        <link href="/favicon.ico" rel="icon" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
        {typeof path === 'string' && (
          <link
            href={path.length > 0 ? path : '/'}
            hrefLang="x-default"
            rel="alternate"
          />
        )}
        {typeof path === 'string' &&
          Object.keys(AVAILABLE_LOCALES)
            .filter((v) => v !== locale)
            .map((v) => (
              <link
                href={`/${v}${path}`}
                hrefLang={v}
                key={`lang-${v}`}
                rel="alternate"
              />
            ))}
      </Helmet>

      <CssBaseline />

      <AppHeader />

      {children}

      <footer className={classes.footer}>
        <Container className={classes.footerInner}>
          <Link as={`/${locale}/privacy`} href="/[locale]/privacy">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={classes.link}>{messageFormatter('privacy_policy')}</a>
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
