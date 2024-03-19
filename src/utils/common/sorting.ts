export type SortOrder = 'asc' | 'desc';

/**
 * Sorts the given array of items in a given sorting order.
 *
 * @param items Items to be sorted
 * @param order Which order should those items be sorted in
 *
 * @throws {Error} When the given array contains objects
 */
export const sortArray = <T>(items: T[], order: SortOrder = 'asc'): T[] => {
  return items.sort((i1, i2) => {
    if (typeof i1 === 'object' || typeof i2 === 'object') {
      throw new Error(`Can't compare these types: ${typeof i1}, ${typeof i2}`);
    }

    if (order === 'asc') {
      return i1 < i2 ? -1 : 1;
    } else {
      return i1 < i2 ? 1 : -1;
    }
  });
};

/**
 * Sorts the given string by characters and by given order.
 *
 * @param str   String to be sorted
 * @param order Which order should those characters be sorted in
 *
 * @throws {Error} When the given array contains objects
 */
export const sortString = (str: string, order: SortOrder = 'asc'): string => {
  if (typeof str !== 'string') {
    throw new Error(`This function can only sort string, not '${typeof str}'`);
  }

  return sortArray(str.split(''), order).join('');
};
