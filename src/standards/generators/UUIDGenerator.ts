import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../../generators';
import { StringTemplateGenerator } from '../../generators';
import { getCharset } from '../../utils';

export type UUIDGeneratorConfig = {
  uppercase?: boolean
} & ValueGeneratorConfig


export class UUIDGenerator extends ValueGenerator<
  GeneratedValue,
  UUIDGeneratorConfig
> {
  constructor(config?: UUIDGeneratorConfig) {
    super(config ?? {});
  }

  private readonly generator: StringTemplateGenerator =
    new StringTemplateGenerator({
      template: 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx',
      customCharsets: {
        x: getCharset(this.config.uppercase ? 'hexupper' : 'hexlower'),
      },
    });

  get = (): string => {
    return this.generator.generate();
  };
}
