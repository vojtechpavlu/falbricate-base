import { GeneratedValue } from '../../baseGenerators';

/**
 * Removes leading and trailing whitespaces in the string.
 *
 * @param value string to be trimmed
 *
 * @throws {Error} When the given value is not of type string
 */
export const trimString = (value: GeneratedValue): GeneratedValue => {
  if (value === undefined || value === null) {
    return value
  } else if (typeof value === 'string') {
    return value.trim();
  } else {
    throw new Error(
      `Can't trim this value: ${value} - it needs to be a string`,
    );
  }
};

/**
 * Removes all occurrences of multiple consecutive spaces and replaces
 * it with sinlge ones.
 *
 * @param value string possibly containing multiple consecutive spaces
 *
 * @throws {Error} When the given value is not of type string
 */
export const singleSpace = (value: GeneratedValue): GeneratedValue => {
  if (value === undefined || value === null) {
    return value
  } else if (typeof value === 'string') {
    return value.replace(/\s+/g, ' ');
  } else {
    throw new Error(
      `Can't trim this value: ${value} - it needs to be a string`,
    );
  }
};
