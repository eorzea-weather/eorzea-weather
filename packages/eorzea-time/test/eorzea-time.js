import test from 'ava';
import sinon from 'sinon';
import EorzeaTime from '..'; // eslint-disable-line import/extensions, import/no-unresolved

test.beforeEach((t) => {
  const unixTime = Date.UTC(2016, 4, 20, 0, 0, 0);
  Object.assign(t.context, {
    clock: sinon.useFakeTimers(unixTime),
  });
});

test.afterEach((t) => {
  t.context.clock.restore();
});

test((t) => {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.toString(), '13:42:51');
});

test((t) => {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.getHours(), 13);
});

test((t) => {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.getMinutes(), 42);
});

test((t) => {
  const eorzeaTime = new EorzeaTime();
  t.deepEqual(eorzeaTime.getSeconds(), 51);
});

