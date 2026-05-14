import { generateCounterString } from './index';

test('長さ5のカウンターストリングの結果として35*が返る', () => {
  const actual = generateCounterString(5);
  expect(actual).toBe('35*');
});

test('長さ10のカウンターストリングの結果として35710*が返る', () => {
  const actual = generateCounterString(10);
  expect(actual).toBe('35710*');
});
