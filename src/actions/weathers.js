import range from 'lodash/range';
import EorzeaWeather from '../eorzea-weather';

export const WEATHER_FETCH = 'WEATHER_FETCH';

const getStartTime = (date) => {
  const oneHour = 175 * 1000;
  const msec = date.getTime();
  const bell = (msec / oneHour) % 24;
  const startMsec = msec - Math.round(oneHour * bell);
  return new Date(startMsec);
};

const getWeathers = ({ locale, zoneId }, baseTime = new Date()) => {
  const step = 8 * 175 * 1000; // 8 hours
  const startTime = getStartTime(baseTime) - (step * 6);
  return range(startTime, startTime + (step * 30), step).map(time => ({
    name: EorzeaWeather.getWeather(time, { locale, zoneId }),
    startedAt: new Date(time),
  }));
};

export const fetchWeathers = (zoneId, { locale }) => ({
  type: WEATHER_FETCH,
  weathers: getWeathers({ locale, zoneId }),
  zoneId,
});
