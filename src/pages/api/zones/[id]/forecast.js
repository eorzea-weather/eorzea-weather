import range from 'lodash/range';
import EorzeaWeather from 'eorzea-weather';

const EIGHT_HOURS = 8 * 175 * 1000;
const ONE_DAY = EIGHT_HOURS * 3;

const getStartTime = (date) => {
  const oneHour = 175 * 1000;
  const msec = date.getTime();
  const bell = (msec / oneHour) % 24;
  const startMsec = msec - Math.round(oneHour * bell);
  return new Date(startMsec);
};

const handler = (req, res) => {
  const { id, locale } = req.query;
  const eorzeaWeather = new EorzeaWeather(id, { locale });

  if (eorzeaWeather.validate()) {
    const startTime = getStartTime(new Date()) - (ONE_DAY * 2);
    const weathers = range(startTime, startTime + (ONE_DAY * 10), EIGHT_HOURS).map((time) => {
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
