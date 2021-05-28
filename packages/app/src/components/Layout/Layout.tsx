import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useLocale, useMessageFormatter } from '@react-aria/i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
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

const Layout: FC = ({ children }) => {
  const { direction } = useLocale();
  const messageFormatter = useMessageFormatter(messages);
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <Helmet
        defaultTitle="Eorzea Weather"
        htmlAttributes={{ dir: direction }}
        titleTemplate="%s - Eorzea Weather"
      >
        <link href="/favicon.ico" rel="icon" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
        {(router.locales || [])
          .filter((locale) => locale !== router.locale)
          .map((locale) => (
            <link
              href={
                locale === router.defaultLocale
                  ? router.asPath
                  : `/${locale}${router.asPath === '/' ? '' : router.asPath}`
              }
              hrefLang={locale}
              key={`locale-${locale}`}
              rel="alternate"
            />
          ))}
      </Helmet>

      <CssBaseline />

      <AppHeader />

      {children}

      <footer className={classes.footer}>
        <Container className={classes.footerInner}>
          <Link href="/privacy" prefetch={false}>
            <a className={classes.link}>{messageFormatter('privacy_policy')}</a>
          </Link>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
