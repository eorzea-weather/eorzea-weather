// original logic from https://github.com/super-aardvark/super-aardvark.github.io/blob/ecb3e95f563ab25c50426d0c5ced245d6a0af5d6/weather/weather.js

const weatherNames = {
  ja: {
    'Fair Skies': '晴れ',
    Gales: '暴風',
    Showers: '暴雨',
    Snow: '雪',
  },
};

const weatherChances = {
  eurekaAnemos(chance) {
    if (chance < 30) {
      return 'Fair Skies';
    }
    if (chance < 60) {
      return 'Gales';
    }
    if (chance < 90) {
      return 'Showers';
    }
    return 'Snow';
  },
};

// Thanks to Rogueadyn's SaintCoinach library for this calculation.
// lDate is the current local time.
const calculateForecastTarget = (msec) => {
  const unixtime = Math.floor(msec / 1000);
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
  static getWeather(msec, { zoneId, ...options } = {}) {
    return new EorzeaWeather(zoneId, options).getWeather(msec);
  }

  constructor(zoneId, { locale }) {
    this.zoneId = zoneId;
    this.locale = locale;
  }

  getWeather(msec) {
    const chance = calculateForecastTarget(msec);
    const weather = weatherChances[this.zoneId](chance);
    return this.translate(weather);
  }

  translate(weather) {
    return (weatherNames[this.locale] || {})[weather] || weather;
  }
}
