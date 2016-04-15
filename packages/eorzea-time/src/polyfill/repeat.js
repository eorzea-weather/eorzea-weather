export default String.prototype.repeat ||
  function repeat(count = 0) {
    /* eslint-disable no-invalid-this */
    const string = String(this);
    let n = +count;
    let result = '';
    while (n--) {
      result += string;
    }
    return result;
  };
