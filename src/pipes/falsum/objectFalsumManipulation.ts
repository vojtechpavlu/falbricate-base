import * as manipulation from '../../utils/common/objectManipulation';
import { ObjectFalsum } from '../../schema';

/**
 * Turns the given object into a list of objects consisting of 'key' and 'value'
 * properties.
 *
 * @param obj Object to be turned into a list of objects per field
 */
export const objectFalsumToList = (obj: ObjectFalsum): ObjectFalsum => {
  return manipulation.objectToList(obj);
};
