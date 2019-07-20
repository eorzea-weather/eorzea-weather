import test from 'ava';
import EorzeaTime from '..'; // eslint-disable-line import/extensions, import/no-unresolved

test('1', (t) => {
  const unixTime = Date.UTC(2015, 6, 23, 9, 0, 0);
  const date = new Date(unixTime);
  const eorzeaTime = new EorzeaTime(date);
  t.deepEqual(eorzeaTime.toString(), '17:08:34');
});

test('2', (t) => {
  const unixTime = Date.UTC(2015, 6, 23, 9, 0, 0);
  const date = new Date(unixTime);
  const eorzeaTime = new EorzeaTime(date);
  t.deepEqual(eorzeaTime.getHours(), 17);
});

test('3', (t) => {
  const unixTime = Date.UTC(2015, 6, 23, 9, 0, 0);
  const date = new Date(unixTime);
  const eorzeaTime = new EorzeaTime(date);
  t.deepEqual(eorzeaTime.getMinutes(), 8);
});

test('4', (t) => {
  const unixTime = Date.UTC(2015, 6, 23, 9, 0, 0);
  const date = new Date(unixTime);
  const eorzeaTime = new EorzeaTime(date);
  t.deepEqual(eorzeaTime.getSeconds(), 34);
});
