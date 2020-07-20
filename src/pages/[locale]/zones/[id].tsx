import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useMessageFormatter } from '@react-aria/i18n';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { Helmet } from 'react-helmet';
import Ad from '@/components/Ad';
import WeatherTable from '@/components/WeatherTable';
import { AVAILABLE_LOCALES, EORZEA_ZONE_LIST } from '@/constants';
import { useZone } from '@/context/zone';

const availableLocales = Object.keys(AVAILABLE_LOCALES);

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

type Params = {
  locale: string;
  id: string;
};

type Props = {
  id: string;
  locale: string;
  messages: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params?.locale) throw new TypeError('locale is required.');
  if (!params?.id) throw new TypeError('id is required.');

  const { locale } = params;
  const message = await import(`@/intl/zone/${locale}.json`).then(
    (mod: { default: { [key: string]: string } }) => mod.default,
  );
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  fallback: false,
  paths: EORZEA_ZONE_LIST.reduce<{ params: Params }[]>(
    (result, id) =>
      result.concat(
        availableLocales.map((locale) => ({
          params: {
            locale,
            id: kebabCase(id),
          },
        })),
      ),
    [],
  ),
});

const Zone: NextPage<Props> = ({ id, messages }) => {
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

export default Zone;
