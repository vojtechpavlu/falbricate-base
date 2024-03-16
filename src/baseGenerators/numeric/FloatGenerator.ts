import { ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';
import { randomFloat } from '../../utils';

type FloatGeneratorConfig = {
  min: number,
  max: number
  decimalDigits?: number
} & ValueGeneratorConfig

export class FloatGenerator extends ValueGenerator<number, FloatGeneratorConfig> {

  constructor(config: FloatGeneratorConfig) {
    super(config);
    config.decimalDigits = config.decimalDigits ?? 2;
  }

  get = (): number => {
    return randomFloat(
      this.config.min,
      this.config.max,
      this.config.decimalDigits
    );
  };
}
