# [eorzea-time](https://www.npmjs.com/package/eorzea-time) [![CircleCI](https://circleci.com/gh/flowercartelet/eorzea-weather.svg?style=shield)](https://circleci.com/gh/flowercartelet/eorzea-weather)

:clock3: A clock of the Eorzea time

## Install

```console
$ npm install --save eorzea-time
```

or

```console
$ yarn add eorzea-time
```

or

Download the **eorzea-time.min.js** from [releases page](https://github.com/flowercartelet/eorzea-time/releases)

## Usage

### HTML

```html
<!-- ... -->
<dl>
  <dt>eorzea time
  <dd><span id="eorzea-time"></span>
</dl>
<script src="eorzea-time.min.js"></script>
<script>
(function() {
  'use strict';

  var result = document.getElementById('eorzea-time');

  (function timer() {
    setTimeout(function() {
      var eorzeaTime = new EorzeaTime();
      result.textContent = eorzeaTime.toString();
    }, 1000 / 60);
  })();
})();
</script>
<!-- ... -->
```

### Node

```javascript
var EorzeaTime = require('eorzea-time');

var eorzeaTime = new EorzeaTime();
console.log(eorzeaTime.toString());
```

### ES2015

```javascript
import EorzeaTime from 'eorzea-time';

const eorzeaTime = new EorzeaTime();
console.log(eorzeaTime.toString());
```

## License

[MIT](LICENSE)

```plain
FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
FINAL FANTASY XIV (c) 2010-2016 SQUARE ENIX CO., LTD. All Rights Reserved.
```
