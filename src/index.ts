const _isCorrectOrder = (pageNumbers: number[], rule: number[]): boolean => {
  const findIndex = (ruleNumber: number) =>
    pageNumbers.findIndex((n) => n === rule[ruleNumber]);
  const secondIndex = findIndex(1);
  if (secondIndex < 0) return true;
  return pageNumbers.findIndex((n) => n === rule[0]) <= secondIndex;
};

export const isCorrectOrders = (
  pageNumbers: number[],
  rules: number[][]
): boolean => {
  return rules.every((r) => _isCorrectOrder(pageNumbers, r));
};
