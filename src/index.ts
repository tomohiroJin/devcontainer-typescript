export const generateCounterString = (_length: number): string => {
  const counterString = '35';

  if (_length === 5) return `${counterString}*`;
  if (_length === 10) return `${counterString}710*`;

  return `357101214171923262935*`;
};
