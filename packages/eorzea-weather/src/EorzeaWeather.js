import * as weatherChances from './chances';
import * as locales from './locales/index';
import calculateForecastTarget from './utils/calculateForecastTarget';
import * as zones from './zones';

const DEFAULT_LOCALE = 'en';

export default class EorzeaWeather {
  static get ZONE_AMH_ARAENG() {
    return zones.ZONE_AMH_ARAENG;
  }

  static get ZONE_AZYS_LLA() {
    return zones.ZONE_AZYS_LLA;
  }

  static get ZONE_CENTRAL_SHROUD() {
    return zones.ZONE_CENTRAL_SHROUD;
  }

  static get ZONE_CENTRAL_THANALAN() {
    return zones.ZONE_CENTRAL_THANALAN;
  }

  static get ZONE_COERTHAS_CENTRAL_HIGHLANDS() {
    return zones.ZONE_COERTHAS_CENTRAL_HIGHLANDS;
  }

  static get ZONE_COERTHAS_WESTERN_HIGHLANDS() {
    return zones.ZONE_COERTHAS_WESTERN_HIGHLANDS;
  }

  static get ZONE_EAST_SHROUD() {
    return zones.ZONE_EAST_SHROUD;
  }

  static get ZONE_EASTERN_LA_NOSCEA() {
    return zones.ZONE_EASTERN_LA_NOSCEA;
  }

  static get ZONE_EASTERN_THANALAN() {
    return zones.ZONE_EASTERN_THANALAN;
  }

  static get ZONE_EULMORE() {
    return zones.ZONE_EULMORE;
  }

  static get ZONE_EUREKA_ANEMOS() {
    return zones.ZONE_EUREKA_ANEMOS;
  }

  static get ZONE_EUREKA_HYDATOS() {
    return zones.ZONE_EUREKA_HYDATOS;
  }

  static get ZONE_EUREKA_PAGOS() {
    return zones.ZONE_EUREKA_PAGOS;
  }

  static get ZONE_EUREKA_PYROS() {
    return zones.ZONE_EUREKA_PYROS;
  }

  static get ZONE_GRIDANIA() {
    return zones.ZONE_GRIDANIA;
  }

  static get ZONE_IDYLLSHIRE() {
    return zones.ZONE_IDYLLSHIRE;
  }

  static get ZONE_IL_MHEG() {
    return zones.ZONE_IL_MHEG;
  }

  static get ZONE_ISHGARD() {
    return zones.ZONE_ISHGARD;
  }

  static get ZONE_KHOLUSIA() {
    return zones.ZONE_KHOLUSIA;
  }

  static get ZONE_KUGANE() {
    return zones.ZONE_KUGANE;
  }

  static get ZONE_LAKELAND() {
    return zones.ZONE_LAKELAND;
  }

  static get ZONE_LIMSA_LOMINSA() {
    return zones.ZONE_LIMSA_LOMINSA;
  }

  static get ZONE_LOWER_LA_NOSCEA() {
    return zones.ZONE_LOWER_LA_NOSCEA;
  }

  static get ZONE_MIDDLE_LA_NOSCEA() {
    return zones.ZONE_MIDDLE_LA_NOSCEA;
  }

  static get ZONE_MIST() {
    return zones.ZONE_MIST;
  }

  static get ZONE_MOR_DHONA() {
    return zones.ZONE_MOR_DHONA;
  }

  static get ZONE_NORTH_SHROUD() {
    return zones.ZONE_NORTH_SHROUD;
  }

  static get ZONE_NORTHERN_THANALAN() {
    return zones.ZONE_NORTHERN_THANALAN;
  }

  static get ZONE_OUTER_LA_NOSCEA() {
    return zones.ZONE_OUTER_LA_NOSCEA;
  }

  static get ZONE_RHALGRS_REACH() {
    return zones.ZONE_RHALGRS_REACH;
  }

  static get ZONE_SHIROGANE() {
    return zones.ZONE_SHIROGANE;
  }

