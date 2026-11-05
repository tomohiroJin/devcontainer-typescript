import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { prepareBeverage, coffeeSteps, teaSteps } from './fp.js';

/**
 * テンプレートメソッドパターン(fp)のテスト
 */
describe('テンプレートメソッドパターン(関数型)のテスト', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('coffeeSteps で呼び出した場合の出力順序が正しいこと', () => {
    prepareBeverage(coffeeSteps);

    expect(console.log).toHaveBeenNthCalledWith(1, 'お湯を沸かします');
    expect(console.log).toHaveBeenNthCalledWith(2, 'コーヒーをドリップします');
    expect(console.log).toHaveBeenNthCalledWith(3, 'カップに注ぎます');
    expect(console.log).toHaveBeenNthCalledWith(4, '砂糖とミルクを追加します');
  });

  it('teaSteps で呼び出した場合の出力順序が正しいこと', () => {
    prepareBeverage(teaSteps);

    expect(console.log).toHaveBeenNthCalledWith(1, 'お湯を沸かします');
    expect(console.log).toHaveBeenNthCalledWith(2, 'ティーバッグを浸します');
    expect(console.log).toHaveBeenNthCalledWith(3, 'カップに注ぎます');
    expect(console.log).toHaveBeenNthCalledWith(4, 'レモンを追加します');
  });
});
