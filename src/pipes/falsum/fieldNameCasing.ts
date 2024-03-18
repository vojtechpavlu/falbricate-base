import { Falsum } from '../../schema';
import { camelToSnake, snakeToCamel } from '../../utils';

/**
 * Turns the property names from a given (default and recommended)
 * camel-case form into snake-case names.
 *
 * This can be useful when dealing with different systems with
 * different expectations or conventions.
 *
 * @param falsum Falsum to be processed
 */
export const fieldsToSnake = (falsum: Falsum): Falsum => {
  if (falsum === undefined || falsum === null) {
    // When the given input is undefined or null
    return falsum
  } else if (Array.isArray(falsum)) {
    // When the given falsum is an array
    return (falsum as Falsum[])
      .map((item) => fieldsToSnake(item));
  } else if (typeof falsum === 'object') {
    // When the given falsum is an object
    const snakeFalsum: Falsum = {};

    // For each property the falsum has
    Object.keys(falsum).forEach((propName) => {
      let content = falsum[propName];
      const snakePropName = camelToSnake(propName);

      // Do this recursively
      snakeFalsum[snakePropName] = fieldsToSnake(content);
    });

    return snakeFalsum;
  } else {
    // Else, when the Falsum is e.g. a number or a string
    return falsum;
  }
};

/**
 * Turns the property names from a given snake-case
 * form into camel-case names.
 *
 * @param falsum Falsum to be processed
 */
export const fieldsToCamel = (falsum: Falsum): Falsum => {
  if (falsum === undefined || falsum === null) {
    // When the given input is undefined or null
    return falsum
  } else if (Array.isArray(falsum)) {
    // When the given falsum is an array
    return (falsum as Falsum[])
      .map((item) => fieldsToCamel(item));
  } else if (typeof falsum === 'object') {
    // When the given falsum is an object
    const camelFalsum: Falsum = {};

    // For each property the falsum has
    Object.keys(falsum).forEach((propName) => {
      let content = falsum[propName];
      const camelPropName = snakeToCamel(propName);

      // Do this recursively
      camelFalsum[camelPropName] = fieldsToCamel(content);
    });

    return camelFalsum;
  } else {
    // Else, when the Falsum is e.g. a number or a string
    return falsum;
  }
}
