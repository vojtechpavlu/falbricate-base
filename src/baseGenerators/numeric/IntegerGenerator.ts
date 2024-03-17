import { GeneratedValue, ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';
import { randomInteger } from '../../utils';

export type IntegerGeneratorConfig = {
  min?: number;
  max: number;
} & ValueGeneratorConfig;

/**
 * This class generates a random integer within a given range.
 */
export class IntegerGenerator extends ValueGenerator<
  GeneratedValue, IntegerGeneratorConfig
> {
  constructor(config: IntegerGeneratorConfig) {

    if (!config.max) {
      throw new Error(`Property 'max' is required`);
    }

    config.min = config.min ? config.min : 0;

    super(config);
  }

  get = (): GeneratedValue => {
    let value = randomInteger(this.config.min ?? 0, this.config.max);
    return this.pipe(value);
  };
}
