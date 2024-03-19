import { GeneratedValue } from '../../baseGenerators';

/**
 * Turns the given value into a string
 *
 * @param value Generated value to be turned into a string
 */
export const stringify = (value: GeneratedValue): string => {
  return JSON.stringify(value);
}
