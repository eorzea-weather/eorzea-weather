import EorzeaWeather from 'eorzea-weather';

export const ZONE_FETCH = 'ZONE_FETCH';

export const fetchZone = (zoneId, { locale }) => {
  const eorzeaWeather = new EorzeaWeather(zoneId, { locale });
  return {
    name: eorzeaWeather.getZoneName(),
    type: ZONE_FETCH,
    zoneId,
  };
};
