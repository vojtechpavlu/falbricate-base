import { randomItemFromArray } from './arrays';
import { Charset, isCharset } from '../common';
import { randomInteger } from './numbers';

/**
 * Selects a random character from a given charset
 *
 * @param charset Charset to be used for the selection
 *
 * @throws {Error}  When the given charset is not a charset (see `isCharset` function)
 */
export const randomCharacter = (charset: Charset | any): string => {
  if (!isCharset(charset)) {
    throw new Error(
      'Invalid charset - has to be a non-empty array ' +
        'of single-character values',
    );
  }

  return randomItemFromArray(charset);
};

/**
 * Generates a random string from given charset of a given length.
 *
 * @param charset Charset to be used for character selection
 * @param length  Length of the expected string
 *
 * @throws {Error}  When the given charset is not a charset (see `isCharset` function)
 * @throws {Error}  When the given expected length is negative number
 */
export const randomStringOfLength = (
  charset: Charset | any,
  length: number,
): string => {
  if (length === 1) {
    return randomCharacter(charset);
  } else if (length === 0) {
    return '';
  } else if (length < 0) {
    throw new Error(`Invalid number of characters: ${length}`);
  } else if (!isCharset(charset)) {
    throw new Error(
      'Invalid charset - has to be a non-empty array ' +
        'of single-character values',
    );
  }

  let result = '';

  for (let i = 0; i < length; i++) {
    result = result + charset[randomInteger(0, charset.length - 1)];
  }

  return result;
};
