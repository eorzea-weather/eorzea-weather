import accepts from 'accepts';

const locales = ['en', 'ja'];

export const getServerSideProps = async ({ params, query, res, req }) => {
  const accept = accepts(req);
  const locale = locales.includes(query.locale)
    ? query.locale
    : accept.language(locales) || 'en';

  res.writeHead(307, {
    Location: `/${locale}/zones/${params.id}`,
  });
  res.end();
};

const Zone = () => null;

export default Zone;
