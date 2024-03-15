/**
 * Generates a random integer within a given range
 *
 * @param min Lower bound of the interval
 * @param max Upper bound of the interval
 *
 * @returns Randomly generated number within a range
 *
 * @throws {Error} When the given lower bound is greater
 * than the upper bound
 */
export const randomInteger = (min: number, max: number): number => {

  if (min > max) {
    throw new Error(
      `Lower bound of the interval can't be greater than the upper bound: ${min} > ${max}`
    );
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomFloat = (min: number, max: number, decimalDigits: number = 2): number => {
  const randomFloat = Math.random() * (max - min) + min;
  return parseFloat(randomFloat.toFixed(decimalDigits));
}
