import { ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';
import { randomInteger } from '../../utils';

export type IntegerGeneratorConfig = {
  min: number,
  max: number
} & ValueGeneratorConfig

export class IntegerGenerator extends ValueGenerator<number, IntegerGeneratorConfig> {

  constructor(config: IntegerGeneratorConfig) {
    super(config);
  }

  get = (): number => {
    let value = randomInteger(this.config.min, this.config.max);
    return this.pipe(value);
  }
}
