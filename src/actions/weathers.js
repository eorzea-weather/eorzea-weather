import range from 'lodash/range';
import EorzeaWeather from 'eorzea-weather';

const EIGHT_HOURS = 8 * 175 * 1000;
const ONE_DAY = EIGHT_HOURS * 3;

export const WEATHER_FETCH = 'WEATHER_FETCH';

const getStartTime = (date) => {
  const oneHour = 175 * 1000;
  const msec = date.getTime();
  const bell = (msec / oneHour) % 24;
  const startMsec = msec - Math.round(oneHour * bell);
  return new Date(startMsec);
};

const getWeathers = ({ locale, zoneId }, baseTime = new Date()) => {
  const eorzeaWeather = new EorzeaWeather(zoneId, { locale });
  const startTime = getStartTime(baseTime) - (ONE_DAY * 2);
  return range(startTime, startTime + (ONE_DAY * 10), EIGHT_HOURS).map((time) => {
    const startedAt = new Date(time);
    return {
      name: eorzeaWeather.getWeather(startedAt),
      startedAt,
    };
  });
};

export const fetchWeathers = (zoneId, { locale }) => ({
  type: WEATHER_FETCH,
  weathers: getWeathers({ locale, zoneId }),
  zoneId,
});
