/**
 * Generates a random integer within a given range
 *
 * @param min Lower bound of the interval
 * @param max Upper bound of the interval
 *
 * @returns Randomly generated integer within a range
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

/**
 * Generates a random float within a range with a given precision by decimal
 * digits.
 *
 * @param min           Lower bound of the interval
 * @param max           Upper bound of the interval
 * @param decimalDigits Number of decimal digits
 *
 * @returns Randomly generated float number within a range
 *
 * @throws {Error} When the given lower bound is greater
 * than the upper bound
 */
export const randomFloat = (
  min: number,
  max: number,
  decimalDigits: number = 2
): number => {

  if (min > max) {
    throw new Error(
      `Lower bound of the interval can't be greater than the upper bound: ${min} > ${max}`
    );
  } else if (decimalDigits < 0) {
    throw new Error(
      `Number of decimal digits has to be non-negative`
    )
  }

  const randomFloat = Math.random() * (max - min) + min;
  return parseFloat(randomFloat.toFixed(decimalDigits));
}
