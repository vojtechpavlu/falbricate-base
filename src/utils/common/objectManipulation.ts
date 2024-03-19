interface ManipulatedObject {
  [key: string]: any
}

/**
 * Turns an object into a list of objects consisting only of key and value pairs
 *
 * @example
 * // result [{"myKey": "a", "myValue": 1}, {"myKey": "b", "myValue": 2}]
 * objectToList({ a: 1, b: 2 }, "myKey", "myValue")
 *
 * @param obj       Object to be manipulated
 * @param keyName   Property name for the key
 * @param valueName Property name for the value
 */
export const objectToList = (
  obj: ManipulatedObject,
  keyName: string = 'key',
  valueName: string = 'value'
): ManipulatedObject[] => {

  if (typeof obj === 'object' && Array.isArray(obj)) {
    throw new Error(`The given object can't be an array`)
  } else if (typeof obj !== 'object') {
    throw new Error(`The given argument has to be an object, not ${typeof obj}`)
  } else {
    return Object.keys(obj).map((key: string) => {
      const resultObject: ManipulatedObject = {};

      resultObject[keyName] = key
      resultObject[valueName] = obj[key]

      return resultObject
    });
  }
}
