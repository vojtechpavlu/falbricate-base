import {randomBytes} from 'crypto';

const cryptoGenerator = (): number => {
  const bytes = randomBytes(7);

  let float: number = (bytes[0]! % 32) / 32;

  bytes.subarray(1).forEach((byte) => {
    float = (float + byte) / 256
  })

  return float - Math.floor(float);
}


/**
 * Declaration of a function generating a random number.
 *
 * This function requires to generate a random number
 * in range [0, 1].
 */
export type Randomizer = () => number

/** Declaration of Randomizer Name */
export type RandomizerName = string | 'default' | 'crypto'

/** Declaration of Randomizer registry */
interface RandomizerRegistry {
  [name: RandomizerName]: Randomizer
}

const RANDOMIZER_REGISTRY: RandomizerRegistry = {
  /** Default randomizer based on Math.random() */
  'default': Math.random,

  /** Proprietary */
  'crypto': cryptoGenerator
}


export const getRandomizer = (name: RandomizerName): Randomizer => {
  const randomizer = RANDOMIZER_REGISTRY[name];

  if (!randomizer) {
    throw new Error(`Randomizer '${name}' not found`)
  }

  return randomizer;
}

export const hasRandomizer = (name: RandomizerName): boolean => {
  return !!Object.keys(RANDOMIZER_REGISTRY).find((k) => k === name);
}

export const storeRandomizer = (
  name: RandomizerName,
  randomizer: Randomizer
) => {
  if (!name) {
    throw new Error(`No randomizer name provided`)
  } else if (hasRandomizer(name)) {
    throw new Error(`Randomizer name '${name}' is already used`)
  } else if (!randomizer) {
    throw new Error(`Given empty randomizer`)
  }

  RANDOMIZER_REGISTRY[name] = randomizer
}
