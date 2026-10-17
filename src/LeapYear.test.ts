import { isLeapYear } from './LeapYear';

describe('うるう年判定', () => {
  describe('400 で割り切れる', () => {
    test('2000 は true', () => {
      const actual = isLeapYear(2000);
      expect(actual).toBe(true);
    });
  });

  describe('100 で割り切れるが 400 で割り切れない', () => {
    test('1900 は false', () => {
      const actual = isLeapYear(1900);
      expect(actual).toBe(false);
    });
  });

  describe('4 で割り切れる', () => {
    test('2024 は true', () => {
      const actual = isLeapYear(2024);
      expect(actual).toBe(true);
    });

    test('2023 は false', () => {
      const actual = isLeapYear(2023);
      expect(actual).toBe(false);
    });

    test('2016 は true', () => {
      const actual = isLeapYear(2016);
      expect(actual).toBe(true);
    });
  });
});
