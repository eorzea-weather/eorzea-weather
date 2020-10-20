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

type Props = {
  id: string;
  messages: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

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

        <WeatherTable zoneID={zone.id} />
      </main>
    </>
  );
};

export default Zone;

type Params = {
  id: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
  locale,
}) => {
  if (!params?.id) throw new TypeError('id is required.');

  const message = await import(`@/intl/zone/${locale || 'en'}.json`).then(
    (mod: { default: { [key: string]: string } }) => mod.default,
  );
  const id = camelCase(params.id);

  return {
    props: {
      id,
      messages: {
        [locale || 'en']: message,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const locales = Object.keys(AVAILABLE_LOCALES);
  const paths = locales.reduce<{ params: Params; locale?: string }[]>(
    (result, locale) =>
      result.concat(
        EORZEA_ZONE_LIST.map((id) => ({
          locale,
          params: {
            id: kebabCase(id),
          },
        })),
      ),
    [],
  );

  return Promise.resolve({
    fallback: false,
    paths,
  });
};
