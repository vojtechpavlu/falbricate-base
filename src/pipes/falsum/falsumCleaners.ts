import { Falsum } from '../../schema';

/**
 * Removes all the fields that contain undefined value.
 * It recursively crawls through the whole falsum and
 * prunes the nested objects.
 *
 * @param falsum Falsum with possible undefined values.
 */
export const pruneUndefined = (falsum: Falsum): Falsum => {
  if (falsum === undefined || falsum === null) {
    return falsum;
  } else if (Array.isArray(falsum)) {
    return (falsum as Falsum[])
      .filter((item) => item !== undefined)
      .map((item) => pruneUndefined(item));
  } else if (typeof falsum === 'object') {
    const prunedFalsum: Falsum = {};

    // For each field in the given falsum
    Object.keys(falsum).forEach((propertyName) => {
      let content = pruneUndefined(falsum[propertyName]);
      if (content !== undefined) {
        prunedFalsum[propertyName] = content;
      }
    });

    return prunedFalsum;
  } else {
    return falsum;
  }
};

/**
 * Removes all the fields that contain a null value.
 * It recursively crawls through the whole falsum and
 * prunes the nested objects.
 *
 * @param falsum Falsum with possible null values.
 */
export const pruneNulls = (falsum: Falsum): Falsum => {
  if (falsum === undefined || falsum === null) {
    return falsum;
  } else if (Array.isArray(falsum)) {
    return (falsum as Falsum[])
      .filter((item) => item !== null)
      .map((f) => pruneNulls(f));
  } else if (typeof falsum === 'object') {
    const prunedFalsum: Falsum = {};

    // For each field in the given falsum
    Object.keys(falsum).forEach((propertyName) => {
      let content = pruneNulls(falsum[propertyName]);
      if (content !== null) {
        prunedFalsum[propertyName] = content;
      }
    });

    return prunedFalsum;
  } else {
    return falsum;
  }
};

/**
 * Removes all the fields that contain an empty array value.
 * It recursively crawls through the whole falsum and
 * prunes the nested objects.
 *
 * Note that in case of an empty array, it will still
 * return an empty array in the first place.
 *
 * @param falsum Falsum with possible empty arrays.
 */
export const pruneEmptyArrays = (falsum: Falsum): Falsum => {
  if (falsum === undefined || falsum === null) {
    return falsum;
  } else if (Array.isArray(falsum)) {
    return (falsum as Falsum[])
      .filter((item) => {
        return !(Array.isArray(item) && item.length !== 0);
      })
      .map((f) => pruneEmptyArrays(f));
  } else if (typeof falsum === 'object') {
    const prunedFalsum: Falsum = {};

    // For each field in the given falsum
    Object.keys(falsum).forEach((propertyName) => {
      const content = falsum[propertyName];

      // Either is not an array or is an array with non-zero length; else skip
      if (!Array.isArray(content) || (Array.isArray(content) && content.length !== 0)) {
        prunedFalsum[propertyName] = content;
      }
    });

    return prunedFalsum;
  } else {
    return falsum;
  }
};
