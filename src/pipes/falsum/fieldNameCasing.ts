import { Falsum } from '../../schema';
import { camelToSnake } from '../../utils';

export const fieldsToSnake = (falsum: Falsum): Falsum => {
  if (typeof falsum === 'object') {
    // When the given falsum is an object
    const snakeFalsum: Falsum = {};

    // For each property the falsum has
    Object.keys(falsum).forEach((propName) => {
      let content = falsum[propName];
      const snakePropName = camelToSnake(propName);
      snakeFalsum[snakePropName] = fieldsToSnake(content);
    });

    return snakeFalsum;
  } else if (Array.isArray(falsum)) {
    // When the given falsum is an array
    return (falsum as Falsum[]).map((item) => fieldsToSnake(item));
  } else {
    // Else, when the Falsum is e.g. a number or a string
    return falsum;
  }
};
