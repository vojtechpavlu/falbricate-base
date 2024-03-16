import { Charset, randomStringOfLength } from '../../utils';
import { ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';

export type StringGeneratorConfig = {
  length: number;
  charset: Charset;
} & ValueGeneratorConfig;

export class StringOfLengthGenerator extends ValueGenerator<
  string,
  StringGeneratorConfig
> {
  constructor(config: StringGeneratorConfig) {
    super(config);
  }

  get = (): string => {
    let value = randomStringOfLength(this.config.charset, this.config.length);
    return this.pipe(value);
  };
}
