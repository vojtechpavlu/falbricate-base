import { GeneratedValue } from '../../generators';

/**
 * Splits the given string by space
 *
 * @param value String to be split
 *
 * @throws {Error} When the given value is not defined
 * @throws {Error} When the given value is not of type string
 */
export const splitBySpace = (value: GeneratedValue): GeneratedValue[] => {
  if (value === undefined || value === null) {
    return value;
  } else if (typeof value === 'string') {
    return value.split(' ');
  } else {
    throw new Error(`Can't split object of type '${typeof value}'`);
  }
};
