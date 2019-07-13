const privateDateProperty = typeof Symbol === 'function'
  ? Symbol('privateDateProperty') : '_privateDateProperty';

function computeEorzeaDate(date) {
  const eorzeaTime = new Date();
  const unixTime = Math.floor(date.getTime() * (1440 / 70));
  eorzeaTime.setTime(unixTime);
  return eorzeaTime;
}

export default class EorzeaTime {
  constructor(date = new Date()) {
    this[privateDateProperty] = computeEorzeaDate(date);
  }

  getHours() {
    return this[privateDateProperty].getUTCHours();
  }

  getMinutes() {
    return this[privateDateProperty].getUTCMinutes();
  }

  getSeconds() {
    return this[privateDateProperty].getUTCSeconds();
  }

  toString() {
    return [
      `0${this.getHours()}`.slice(-2),
      `0${this.getMinutes()}`.slice(-2),
      `0${this.getSeconds()}`.slice(-2),
    ].join(':');
  }

  toJSON() {
    return this.toString();
  }
}
