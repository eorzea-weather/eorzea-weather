function computeEorzeaDate(date: Date): Date {
  const eorzeaTime = new Date();
  const unixTime = Math.floor(date.getTime() * (1440 / 70));
  eorzeaTime.setTime(unixTime);
  return eorzeaTime;
}

export default class EorzeaTime {
  #date: Date;

  constructor(date = new Date()) {
    this.#date = computeEorzeaDate(date);
  }

  getHours(): number {
    return this.#date.getUTCHours();
  }

  getMinutes(): number {
    return this.#date.getUTCMinutes();
  }

  getSeconds(): number {
    return this.#date.getUTCSeconds();
  }

  toString(): string {
    return [
      `0${this.getHours()}`.slice(-2),
      `0${this.getMinutes()}`.slice(-2),
      `0${this.getSeconds()}`.slice(-2),
    ].join(':');
  }

  toJSON(): string {
    return this.toString();
  }
}
