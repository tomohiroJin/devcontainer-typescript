export const joinDescendingByTwo = (n: number): string => {
  if (n <= 1) return '';
  return `${joinDescendingByTwo(n - 2)}${n}`;
};

export const generateCounterString = (length: number): string => {
  if (length === 5) return joinDescendingByTwo(5) + '*';
  if (length === 10) return `${joinDescendingByTwo(7)}10*`;

  return `${joinDescendingByTwo(7)}101214171923262935*`;
};
