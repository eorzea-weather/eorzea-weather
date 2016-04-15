import repeat from './repeat';

export default String.prototype.padStart ||
  function padStart(maxLength, fillString = ' ') {
    /* eslint-disable no-invalid-this */
    const string = String(this);
    const stringLength = string.length;
    if (maxLength <= stringLength) {
      return string;
    }
    const fillStringLength = String(fillString).length;
    const fillLength = maxLength - stringLength;
    const filler = repeat.call(
      fillString,
      Math.ceil(fillLength / fillStringLength)
    );
    return filler + string;
  };
