import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';

/**
 * Configuration specifying which array of given items should the
 * constant generator produce.
 */
export type ConstantArrayConfig = {
  array: any[];
} & ValueGeneratorConfig;

/**
 * This constant generator simply returns the whole array specified
 * in the configuration.
 */
export class ConstantArrayGenerator extends ValueGenerator<
  GeneratedValue,
  ConstantArrayConfig
> {
  constructor(config: ConstantArrayConfig) {
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
    return this.arrayDeepCopy(this.config.array);
  };

  private arrayDeepCopy = (arr: any[]) => {
    return JSON.parse(JSON.stringify(arr));
  };
}
