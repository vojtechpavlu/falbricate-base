import { GeneratedValue } from '../../baseGenerators';
import { sortArray, sortString } from '../../utils';

/**
 * Sorts the given value in ascending order.
 *
 * @param value to be sorted
 *
 * @throws {Error} When the given value is not either string or array
 * @throws {Error} When the given array is not an array of primitives
 */
export const sortAsc = (value: GeneratedValue): GeneratedValue => {
  if (Array.isArray(value)) {
    return sortArray(value, 'asc');
  } else if (typeof value === 'string') {
    return sortString(value, 'asc');
  } else {
    throw new Error(`Can't sort this type of value: ${typeof value}`);
  }
};

/**
 * Sorts the given value in descending order.
 *
 * @param value to be sorted
 *
 * @throws {Error} When the given value is not either string or array
 * @throws {Error} When the given array is not an array of primitives
 */
export const sortDesc = (value: GeneratedValue): GeneratedValue => {
  if (Array.isArray(value)) {
    return sortArray(value, 'desc');
  } else if (typeof value === 'string') {
    return sortString(value, 'desc');
  } else {
    throw new Error(`Can't sort this type of value: ${typeof value}`);
  }
};
