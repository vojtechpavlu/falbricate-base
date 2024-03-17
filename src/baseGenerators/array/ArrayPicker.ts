import { randomItemFromArray } from '../../utils';
import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';

/**
 * Configuration for the array picker defining the array
 */
export type ArrayPickerConfig = {
  array: any[];
} & ValueGeneratorConfig;

/**
 * Randomly picks a single element from the given array and returns it as a value.
 */
export class ArrayPicker extends ValueGenerator<
  GeneratedValue,
  ArrayPickerConfig
> {
  constructor(config: ArrayPickerConfig) {
    if (config.array === null || config.array === undefined) {
      throw new Error(`Property 'array' is required`);
    } else if (!Array.isArray(config.array)) {
      throw new Error(`Property 'array' must be of type 'array'`);
    } else if (config.array.length < 1) {
      throw new Error(`Property 'array' must have at least one item`);
    }

    super(config);
  }

  get = (): GeneratedValue => {
    let value = randomItemFromArray(this.config.array);
    return this.pipe(value);
  };
}
