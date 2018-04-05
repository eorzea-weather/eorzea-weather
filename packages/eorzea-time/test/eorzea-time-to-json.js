import test from 'ava';
import EorzeaTime from '..'; // eslint-disable-line import/extensions, import/no-unresolved

test.beforeEach((t) => {
  const unixTime = Date.UTC(2016, 4, 20, 0, 0, 0);
  const date = new Date(unixTime);
  Object.assign(t.context, {
    eorzeaTime: new EorzeaTime(date),
  });
});

test.afterEach(t => Object.assign(t.context, { eorzeaTime: undefined }));

test((t) => {
  const { eorzeaTime } = t.context;
  t.deepEqual(eorzeaTime.toJSON(), '13:42:51');
});

test((t) => {
  const { eorzeaTime } = t.context;
  t.deepEqual(eorzeaTime.toJSON(), eorzeaTime.toString());
});

test((t) => {
  const { eorzeaTime } = t.context;
  t.deepEqual(JSON.stringify(eorzeaTime), '"13:42:51"');
});

test((t) => {
  const { eorzeaTime } = t.context;
  const object = {
    time: eorzeaTime,
  };
  t.deepEqual(JSON.stringify(object), '{"time":"13:42:51"}');
});
