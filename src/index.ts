export const generateCounterString = (length: number): string => {
  const counterString = '35';
  const counterString2 = `${counterString}710`;

  if (length === 5) return `${counterString}*`;
  if (length === 10) return `${counterString2}*`;

  return `${counterString2}1214171923262935*`;
};

export const hoge = (n: number): string => {
  if (n <= 1) return '';
  return `${hoge(n - 2)}${n}`;
};
