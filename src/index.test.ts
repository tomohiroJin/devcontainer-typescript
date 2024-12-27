import { isCorrectOrders } from ".";

describe("Day 5", () => {
  describe("更新(ページリスト)を渡すと、正しい順序か判定できる", () => {
    describe("更新(ページリスト)1行とルール1行を比べる", () => {
      it("ルール通りに値がある場合ならtrue", () => {
        expect(isCorrectOrders([75, 47, 61, 53, 29], [[47, 53]])).toBeTruthy();
      });
      it("ルールに従っていない（ページの順番が間違っている）場合ならfalse", () => {
        expect(isCorrectOrders([75, 47, 61, 53, 29], [[53, 47]])).toBeFalsy();
      });
      it("ルールのページ番号がどちらも登場しないならtrue", () => {
        expect(isCorrectOrders([75, 47, 61, 53, 29], [[11, 12]])).toBeTruthy();
      });
      it("ルールの一番目のページ番号が登場しないならtrue", () => {
        expect(isCorrectOrders([75, 47, 61, 53, 29], [[11, 29]])).toBeTruthy();
      });
      it("ルールの弐番目のページ番号が登場しないならtrue", () => {
        expect(isCorrectOrders([75, 47, 61, 53, 29], [[75, 12]])).toBeTruthy();
      });
    });
    describe("更新(ページリスト)1行とルール複数行を比べる", () => {
      it("すべてのルール通りに値がある場合ならtrue", () => {
        expect(
          isCorrectOrders(
            [75, 47, 61, 53, 29],
            [
              [47, 53],
              [47, 29],
            ]
          )
        ).toBeTruthy();
      });

      it("一番目のルールが従っていない場合ならfalse", () => {
        expect(
          isCorrectOrders(
            [75, 47, 61, 53, 29],
            [
              [53, 47],
              [47, 29],
            ]
          )
        ).toBeFalsy();
      });

      it("弐番目のルールが従っていない場合ならfalse", () => {
        expect(
          isCorrectOrders(
            [75, 47, 61, 53, 29],
            [
              [47, 53],
              [29, 47],
            ]
          )
        ).toBeFalsy();
      });
    });
  });
});
