import { GeneratedValue } from '../../baseGenerators';
import * as manipulation from '../../utils/common/objectManipulation';

/**
 * Turns the given object into a list of objects consisting of 'key' and 'value'
 * properties.
 *
 * @param obj Object to be turned into a list of objects per field
 */
export const objectValueToList = (obj: GeneratedValue): GeneratedValue => {
  if (obj === undefined || obj === null) {
    return obj;
  }

  return manipulation.objectToList(obj);
};
