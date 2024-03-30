import { GeneratedValue } from '../../generators';

/**
 * Turns the given value into a string
 *
 * @param value Generated value to be turned into a string
 */
export const stringify = (value: GeneratedValue): string => {
  if (value === undefined || value === null) {
    return value;
  }

  return JSON.stringify(value);
};
