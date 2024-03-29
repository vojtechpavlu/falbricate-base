import { GeneratedValue, ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';
import { StringTemplateGenerator } from '../string';
import { getCharset } from '../../utils';

export class UUIDGenerator extends ValueGenerator<
  GeneratedValue,
  ValueGeneratorConfig
> {

  constructor(config: ValueGeneratorConfig) {
    super(config);
  }

  private readonly generator: StringTemplateGenerator = new StringTemplateGenerator({
    template: 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx',
    customCharsets: {
      'x': getCharset('hexlower')
    }
  });

  get = (): string => {
    return this.generator.generate();
  };
}
