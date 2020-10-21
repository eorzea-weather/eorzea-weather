import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useMessageFormatter } from '@react-aria/i18n';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Helmet } from 'react-helmet';
import Ad from '@/components/Ad';
import ZoneList from '@/components/ZoneList';

const useStyles = makeStyles((theme) =>
  createStyles({
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

type Props = {
  messages: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

const Home: NextPage<Props> = ({ messages }) => {
  const formatMessage = useMessageFormatter(messages);
  const classes = useStyles();

  return (
    <>
      <Helmet bodyAttributes={{ class: 'home' }}>
        <meta content={formatMessage('description')} name="description" />
      </Helmet>

      <div className={classes.hero}>
        <Typography color="inherit" component="h1" gutterBottom variant="h3">
          Eorzea Weather
        </Typography>

        <Link as={`/zones/eureka-hydatos`} href="/zones/[id]" passHref>
          <Button className={classes.button} component="a" variant="contained">
            Eureka!
          </Button>
        </Link>
      </div>

      <main className={classes.container}>
        <ZoneList />
      </main>

      {process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID &&
        process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT && (
          <Container maxWidth="md">
            <Ad
              className={classes.ad}
              slot={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT}
            />
          </Container>
        )}
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const message = await import(`@/intl/home/${locale || 'en'}.json`).then(
    (mod: { default: { [key: string]: string } }) => mod.default,
  );

  return {
    props: {
      messages: {
        [locale || 'en']: message,
      },
    },
  };
};
