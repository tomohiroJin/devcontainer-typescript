export const joinDescendingByLength = (n: number): string => {
  if (n <= 1) return '';
  return `${joinDescendingByLength(n - n.toString().length - 1)}${n}`;
};

export const generateCounterString = (length: number): string =>
  `${joinDescendingByLength(length)}*`;
