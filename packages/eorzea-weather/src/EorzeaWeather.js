import * as weatherChances from './chances';
import * as locales from './locales/index';
import * as zones from './zones';

const DEFAULT_LOCALE = 'en';

// Thanks to Rogueadyn's SaintCoinach library for this calculation.
// lDate is the current local time.
const calculateForecastTarget = (date) => {
  const unixtime = Math.floor(date.getTime() / 1000);
  // Get Eorzea hour for weather start
  const bell = unixtime / 175;

  // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
  const increment = ((bell + 8) - (bell % 8)) % 24;

  // Take Eorzea days since unix epoch
  let totalDays = unixtime / 4200;
  totalDays = (totalDays << 32) >>> 0; // eslint-disable-line no-bitwise

  const calcBase = (totalDays * 0x64) + increment;

  /* eslint-disable no-bitwise */
  const step1 = ((calcBase << 0xB) ^ calcBase) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;
  /* eslint-enable no-bitwise */

  return step2 % 0x64;
};

export default class EorzeaWeather {
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
    return Object.keys(zones).some(key => zones[key] === this.zoneId);
  }
}

Object.keys(zones).forEach((key) => {
  EorzeaWeather[key] = zones[key];
});
