import EorzeaWeather from 'eorzea-weather';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  eureka: {
    defaultMessage: 'Eureka',
    id: 'zone_list.eureka',
  },
  gyrAbania: {
    defaultMessage: 'Gyr Abania',
    id: 'zone_list.gyr_abania',
  },
  ishgardAndSurroundingAreas: {
    defaultMessage: 'Ishgard and Surrounding Areas',
    id: 'zone_list.ishgard_and_surrounding_areas',
  },
  laNoscea: {
    defaultMessage: 'La Noscea',
    id: 'zone_list.la_noscea',
  },
  others: {
    defaultMessage: 'Others',
    id: 'zone_list.others',
  },
  thanalan: {
    defaultMessage: 'Thanalan',
    id: 'zone_list.thanalan',
  },
  theBlackShroud: {
    defaultMessage: 'The Black Shroud',
    id: 'zone_list.the_black_shroud',
  },
  theFarEast: {
    defaultMessage: 'The Far East',
    id: 'zone_list.the_far_east',
  },
});

export default ({ intl }) => ({
  [intl.formatMessage(messages.laNoscea)]: [
    EorzeaWeather.ZONE_LIMSA_LOMINSA,
    EorzeaWeather.ZONE_MIDDLE_LA_NOSCEA,
    EorzeaWeather.ZONE_LOWER_LA_NOSCEA,
    EorzeaWeather.ZONE_EASTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_WESTERN_LA_NOSCEA,
    EorzeaWeather.ZONE_UPPER_LA_NOSCEA,
    EorzeaWeather.ZONE_OUTER_LA_NOSCEA,
  ],
  [intl.formatMessage(messages.theBlackShroud)]: [
    EorzeaWeather.ZONE_GRIDANIA,
    EorzeaWeather.ZONE_CENTRAL_SHROUD,
    EorzeaWeather.ZONE_EAST_SHROUD,
    EorzeaWeather.ZONE_SOUTH_SHROUD,
    EorzeaWeather.ZONE_NORTH_SHROUD,
  ],
  [intl.formatMessage(messages.thanalan)]: [
    EorzeaWeather.ZONE_ULDAH,
    EorzeaWeather.ZONE_WESTERN_THANALAN,
    EorzeaWeather.ZONE_CENTRAL_THANALAN,
    EorzeaWeather.ZONE_EASTERN_THANALAN,
    EorzeaWeather.ZONE_SOUTHERN_THANALAN,
    EorzeaWeather.ZONE_NORTHERN_THANALAN,
  ],
  [intl.formatMessage(messages.ishgardAndSurroundingAreas)]: [
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
  [intl.formatMessage(messages.gyrAbania)]: [
    EorzeaWeather.ZONE_RHALGRS_REACH,
    EorzeaWeather.ZONE_THE_FRINGES,
    EorzeaWeather.ZONE_THE_PEAKS,
    EorzeaWeather.ZONE_THE_LOCHS,
  ],
  [intl.formatMessage(messages.theFarEast)]: [
    EorzeaWeather.ZONE_KUGANE,
    EorzeaWeather.ZONE_THE_RUBY_SEA,
    EorzeaWeather.ZONE_YANXIA,
    EorzeaWeather.ZONE_THE_AZIM_STEPPE,
  ],
  [intl.formatMessage(messages.others)]: [
    EorzeaWeather.ZONE_MIST,
    EorzeaWeather.ZONE_THE_LAVENDER_BEDS,
    EorzeaWeather.ZONE_THE_GOBLET,
    EorzeaWeather.ZONE_MOR_DHONA,
  ],
  [intl.formatMessage(messages.eureka)]: [
    EorzeaWeather.ZONE_EUREKA_ANEMOS,
  ],
});
