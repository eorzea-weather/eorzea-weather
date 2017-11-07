import test from 'ava';
import EorzeaTime from '..';

test.beforeEach(function(t) {
  const unixTime = Date.UTC(2016, 4, 20, 0, 0, 0);
  const date = new Date(unixTime);
  t.context.eorzeaTime = new EorzeaTime(date);
});

test.afterEach(function(t) {
  t.context.eorzeaTime = undefined;
});

test(function toJSON(t) {
  const eorzeaTime = t.context.eorzeaTime;
  t.deepEqual(eorzeaTime.toJSON(), '13:42:51');
});

test(function returnsSameAsToString(t) {
  const eorzeaTime = t.context.eorzeaTime;
  t.deepEqual(eorzeaTime.toJSON(), eorzeaTime.toString());
});

test(function jsonStringify(t) {
  const eorzeaTime = t.context.eorzeaTime;
  t.deepEqual(JSON.stringify(eorzeaTime), '"13:42:51"');
});

test(function jsonFromObject(t) {
  const eorzeaTime = t.context.eorzeaTime;
  const object = {
    time: eorzeaTime
  };
  t.deepEqual(JSON.stringify(object), '{"time":"13:42:51"}');
});
