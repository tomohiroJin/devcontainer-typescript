const _isCorrectOrder = (pageNumbers: number[], rule: number[]): boolean => {
  const _findPageIndex = (ruleNumber: number) =>
    pageNumbers.findIndex((n) => n === rule[ruleNumber]);
  const _notPageInRule = () => _findPageIndex(1) < 0;

  return _notPageInRule() ? true : _findPageIndex(0) <= _findPageIndex(1);
};

export const isCorrectOrders = (
  pageNumbers: number[],
  rules: number[][]
): boolean => rules.every((r) => _isCorrectOrder(pageNumbers, r));
