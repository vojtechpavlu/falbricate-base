import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import { randomSampleFromArray } from '../../utils';

/**
 * Configuration for taking a sample from the given array.
 */
export type ArraySampleConfig = {
  array: any[];
  sampleSize: number;
} & ValueGeneratorConfig;

/**
 * This constant generator simply returns the number specified
 * in the configuration.
 */
export class ArraySampleGenerator extends ValueGenerator<
  GeneratedValue,
  ArraySampleConfig
> {
  constructor(config: ArraySampleConfig) {
    if (config.array === null || config.array === undefined) {
      throw new Error(`Property 'array' is required`);
    } else if (!Array.isArray(config.array)) {
      throw new Error(`Property 'array' must be of type 'array'`);
    } else if (config.array.length < 1) {
      throw new Error(`Property 'array' must have at least one item`);
    } else if (config.sampleSize === undefined || config.sampleSize === null) {
      throw new Error(`Property 'sampleSize' is required`)
    } else if (config.sampleSize < 1) {
      throw new Error(`Property 'sampleSize' has to be at least 1 (got: ${config.sampleSize})`)
    } else if (config.sampleSize > config.array.length) {
      throw new Error(`Property 'sampleSize' has to be less or equal to size of the given array`)
    }

    super(config);
  }

  get = (): GeneratedValue => {
    return this.pipe(
      randomSampleFromArray(this.config.array, this.config.sampleSize)
    );
  };
}
