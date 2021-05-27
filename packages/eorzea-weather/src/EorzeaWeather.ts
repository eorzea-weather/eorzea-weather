import * as weatherChances from './chances';
import * as locales from './locales';
import calculateForecastTarget from './utils/calculateForecastTarget';
import * as zones from './zones';

const DEFAULT_LOCALE = 'en';

export interface EorzeaWeatherOptions {
  locale?: string;
}

export default class EorzeaWeather {
  static get ZONE_AMH_ARAENG(): string {
    return zones.ZONE_AMH_ARAENG;
  }

  static get ZONE_AZYS_LLA(): string {
    return zones.ZONE_AZYS_LLA;
  }

  static get ZONE_BOZJAN_SOUTHERN_FRONT(): string {
    return zones.ZONE_BOZJAN_SOUTHERN_FRONT;
  }

  static get ZONE_CENTRAL_SHROUD(): string {
    return zones.ZONE_CENTRAL_SHROUD;
  }

  static get ZONE_CENTRAL_THANALAN(): string {
    return zones.ZONE_CENTRAL_THANALAN;
  }

  static get ZONE_COERTHAS_CENTRAL_HIGHLANDS(): string {
    return zones.ZONE_COERTHAS_CENTRAL_HIGHLANDS;
  }

  static get ZONE_COERTHAS_WESTERN_HIGHLANDS(): string {
    return zones.ZONE_COERTHAS_WESTERN_HIGHLANDS;
  }

  static get ZONE_EAST_SHROUD(): string {
    return zones.ZONE_EAST_SHROUD;
  }

  static get ZONE_EASTERN_LA_NOSCEA(): string {
    return zones.ZONE_EASTERN_LA_NOSCEA;
  }

  static get ZONE_EASTERN_THANALAN(): string {
    return zones.ZONE_EASTERN_THANALAN;
  }

  static get ZONE_EULMORE(): string {
    return zones.ZONE_EULMORE;
  }

  static get ZONE_EUREKA_ANEMOS(): string {
    return zones.ZONE_EUREKA_ANEMOS;
  }

  static get ZONE_EUREKA_HYDATOS(): string {
    return zones.ZONE_EUREKA_HYDATOS;
  }

  static get ZONE_EUREKA_PAGOS(): string {
    return zones.ZONE_EUREKA_PAGOS;
  }

  static get ZONE_EUREKA_PYROS(): string {
    return zones.ZONE_EUREKA_PYROS;
  }

  static get ZONE_GRIDANIA(): string {
    return zones.ZONE_GRIDANIA;
  }

  static get ZONE_IDYLLSHIRE(): string {
    return zones.ZONE_IDYLLSHIRE;
  }

  static get ZONE_IL_MHEG(): string {
    return zones.ZONE_IL_MHEG;
  }

  static get ZONE_ISHGARD(): string {
    return zones.ZONE_ISHGARD;
  }

  static get ZONE_KHOLUSIA(): string {
    return zones.ZONE_KHOLUSIA;
  }

  static get ZONE_KUGANE(): string {
    return zones.ZONE_KUGANE;
  }

  static get ZONE_LAKELAND(): string {
    return zones.ZONE_LAKELAND;
  }

  static get ZONE_LIMSA_LOMINSA(): string {
    return zones.ZONE_LIMSA_LOMINSA;
  }

  static get ZONE_LOWER_LA_NOSCEA(): string {
    return zones.ZONE_LOWER_LA_NOSCEA;
  }

  static get ZONE_MIDDLE_LA_NOSCEA(): string {
    return zones.ZONE_MIDDLE_LA_NOSCEA;
  }

  static get ZONE_MIST(): string {
    return zones.ZONE_MIST;
  }

  static get ZONE_MOR_DHONA(): string {
    return zones.ZONE_MOR_DHONA;
  }

  static get ZONE_NORTH_SHROUD(): string {
    return zones.ZONE_NORTH_SHROUD;
  }

  static get ZONE_NORTHERN_THANALAN(): string {
    return zones.ZONE_NORTHERN_THANALAN;
  }

  static get ZONE_OUTER_LA_NOSCEA(): string {
    return zones.ZONE_OUTER_LA_NOSCEA;
  }

  static get ZONE_RHALGRS_REACH(): string {
    return zones.ZONE_RHALGRS_REACH;
  }

  static get ZONE_SHIROGANE(): string {
    return zones.ZONE_SHIROGANE;
  }

