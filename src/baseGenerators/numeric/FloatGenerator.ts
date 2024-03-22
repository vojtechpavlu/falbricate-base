import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import { randomFloat } from '../../utils';

export type FloatGeneratorConfig = {
  min?: number;
  max: number;
  decimalDigits?: number;
} & ValueGeneratorConfig;

/**
 * This class generates random float number within a given range.
 */
export class FloatGenerator extends ValueGenerator<
  GeneratedValue,
  FloatGeneratorConfig
> {
  constructor(config: FloatGeneratorConfig) {
    if (!config.max) {
      throw new Error(`Property 'max' is required`);
    }

    super(config);
  }

  get = (): GeneratedValue => {
    return randomFloat(
      this.config.min ?? 0,
      this.config.max,
      this.config.decimalDigits ?? 2,
    );
  };
}
