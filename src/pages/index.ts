import accepts from 'accepts';
import { GetServerSideProps, NextPage } from 'next';
import { AVAILABLE_LOCALES } from '@/constants';

const availableLocales = Object.keys(AVAILABLE_LOCALES);

export const getServerSideProps: GetServerSideProps = ({ query, req }) => {
  const accept = accepts(req);
  const queriedLocale = Array.isArray(query.locale)
    ? query.locale[0]
    : query.locale;
  const locale =
    queriedLocale && availableLocales.includes(queriedLocale)
      ? queriedLocale
      : accept.language(availableLocales) || 'en';
  const path = (req.url || '/').split('?')[0];
  const newPath = `/${locale}${path === '/' ? '' : path}`;

  return Promise.resolve({
    unstable_redirect: {
      destination: newPath,
      permanent: false,
    },
  });
};

const Redirect: NextPage = () => null;

export default Redirect;
