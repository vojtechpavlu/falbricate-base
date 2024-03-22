import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import {
  accessProperty,
  PathSeparator,
} from '../../utils/common/propertyAccessor';
import { GenerationContext } from '../../schema/generationContext';

/**
 * Configuration specifying what property should be taken
 * from the given context.
 */
export type ContextAccessorConfig = {
  path: string;
  sep?: PathSeparator;
  handleError?: boolean;
  useErrorValue?: any;
} & ValueGeneratorConfig;

/**
 * This generator simply returns the value specified at the path
 * from the given context.
 */
export class ContextAccessor extends ValueGenerator<
  GeneratedValue,
  ContextAccessorConfig
> {
  constructor(config: ContextAccessorConfig) {
    config.sep = config.sep ?? '.';

    if (!config.path) {
      throw new Error(`Property 'path' is required`);
    } else if (typeof config.path !== 'string') {
      throw new Error(`Property 'path' must be of type 'string'`);
    }

    super(config);
  }

  get = (context: GenerationContext): GeneratedValue => {
    return accessProperty(
      context,
      this.config.path,
      this.config.sep,
      this.config.handleError
        ? { errorValue: this.config.useErrorValue }
        : undefined,
    );
  };
}
