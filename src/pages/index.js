import accepts from 'accepts';
import { AVAILABLE_LOCALES } from '../constants';

export const getServerSideProps = async ({ query, res, req }) => {
  const accept = accepts(req);
  const locales = Object.keys(AVAILABLE_LOCALES);
  const locale = locales.includes(query.locale)
    ? query.locale
    : accept.language(locales) || 'en';
  const path = req.url === '/' ? '' : req.url;

  res.writeHead(307, {
    Location: `/${locale}${path}`,
  });
  res.end();
};

const Redirect = () => null;

export default Redirect;
