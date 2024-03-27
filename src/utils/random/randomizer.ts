import { randomBytes } from 'crypto';

/**
 * Random float generator based on crypto library
 */
const cryptoGenerator = (): number => {
  const bytes = randomBytes(7);

  let float: number = (bytes[0]! % 32) / 32;

  bytes.subarray(1).forEach((byte) => {
    float = (float + byte) / 256;
  });

  return float - Math.floor(float);
};

/**
 * Declaration of a function generating a random number.
 *
 * This function requires to generate a random number
 * in range [0, 1].
 */
export type Randomizer = () => number;

/** Declaration of Randomizer Name */
export type RandomizerName = string | 'default' | 'crypto';

/** Declaration of Randomizer registry */
interface RandomizerRegistry {
  [name: RandomizerName]: Randomizer;
}

/** The actual randomizer registry */
const RANDOMIZER_REGISTRY: RandomizerRegistry = {
  /** Default randomizer based on Math.random() */
  default: Math.random,

  /** Proprietary */
  crypto: cryptoGenerator,
};

/**
 * Sets the randomizer globally.
 *
 * @param name  Name of the randomizer to be used
 *
 * @throws {Error} When there is no randomizer with this name found
 */
export const useRandomizer = (name: RandomizerName): void => {
  if (!hasRandomizer(name)) {
    throw new Error(`Randomizer with name '${name}' not found`);
  }

  RANDOMIZER = getRandomizer(name);
};

/**
 * Returns a randomizer by the given name.
 *
 * @param name  Name of the randomizer to be returned. When none is given,
 * it returns the one set to be used by default
 *
 * @throws {Error} When no randomizer with such name is found
 */
export const getRandomizer = (name?: RandomizerName): Randomizer => {
  if (!name) {
    return RANDOMIZER;
  }

  const randomizer = RANDOMIZER_REGISTRY[name];

  if (!randomizer) {
    throw new Error(`No randomizer with name '${name}' found`);
  }

  return randomizer;
};

/**
 * Returns if there is a randomizer with this name registered.
 *
 * @param name  Name the randomizer should have
 */
export const hasRandomizer = (name: RandomizerName): boolean => {
  return !!Object.keys(RANDOMIZER_REGISTRY).find((k) => k === name);
};

/**
 * Stores a custom randomizer to be used.
 *
 * @param name        Name of the randomizer
 * @param randomizer  Randomizer to be assigned to the name
 *
 * @throws {Error} When there already is a randomizer with such name.
 */
export const storeRandomizer = (
  name: RandomizerName,
  randomizer: Randomizer,
) => {
  if (!name) {
    throw new Error(`No randomizer name provided`);
  } else if (hasRandomizer(name)) {
    throw new Error(`Randomizer name '${name}' is already used`);
  } else if (!randomizer) {
    throw new Error(`Given empty randomizer`);
  }

  RANDOMIZER_REGISTRY[name] = randomizer;
};

/** Currently set randomizer to be used */
let RANDOMIZER = getRandomizer('default');
