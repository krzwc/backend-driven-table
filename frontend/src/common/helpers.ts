export const isEmpty = (arr: any): boolean =>
  typeof arr !== 'undefined' && arr !== null && Array.isArray(arr) && arr.length === 0;

export const noop = () => undefined;
