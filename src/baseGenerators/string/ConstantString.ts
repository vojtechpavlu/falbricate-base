import { ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';

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
  string, ConstantStringConfig
> {
  constructor(config: ConstantStringConfig) {
    if (!config.text) {
      throw new Error(`Property 'text' is required`)
    }

    super(config);
  }

  get = (): string => {
    return this.pipe(this.config.text);
  }
}
