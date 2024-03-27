import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';

/**
 * Configuration specifying what value should be used
 */
export type ConstantValueConfig = {
  value: any;
} & ValueGeneratorConfig;

/**
 * This generator simply returns the value specified in the configuration.
 */
export class ConstantValue extends ValueGenerator<
  GeneratedValue,
  ConstantValueConfig
> {
  constructor(config: ConstantValueConfig) {
    super(config);
  }

  get = (): GeneratedValue => {
    const value = this.config.value;

    if (value === undefined || value === null) {
      return value;
    }

    return JSON.parse(JSON.stringify(this.config.value));
  };
}
