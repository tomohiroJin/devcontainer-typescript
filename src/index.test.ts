import { generateCounterString } from './index';

describe('generateCounterString', () => {
  test('長さ5のカウンターストリングの結果として35*が返る', () => {
    const actual = generateCounterString(5);
    expect(actual).toBe('35*');
  });

  test('長さ10のカウンターストリングの結果として35710*が返る', () => {
    const actual = generateCounterString(10);
    expect(actual).toBe('35710*');
  });

  test('長さ35のカウンターストリングの結果として2468111417202326293235*が返る', () => {
    const actual = generateCounterString(35);
    expect(actual).toBe('2468111417202326293235*');
  });
});
