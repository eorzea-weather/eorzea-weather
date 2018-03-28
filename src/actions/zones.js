import zones from '../zones.json';

export const ZONE_FETCH = 'ZONE_FETCH';

export const fetchZone = (zoneId, { locale }) => {
  const zone = zones[zoneId];
  return {
    name: zone[locale] || zone.en,
    type: ZONE_FETCH,
    zoneId,
  };
};
