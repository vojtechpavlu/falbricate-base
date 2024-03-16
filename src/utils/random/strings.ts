import { randomItemFromArray } from './arrays';
import { Charset, isCharset } from '../common';
import { randomInteger } from './numbers';

export const randomCharacter = (charset: Charset | any): string => {
  if (!isCharset(charset)) {
    throw new Error(
      'Invalid charset - has to be a non-empty array ' +
        'of single-character values',
    );
  }

  return randomItemFromArray(charset);
};

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
    result = result + charset[randomInteger(0, charset.length)];
  }

  return result;
};
