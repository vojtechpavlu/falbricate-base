import { randomFloat } from './numbers';

/**
 * Generates a random boolean based on given probability.
 *
 * @param probability with which the value shall be true
 *
 * @throws {Error} When the value is not in range of [0, 1]
 */
export const randomBoolean = (probability: number = 0.5) => {
  if (probability < 0 || probability > 1) {
    throw new Error(`Probability is expected to be in range of [0, 1]: ${probability}`)
  } else {
    return randomFloat(0, 1) > probability
  }
}
