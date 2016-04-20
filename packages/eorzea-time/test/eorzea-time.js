import test from 'ava';
import sinon from 'sinon';
import EorzeaTime from '../lib/eorzea-time';

test.beforeEach(function(t) {
  const unixTime = Date.UTC(2016, 4, 20, 0, 0, 0);
  t.context.clock = sinon.useFakeTimers(unixTime);
});

test.afterEach(function(t) {
  t.context.clock.restore();
});

test(function toString(t) {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.toString(), '13:39:51');
});

test(function getHours(t) {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.getHours(), 13);
});

test(function getMinutes(t) {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.getMinutes(), 39);
});

test(function getSeconds(t) {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.getSeconds(), 51);
});
