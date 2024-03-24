import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';

/**
 * Configuration specifying which number should the
 * constant generator produce.
 */
export type ConstantNumberConfig = {
  num: number;
} & ValueGeneratorConfig;

/**
 * This constant generator simply returns the number specified
 * in the configuration.
 */
export class ConstantNumberGenerator extends ValueGenerator<
  GeneratedValue,
  ConstantNumberConfig
> {
  constructor(config: ConstantNumberConfig) {
    if (config.num === undefined || config.num === null) {
      throw new Error(`Property 'number' is required`);
    } else if (typeof config.num !== 'number') {
      throw new Error(`Property 'number' must be of type 'number'`);
    }

    super(config);
  }

  protected get = (): GeneratedValue => {
    return this.config.num;
  };
}
