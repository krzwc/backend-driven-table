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
    const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key);
    const pathArrayFlat = pathArray.flatMap((part: any) => (typeof part === 'string' ? part.split('.') : part));

    return pathArrayFlat.reduce((obj: any, key: any) => obj && obj[key], object) || value;
};

/* export const isEqual = (x: object, y: object) => {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
        if (!x.hasOwnProperty(p)) continue;
        // other properties were tested using x.constructor === y.constructor

        if (!y.hasOwnProperty(p)) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if (x[p as keyof Object] === y[p as keyof Object]) continue;
        // if they have the same strict value or identity then they are equal

        if (typeof x[p as keyof Object] !== 'object') return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if (!isEqual(x[p as keyof Object], y[p as keyof Object])) return false;
        // Objects and Arrays must be tested recursively
    }

    for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
    // allows x[ p ] to be set to undefined

    return true;
};
 */
