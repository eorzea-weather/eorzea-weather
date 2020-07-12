import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import Helmet from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
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
      minHeight: '55vh',
      paddingBottom: 80,
      paddingTop: 80,
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
    </>
  );
};

export default Home;
