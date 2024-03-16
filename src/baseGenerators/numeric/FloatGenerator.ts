import { ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';
import { randomFloat } from '../../utils';

export type FloatGeneratorConfig = {
  min: number;
  max: number;
  decimalDigits?: number;
} & ValueGeneratorConfig;

/**
 * This class generates random float number within a given range.
 */
export class FloatGenerator extends ValueGenerator<
  number,
  FloatGeneratorConfig
> {
  constructor(config: FloatGeneratorConfig) {
    super(config);
    config.decimalDigits = config.decimalDigits ?? 2;
  }

  get = (): number => {
    const value = randomFloat(
      this.config.min,
      this.config.max,
      this.config.decimalDigits,
    );

    return this.pipe(value);
  };
}
