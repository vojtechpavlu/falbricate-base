import { GeneratedValue, ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';

/**
 * Configuration specifying which string should the
 * constant generator produce.
 */
export type ConstantStringConfig = {
  text: string
} & ValueGeneratorConfig

/**
 * This constant generator simply returns the string specified
 * in the configuration.
 */
export class ConstantStringGenerator extends ValueGenerator<
  GeneratedValue, ConstantStringConfig
> {
  constructor(config: ConstantStringConfig) {
    if (!config.text) {
      throw new Error(`Property 'text' is required`)
    } else if (typeof config.text !== 'string') {
      throw new Error(`Property 'text' must be of type 'string'`)
    }

    super(config);
  }

  get = (): GeneratedValue => {
    return this.pipe(this.config.text);
  }
}
