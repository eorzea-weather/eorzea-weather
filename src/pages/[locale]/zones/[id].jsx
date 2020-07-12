import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EorzeaWeather from 'eorzea-weather';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, useIntl } from 'react-intl';
import WeatherTable from '../../../components/WeatherTable';
import zoneShape from '../../../types/zoneShape';
import { EORZEA_ZONE_LIST } from '../../../utils/getZoneList';

const messages = defineMessages({
  title: {
    defaultMessage: '{name} weather',
    id: 'zone.title',
  },
});

const useStyles = makeStyles(
  (theme) => createStyles({
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
      paddingTop: 80,
      width: 1240,
    },
  }),
);

export const getStaticProps = async ({ params }) => {
  const id = camelCase(params.id);
  const eorzeaWeather = new EorzeaWeather(id, {
    locale: params.locale,
  });

  return {
    props: {
      zone: {
        id,
        name: eorzeaWeather.getZoneName(),
      },
    },
  };
};

export const getStaticPaths = () => ({
  fallback: false,
  paths: EORZEA_ZONE_LIST
    .reduce((result, id) => result.concat(
      {
        params: {
          locale: 'en',
          id: kebabCase(id),
        },
      },
      {
        params: {
          locale: 'ja',
          id: kebabCase(id),
        },
      },
    ), []),
});

const Zone = ({ zone }) => {
  const intl = useIntl();
  const classes = useStyles();

  const title = intl.formatMessage(messages.title, { name: zone.name });

  return (
    <main className={classes.root}>
      <Helmet>
        <title>
          {title}
        </title>
      </Helmet>
      <Typography className={classes.headline} variant="subtitle1">
        {title}
      </Typography>
      <WeatherTable zoneID={zone.id} />
    </main>
  );
};

Zone.propTypes = {
  zone: zoneShape.isRequired,
};

export default Zone;
