/** Simple object describing what value to use when any error occurs */
export interface ErrorHandleObject {
  errorValue: any
}

/** Separators usable to distinguish the movement in the structure */
export type PathSeparator = '.' | '/' | '#' | '$';

/** Definition of an object the function can process */
interface Accessible {
  [propName: string]: Accessible | any;
}

/**
 * Returns a deep copy of value at the given path inside the given object.
 *
 * @param obj     Object to be destructuralized
 * @param path    Path to be used to access the value
 * @param sep     Separator used in the path (by default dot - `.`)
 * @param onError Describes what value should be used when error occurs
 *
 * @throws {Error} When on the path is not defined value or there
 * is an unexpected type of object
 */
export const accessProperty = (
  obj: Accessible,
  path: string,
  sep: PathSeparator = '.',
  onError?: ErrorHandleObject
) => {
  const pathSteps = path.split(sep);
  let current = obj;

  for (let idx = 0; idx < pathSteps.length; idx++) {
    const step = pathSteps[idx] as string;
    if (Array.isArray(current)) {
      return handleError(
        `Can't access '${step}' at position (${idx}) in '${path}' - arrays are not supported`,
        onError
      );
    } else if (!current || Object.keys(current).length === 0) {
      return handleError(
        `Can't access '${step}' at position (${idx}) in '${path}' - does not exist`,
        onError
      );
    } else if (typeof current === 'object') {
      current = current[step];
    } else {
      return handleError(
        `Can't access '${step}' at position (${idx}) in '${path}' - unexpected type (${typeof current})`,
        onError
      );
    }
  }

  if (current === undefined || current === null) {
    return current;
  }

  return JSON.parse(JSON.stringify(current));
};

const handleError = (message: string, errorHandleObject?: ErrorHandleObject) => {
  if (!!errorHandleObject) {
    // throw errorHandleObject
    console.log(errorHandleObject.errorValue)
    return errorHandleObject.errorValue
  } else {
    throw new Error(message);
  }
}