import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';
import Helmet from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
import Ad from '../../components/Ad';
import ZoneList from '../../components/ZoneList';
import getZoneList from '../../utils/getZoneList';

const messages = defineMessages({
  description: {
    defaultMessage: 'Eorzea Weather is a web application that displays a list of weather forecasts during the game of FINAL FANTASY XIV.',
    id: 'home.description',
  },
});

const useStyles = makeStyles(
  (theme) => createStyles({
    ad: {
      maxWidth: '100%',
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
    },
    button: {
      marginTop: theme.spacing(3),
    },
    container: {
      padding: theme.spacing(1.5),
    },
    hero: {
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '30vh',
      padding: `${theme.spacing(10)}px 0`,
    },
  }),
);

export const getStaticProps = () => ({
  props: {},
});

export const getStaticPaths = () => ({
  fallback: false,
  paths: [
    {
      params: {
        locale: 'en',
      },
    },
    {
      params: {
        locale: 'ja',
      },
    },
  ],
});

const Home = () => {
  const intl = useIntl();
  const classes = useStyles();

  const zones = getZoneList({
    locale: intl.locale,
  });

  return (
    <>
      <Helmet bodyAttributes={{ class: 'home' }}>
        <meta content={intl.formatMessage(messages.description)} name="description" />
      </Helmet>

      <div className={classes.hero}>
        <Typography color="inherit" component="h1" gutterBottom variant="h3">
          Eorzea Weather
        </Typography>

        <Link as={`/${intl.locale}/zones/eureka-hydatos`} href="/[locale]/zones/[id]" passHref>
          <Button className={classes.button} component="a" variant="contained">
            Eureka!
          </Button>
        </Link>
      </div>

      <main className={classes.container}>
        {Object.keys(zones).length > 0 && <ZoneList zones={zones} />}
      </main>

      {process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID
        && process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT && (
          <Container maxWidth="md">
            <Ad className={classes.ad} slot={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT} />
          </Container>
      )}
    </>
  );
};

export default Home;