  static get ZONE_SOUTH_SHROUD() {
    return zones.ZONE_SOUTH_SHROUD;
  }

  static get ZONE_SOUTHERN_THANALAN() {
    return zones.ZONE_SOUTHERN_THANALAN;
  }

  static get ZONE_THE_AZIM_STEPPE() {
    return zones.ZONE_THE_AZIM_STEPPE;
  }

  static get ZONE_THE_CHURNING_MISTS() {
    return zones.ZONE_THE_CHURNING_MISTS;
  }

  static get ZONE_THE_CRYSTARIUM() {
    return zones.ZONE_THE_CRYSTARIUM;
  }

  static get ZONE_THE_DIADEM() {
    return zones.ZONE_THE_DIADEM;
  }

  static get ZONE_THE_DRAVANIAN_FORELANDS() {
    return zones.ZONE_THE_DRAVANIAN_FORELANDS;
  }

  static get ZONE_THE_DRAVANIAN_HINTERLANDS() {
    return zones.ZONE_THE_DRAVANIAN_HINTERLANDS;
  }

  static get ZONE_THE_FRINGES() {
    return zones.ZONE_THE_FRINGES;
  }

  static get ZONE_THE_GOBLET() {
    return zones.ZONE_THE_GOBLET;
  }

  static get ZONE_THE_LAVENDER_BEDS() {
    return zones.ZONE_THE_LAVENDER_BEDS;
  }

  static get ZONE_THE_LOCHS() {
    return zones.ZONE_THE_LOCHS;
  }

  static get ZONE_THE_PEAKS() {
    return zones.ZONE_THE_PEAKS;
  }

  static get ZONE_THE_RAKTIKA_GREATWOOD() {
    return zones.ZONE_THE_RAKTIKA_GREATWOOD;
  }

  static get ZONE_THE_RUBY_SEA() {
    return zones.ZONE_THE_RUBY_SEA;
  }

  static get ZONE_THE_SEA_OF_CLOUDS() {
    return zones.ZONE_THE_SEA_OF_CLOUDS;
  }

  static get ZONE_THE_TEMPEST() {
    return zones.ZONE_THE_TEMPEST;
  }

  static get ZONE_ULDAH() {
    return zones.ZONE_ULDAH;
  }

  static get ZONE_UPPER_LA_NOSCEA() {
    return zones.ZONE_UPPER_LA_NOSCEA;
  }

  static get ZONE_WESTERN_LA_NOSCEA() {
    return zones.ZONE_WESTERN_LA_NOSCEA;
  }

  static get ZONE_WESTERN_THANALAN() {
    return zones.ZONE_WESTERN_THANALAN;
  }

  static get ZONE_WOLVES_DEN_PIER() {
    return zones.ZONE_WOLVES_DEN_PIER;
  }

  static get ZONE_YANXIA() {
    return zones.ZONE_YANXIA;
  }

  static getWeather(zoneId, date, options = {}) {
    return new EorzeaWeather(zoneId, options).getWeather(date);
  }

  constructor(zoneId, { locale = DEFAULT_LOCALE } = {}) {
    this.zoneId = zoneId;
    this.locale = locale;
  }

  getWeather(date) {
    if (!this.validate()) {
      throw new TypeError(`'${this.zoneId}' is undefined zone ID.`);
    }
    const chance = calculateForecastTarget(date);
    const weatherId = weatherChances[this.zoneId](chance);
    return this.translate(`weathers.${weatherId}`);
  }

  getZoneName() {
    if (!this.validate()) {
      throw new TypeError(`'${this.zoneId}' is undefined zone ID.`);
    }
    return this.translate(`zones.${this.zoneId}`);
  }

  translate(key) {
    return locales[this.locale][key];
  }

  validate() {
    const key = `ZONE_${this.zoneId.replace(/[A-Z]/g, (w) => `_${w}`).toUpperCase()}`;
    return EorzeaWeather[key] === this.zoneId;
  }
}
