import accepts from 'accepts';

const locales = ['en', 'ja'];

export const getServerSideProps = async ({ query, res, req }) => {
  const accept = accepts(req);
  const locale = locales.includes(query.locale)
    ? query.locale
    : accept.language(locales) || 'en';

  res.writeHead(307, {
    Location: `/${locale}`,
  });
  res.end();
};

const Home = () => null;

export default Home;
