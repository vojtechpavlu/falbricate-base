import { randomInteger } from './numbers';

/**
 * Returns a random item from a given array.
 *
 * @param array Array the item shall be selected from
 */
export const randomItemFromArray = <T>(array: T[]): T => {
  if (array === null || array === undefined) {
    throw new Error("Given argument is null or undefined")
  } else if (!Array.isArray(array)) {
    throw new Error("Given argument is not an array")
  } else if (array.length === 0) {
    throw new Error("Given array is empty")
  }

  return array[randomInteger(0, array.length)]!
}

/**
 * Selects a random sample from a given array.
 *
 * @param array Array he sample shall be selected from
 * @param n     Size of the output sample
 */
export const randomSampleFromArray = <T>(array: T[], n: number): T[] => {
  if (n === 1) {
    return [randomItemFromArray(array)]
  } else if (n < 1) {
    throw new Error(`Invalid size of sample: ${n}`)
  } else if (array === null || array === undefined) {
    throw new Error("Given argument is null or undefined")
  } else if (!Array.isArray(array)) {
    throw new Error("Given argument is not an array")
  } else if (array.length === 0) {
    throw new Error("Given array is empty")
  } else if (array.length < n) {
    throw new Error(
      `Given array doesn't have enough items: ${array.length} < ${n}`
    );
  }

  return shuffleArray(array).slice(0, n);
}

/**
 * Shuffles the given array using Durstenfeld algorithm. The result array
 * is a copy of the given array.
 *
 * @param array Array to be shuffled
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const copy: T[] = array.slice();

  for (let current = array.length - 1; current > 0; current--) {
    const switchIndex = randomInteger(0, current);
    const temp = copy[switchIndex]!;
    copy[switchIndex] = copy[current]!;
    copy[current] = temp;
  }

  return copy;
}