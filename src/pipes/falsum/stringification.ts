import { Falsum } from '../../schema';

/**
 * Turns the given Falsum into a string
 *
 * @param falsum to be turned into a string
 */
export const stringify = (falsum: Falsum) => {
  return JSON.stringify(falsum);
}

/**
 * Turns the given Falsum into a string with 2 spaces indentation
 *
 * @param falsum to be turned into a string with indentation
 */
export const stringifyWithIndentation = (falsum: Falsum) => {
  return JSON.stringify(falsum, null, 2);
}
