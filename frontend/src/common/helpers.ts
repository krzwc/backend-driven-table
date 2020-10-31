export const isEmpty = (value: any): boolean => {
  if (typeof value === 'undefined') {
    return true;
  }
  if (typeof value === 'object') {
    // null
    if (value === null) {
      return true;
    }
    // Array
    if (value !== null && Array.isArray(value) && value.length === 0) {
      return true;
    }
    // Object
    if (Object.keys(value).length === 0 && value.constructor === Object) {
      return true;
    }
  }
  return false;
};

export const isNotEmpty = (value: any): boolean => !isEmpty(value);

export const noop = () => undefined;

export const isFunction = (functionToCheck: any): boolean =>
  functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

export const get = (object: object, path: string | string[], value: any) => {
  const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key);
  const pathArrayFlat = pathArray.flatMap((part: any) => (typeof part === 'string' ? part.split('.') : part));

  return pathArrayFlat.reduce((obj: any, key: any) => obj && obj[key], object) || value;
};
