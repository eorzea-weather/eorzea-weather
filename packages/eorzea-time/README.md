# eorzea-time

:clock3: A clock of the Eorzea time

## Install

```shell
npm install --save eorzea-time
```

## Usage

### ES2015

```javascript
import EorzeaTime from 'eorzea-time';

const eorzeaTime = new EorzeaTime();
console.log(eorzeaTime.toString);
```

### HTML

```html
<!-- ... -->
<dl>
  <dt>eorzea time
  <dd><span id="eorzea-time"></span>
</dl>
<script src="eorzea-time.js"></script>
<script>
(function() {
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

## License

[MIT](LICENSE)

FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.

FINAL FANTASY XIV (c) 2010-2016 SQUARE ENIX CO., LTD. All Rights Reserved.
