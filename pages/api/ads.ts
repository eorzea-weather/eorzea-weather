import { NextApiHandler } from 'next';

const handler: NextApiHandler<string> = (_req, res) => {
  let result = '';

  if (process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID) {
    const id = process.env.NEXT_PUBLIC_GOOGLE_ADCENSE_CLIENT_ID.slice(3);
    result += `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`;
  }

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'max-age=60');

  res.status(200).send(result);
};

export default handler;
