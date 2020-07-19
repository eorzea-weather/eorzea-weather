// Thanks to Rogueadyn's SaintCoinach library for this calculation.
// lDate is the current local time.
export default (date: Date): number => {
  const unixtime = Math.floor(date.getTime() / 1000);
  // Get Eorzea hour for weather start
  const bell = unixtime / 175;

  // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
  const increment = (bell + 8 - (bell % 8)) % 24;

  // Take Eorzea days since unix epoch
  let totalDays = unixtime / 4200;
  totalDays = (totalDays << 32) >>> 0; // eslint-disable-line no-bitwise

  const calcBase = totalDays * 0x64 + increment;

  /* eslint-disable no-bitwise */
  const step1 = ((calcBase << 0xb) ^ calcBase) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;
  /* eslint-enable no-bitwise */

  return step2 % 0x64;
};
