import EorzeaWeather from 'eorzea-weather';

export const ZONE_GET_ALL = 'ZONE_GET_ALL';
export const ZONE_FETCH = 'ZONE_FETCH';

export const getAllZones = ({ locale }) => ({
  type: ZONE_GET_ALL,
  zones: [
    EorzeaWeather.ZONE_LIMSA_LOMINSA,
    EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA,
    EorzeaWeather.ZONE_LOWER_LA_NOSCEA,
    EorzeaWeather.ZONE_EASTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_WESTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_UPPER_LA_NOSCEA,
    EorzeaWeather.ZONE_OUTER_LA_NOSCEA,
    EorzeaWeather.ZONE_MIST,
    EorzeaWeather.ZONE_GRIDANIA,
    EorzeaWeather.ZONE_CENTRAL_SHROUD,
    EorzeaWeather.ZONE_EAST_SHROUD,
    EorzeaWeather.ZONE_SOUTH_SHROUD,
    EorzeaWeather.ZONE_NORTH_SHROUD,
    EorzeaWeather.ZONE_THE_LAVENDER_BEDS,
    EorzeaWeather.ZONE_ULDAH,
    EorzeaWeather.ZONE_WESTERN_THANALAN,
    EorzeaWeather.ZONE_CENTRAL_THANALAN,
    EorzeaWeather.ZONE_EASTERN_THANALAN,
    EorzeaWeather.ZONE_SOUTHERN_THANALAN,
    EorzeaWeather.ZONE_NORTHERN_THANALAN,
    EorzeaWeather.ZONE_THE_GOBLET,
    EorzeaWeather.ZONE_MOR_DHONA,
    EorzeaWeather.ZONE_ISHGARD,
    EorzeaWeather.ZONE_COERTHAS_CENTRAL_HIGHLANDS,
    EorzeaWeather.ZONE_COERTHAS_WESTERN_HIGHLANDS,
    EorzeaWeather.ZONE_THE_SEA_OF_CLOUDS,
    EorzeaWeather.ZONE_AZYS_LLA,
    EorzeaWeather.ZONE_THE_DRAVANIAN_FORELANDS,
    EorzeaWeather.ZONE_THE_DRAVANIAN_HINTERLANDS,
    EorzeaWeather.ZONE_THE_CHURNING_MISTS,
    EorzeaWeather.ZONE_IDYLLSHIRE,
    EorzeaWeather.ZONE_RHALGRS_REACH,
    EorzeaWeather.ZONE_THE_FRINGES,
    EorzeaWeather.ZONE_THE_PEAKS,
    EorzeaWeather.ZONE_THE_LOCHS,
    EorzeaWeather.ZONE_KUGANE,
    EorzeaWeather.ZONE_THE_RUBY_SEA,
    EorzeaWeather.ZONE_YANXIA,
    EorzeaWeather.ZONE_THE_AZIM_STEPPE,
    EorzeaWeather.ZONE_EUREKA_ANEMOS,
  ].reduce((zones, zoneId) => ({
    ...zones,
    [zoneId]: {
      id: zoneId,
      name: new EorzeaWeather(zoneId, { locale }).getZoneName(),
    },
  }), {}),
});

export const fetchZone = (zoneId, { locale }) => {
  const eorzeaWeather = new EorzeaWeather(zoneId, { locale });
  return {
    name: eorzeaWeather.getZoneName(),
    type: ZONE_FETCH,
    zoneId,
  };
};
