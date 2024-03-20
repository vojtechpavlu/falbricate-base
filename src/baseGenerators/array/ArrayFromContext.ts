import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import { accessProperty } from '../../utils/common/propertyAccessor';
import { GenerationContext } from '../../schema/generationContext';

/**
 * Configuration specifying what property should be taken
 * from the given context.
 */
export type ArrayFromContextConfig = {
  path: string;
  sep?: string;
} & ValueGeneratorConfig;

/**
 * This generator simply returns the array specified at the path
 * from the given context.
 */
export class ArrayFromContextGenerator extends ValueGenerator<
  GeneratedValue,
  ArrayFromContextConfig
> {
  constructor(config: ArrayFromContextConfig) {
    config.sep = config.sep ?? '.';

    if (!config.path) {
      throw new Error(`Property 'path' is required`);
    } else if (typeof config.path !== 'string') {
      throw new Error(`Property 'path' must be of type 'string'`);
    }

    super(config);
  }

  get = (context: GenerationContext): GeneratedValue => {
    const valueOnPath = accessProperty(
      context,
      this.config.path,
      this.config.sep,
    );

    if (!!valueOnPath && !Array.isArray(valueOnPath)) {
      throw new Error(`Retrieved value from context is actually not an array`);
    }

    return this.pipe(valueOnPath);
  };
}