import { GeneratedValue } from '../../baseGenerators';

/**
 * Turns the given string value to uppercase characters
 *
 * @param value String to be turned to uppercase characters
 *
 * @throws {Error} When the given value is not a string
 */
export const uppercase = (value: GeneratedValue): string => {
  if (typeof value !== 'string') {
    throw new Error(`Uppercasing can be performed on strings only; not on '${typeof value}' types`)
  }

  return value.toUpperCase();
}

/**
 * Turns the given string value to lowercase characters
 *
 * @param value String to be turned to lowercase characters
 *
 * @throws {Error} When the given value is not a string
 */
export const lowercase = (value: GeneratedValue): string => {
  if (typeof value !== 'string') {
    throw new Error(`Lowercasing can be performed on strings only; not on '${typeof value}' types`)
  }

  return value.toLowerCase();
}
