import accepts from 'accepts';
import { AVAILABLE_LOCALES } from '../constants';

const availableLocales = Object.keys(AVAILABLE_LOCALES);

export const getServerSideProps = async ({ query, res, req }) => {
  const accept = accepts(req);
  const locale = availableLocales.includes(query.locale)
    ? query.locale
    : accept.language(availableLocales) || 'en';
  const path = req.url.split('?')[0];
  const newPath = `/${locale}${path === '/' ? '' : path}`;

  if (res) {
    res.writeHead(307, {
      Location: newPath,
    });
    res.end();
  }

  return {
    props: {},
  };
};

const Redirect = () => null;

export default Redirect;
