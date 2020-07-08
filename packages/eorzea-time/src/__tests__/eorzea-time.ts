import EorzeaTime from '../eorzea-time';

test('1', () => {
  const date = new Date(Date.UTC(2016, 4, 20, 0, 0, 0));
  const eorzeaTime = new EorzeaTime(date);
  expect(eorzeaTime.toString()).toBe('13:42:51')
})

test('2', () => {
  const date = new Date(Date.UTC(2016, 4, 20, 0, 0, 0));
  const eorzeaTime = new EorzeaTime(date);
  expect(eorzeaTime.getHours()).toBe(13)
})

test('3', () => {
  const date = new Date(Date.UTC(2016, 4, 20, 0, 0, 0));
  const eorzeaTime = new EorzeaTime(date);
  expect(eorzeaTime.getMinutes()).toBe(42)
})

test('4', () => {
  const date = new Date(Date.UTC(2016, 4, 20, 0, 0, 0));
  const eorzeaTime = new EorzeaTime(date);
  expect(eorzeaTime.getSeconds()).toBe(51)
})
