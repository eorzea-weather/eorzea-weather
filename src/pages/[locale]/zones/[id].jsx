import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useMessageFormatter } from '@react-aria/i18n';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Ad from '../../../components/Ad';
import WeatherTable from '../../../components/WeatherTable';
import { AVAILABLE_LOCALES, EORZEA_ZONE_LIST } from '../../../constants';
import { useZone } from '../../../context/zone';

const useStyles = makeStyles((theme) =>
  createStyles({
    ad: {
      maxWidth: '100%',
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
    },
    headline: {
      margin: [
        `${theme.spacing(1)}px`,
        `${theme.spacing(0.75)}px`,
        `${theme.spacing(3)}px`,
      ].join(' '),
    },
    root: {
      margin: '16px auto',
      maxWidth: '100%',
      width: 1240,
    },
  }),
);

export const getStaticProps = async ({ params }) => {
  const { locale } = params;
  const { default: message } = await import(`../../../intl/zone/${locale}.json`);
  const id = camelCase(params.id);

  return {
    props: {
      id,
      locale,
      messages: {
        [locale]: message,
      },
    },
  };
};

export const getStaticPaths = () => ({
  fallback: false,
  paths: EORZEA_ZONE_LIST.reduce(
    (result, id) =>
      result.concat(
        Object.keys(AVAILABLE_LOCALES).map(locale => ({
          params: {
            locale,
            id: kebabCase(id),
          },
        })),
      ),
    [],
  ),
});

const Zone = ({ id, messages }) => {
  const messageFormatter = useMessageFormatter(messages);
  const zone = useZone({ id });
  const classes = useStyles();

  const title = messageFormatter('title', { name: zone.name });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <main className={classes.root}>
        <Typography className={classes.headline} variant="subtitle1">
          {title}
        </Typography>
        <WeatherTable zoneID={zone.id} />
      </main>

      {process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID &&
        process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT && (
          <Container maxWidth="md">
            <Ad
              className={classes.ad}
              key={`ad-for-${zone.id}`}
              slot={process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_AD_SLOT}
            />
          </Container>
        )}
    </>
  );
};

Zone.propTypes = {
  id: PropTypes.string.isRequired,
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string.isRequired))
    .isRequired,
};

export default Zone;
