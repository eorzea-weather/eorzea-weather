import { useMessageFormatter } from '@react-aria/i18n';
import EorzeaWeather from 'eorzea-weather';
import snakeCase from 'lodash/snakeCase';
import { useContext } from 'react';
import Context, { Zone } from './Context';
import messages from './intl';

export function useZone({ id }: { id: string }): Zone {
  const { zones } = useContext(Context);

  return zones[id];
}

const areaMap = {
  laNoscea: [
    EorzeaWeather.ZONE_LIMSA_LOMINSA,
    EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA,
    EorzeaWeather.ZONE_LOWER_LA_NOSCEA,
    EorzeaWeather.ZONE_EASTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_WESTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_UPPER_LA_NOSCEA,
    EorzeaWeather.ZONE_OUTER_LA_NOSCEA,
    EorzeaWeather.ZONE_WOLVES_DEN_PIER,
  ],
  theBlackShroud: [
    EorzeaWeather.ZONE_GRIDANIA,
    EorzeaWeather.ZONE_CENTRAL_SHROUD,
    EorzeaWeather.ZONE_EAST_SHROUD,
    EorzeaWeather.ZONE_SOUTH_SHROUD,
    EorzeaWeather.ZONE_NORTH_SHROUD,
  ],
  thanalan: [
    EorzeaWeather.ZONE_ULDAH,
    EorzeaWeather.ZONE_WESTERN_THANALAN,
    EorzeaWeather.ZONE_CENTRAL_THANALAN,
    EorzeaWeather.ZONE_EASTERN_THANALAN,
    EorzeaWeather.ZONE_SOUTHERN_THANALAN,
    EorzeaWeather.ZONE_NORTHERN_THANALAN,
  ],
  ishgardAndSurroundingAreas: [
    EorzeaWeather.ZONE_ISHGARD,
    EorzeaWeather.ZONE_COERTHAS_CENTRAL_HIGHLANDS,
    EorzeaWeather.ZONE_COERTHAS_WESTERN_HIGHLANDS,
    EorzeaWeather.ZONE_THE_SEA_OF_CLOUDS,
    EorzeaWeather.ZONE_AZYS_LLA,
    EorzeaWeather.ZONE_IDYLLSHIRE,
    EorzeaWeather.ZONE_THE_DRAVANIAN_FORELANDS,
    EorzeaWeather.ZONE_THE_DRAVANIAN_HINTERLANDS,
    EorzeaWeather.ZONE_THE_CHURNING_MISTS,
  ],
  gyrAbania: [
    EorzeaWeather.ZONE_RHALGRS_REACH,
    EorzeaWeather.ZONE_THE_FRINGES,
    EorzeaWeather.ZONE_THE_PEAKS,
    EorzeaWeather.ZONE_THE_LOCHS,
  ],
  theFarEast: [
    EorzeaWeather.ZONE_KUGANE,
    EorzeaWeather.ZONE_THE_RUBY_SEA,
    EorzeaWeather.ZONE_YANXIA,
    EorzeaWeather.ZONE_THE_AZIM_STEPPE,
  ],
  norvrandt: [
    EorzeaWeather.ZONE_THE_CRYSTARIUM,
    EorzeaWeather.ZONE_EULMORE,
    EorzeaWeather.ZONE_LAKELAND,
    EorzeaWeather.ZONE_KHOLUSIA,
    EorzeaWeather.ZONE_AMH_ARAENG,
    EorzeaWeather.ZONE_IL_MHEG,
    EorzeaWeather.ZONE_THE_RAKTIKA_GREATWOOD,
    EorzeaWeather.ZONE_THE_TEMPEST,
  ],
  others: [
    EorzeaWeather.ZONE_MIST,
    EorzeaWeather.ZONE_THE_LAVENDER_BEDS,
    EorzeaWeather.ZONE_THE_GOBLET,
    EorzeaWeather.ZONE_SHIROGANE,
    EorzeaWeather.ZONE_MOR_DHONA,
    EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
  ],
  eureka: [
    EorzeaWeather.ZONE_EUREKA_ANEMOS,
    EorzeaWeather.ZONE_EUREKA_PAGOS,
    EorzeaWeather.ZONE_EUREKA_PYROS,
    EorzeaWeather.ZONE_EUREKA_HYDATOS,
  ],
};

type ZoneList = {
  [area: string]: Zone[];
};

export function useZoneList(): ZoneList {
  const { zones } = useContext(Context);
  const formatMessage = useMessageFormatter(messages);

  return Object.entries(areaMap).reduce(
    (list, [key, ids]) => ({
      ...list,
      [formatMessage(snakeCase(key))]: ids.map((id) => zones[id]),
    }),
    {},
  );
}
