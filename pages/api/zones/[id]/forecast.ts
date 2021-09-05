import range from 'lodash/range';
import { NextApiHandler } from 'next';
import EorzeaWeather from 'eorzea-weather';

const EIGHT_HOURS = 8 * 175 * 1000;
const ONE_DAY = EIGHT_HOURS * 3;

const getStartTime = (date: Date): Date => {
  const oneHour = 175 * 1000;
  const msec = date.getTime();
  const bell = (msec / oneHour) % 24;
  const startMsec = msec - Math.round(oneHour * bell);
  return new Date(startMsec);
};

const handler: NextApiHandler = (req, res) => {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const locale = Array.isArray(req.query.locale)
    ? req.query.locale[0]
    : req.query.locale;
  const eorzeaWeather = new EorzeaWeather(id, { locale });

  if (eorzeaWeather.validate()) {
    const startTime = getStartTime(new Date()).getTime() - ONE_DAY * 2;
    const weathers = range(
      startTime,
      startTime + ONE_DAY * 10,
      EIGHT_HOURS,
    ).map((time) => {
      const startedAt = new Date(time);
      return {
        name: eorzeaWeather.getWeather(startedAt),
        startedAt,
      };
    });

    res.json(weathers);
  } else {
    res.status(404).json([]);
  }
};

export default handler;
