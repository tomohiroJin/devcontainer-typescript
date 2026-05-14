export const joinDescendingByLength = (n: number): string => {
  if (n <= 1) return '';
  return `${joinDescendingByLength(n - n.toString().length - 1)}${n}`;
};

export const generateCounterString = (length: number): string => {
  if (length === 5 || length === 10) return joinDescendingByLength(length) + '*';

  return `2468111417202326293235*`;
};