  static get ZONE_SOUTH_SHROUD(): string {
    return zones.ZONE_SOUTH_SHROUD;
  }

  static get ZONE_SOUTHERN_THANALAN(): string {
    return zones.ZONE_SOUTHERN_THANALAN;
  }

  static get ZONE_THE_AZIM_STEPPE(): string {
    return zones.ZONE_THE_AZIM_STEPPE;
  }

  static get ZONE_THE_CHURNING_MISTS(): string {
    return zones.ZONE_THE_CHURNING_MISTS;
  }

  static get ZONE_THE_CRYSTARIUM(): string {
    return zones.ZONE_THE_CRYSTARIUM;
  }

  static get ZONE_THE_DIADEM(): string {
    return zones.ZONE_THE_DIADEM;
  }

  static get ZONE_THE_DRAVANIAN_FORELANDS(): string {
    return zones.ZONE_THE_DRAVANIAN_FORELANDS;
  }

  static get ZONE_THE_DRAVANIAN_HINTERLANDS(): string {
    return zones.ZONE_THE_DRAVANIAN_HINTERLANDS;
  }

  static get ZONE_THE_FRINGES(): string {
    return zones.ZONE_THE_FRINGES;
  }

  static get ZONE_THE_GOBLET(): string {
    return zones.ZONE_THE_GOBLET;
  }

  static get ZONE_THE_LAVENDER_BEDS(): string {
    return zones.ZONE_THE_LAVENDER_BEDS;
  }

  static get ZONE_THE_LOCHS(): string {
    return zones.ZONE_THE_LOCHS;
  }

  static get ZONE_THE_PEAKS(): string {
    return zones.ZONE_THE_PEAKS;
  }

  static get ZONE_THE_RAKTIKA_GREATWOOD(): string {
    return zones.ZONE_THE_RAKTIKA_GREATWOOD;
  }

  static get ZONE_THE_RUBY_SEA(): string {
    return zones.ZONE_THE_RUBY_SEA;
  }

  static get ZONE_THE_SEA_OF_CLOUDS(): string {
    return zones.ZONE_THE_SEA_OF_CLOUDS;
  }

  static get ZONE_THE_TEMPEST(): string {
    return zones.ZONE_THE_TEMPEST;
  }

  static get ZONE_ULDAH(): string {
    return zones.ZONE_ULDAH;
  }

  static get ZONE_UPPER_LA_NOSCEA(): string {
    return zones.ZONE_UPPER_LA_NOSCEA;
  }

  static get ZONE_WESTERN_LA_NOSCEA(): string {
    return zones.ZONE_WESTERN_LA_NOSCEA;
  }

  static get ZONE_WESTERN_THANALAN(): string {
    return zones.ZONE_WESTERN_THANALAN;
  }

  static get ZONE_WOLVES_DEN_PIER(): string {
    return zones.ZONE_WOLVES_DEN_PIER;
  }

  static get ZONE_YANXIA(): string {
    return zones.ZONE_YANXIA;
  }

  static get ZONE_ZADNOR(): string {
    return zones.ZONE_ZADNOR;
  }

  static getWeather(
    id: string,
    date: Date,
    options: EorzeaWeatherOptions = {},
  ): string {
    return new EorzeaWeather(id, options).getWeather(date);
  }

  #id: string;
  #locale: string;

  constructor(
    id: string,
    { locale = DEFAULT_LOCALE }: EorzeaWeatherOptions = {},
  ) {
    this.#id = id;
    this.#locale = locale;
  }

  getWeather(date: Date): string {
    if (!this.validate()) {
      throw new TypeError(`'${this.#id}' is undefined zone ID.`);
    }
    const chance = calculateForecastTarget(date);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const id: string = weatherChances[this.#id](chance);
    return this.translate(`weathers.${id}`);
  }

  getZoneName(): string {
    if (!this.validate()) {
      throw new TypeError(`'${this.#id}' is undefined zone ID.`);
    }
    return this.translate(`zones.${this.#id}`);
  }

  translate(key: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const value: string | undefined = locales[this.#locale][key];
    if (!value) {
      throw new TypeError(`'${key}' is undefined translate ID.`);
    }
    return value;
  }

  validate(): boolean {
    const key = `ZONE_${this.#id
      .replace(/[A-Z]/g, (w) => `_${w}`)
      .toUpperCase()}`;
    return zones[key] === this.#id;
  }
}
