import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import { accessProperty, PathSeparator } from '../../utils/common/propertyAccessor';
import { GenerationContext } from '../../schema/generationContext';

/**
 * Configuration specifying what property should be taken
 * from the given context.
 */
export type ObjectFromContextConfig = {
  path: string;
  sep?: PathSeparator;
} & ValueGeneratorConfig;

/**
 * This generator simply returns the string specified at the path
 * from the given context.
 */
export class ObjectFromContextGenerator extends ValueGenerator<
  GeneratedValue,
  ObjectFromContextConfig
> {
  constructor(config: ObjectFromContextConfig) {
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

    if (!!valueOnPath && (typeof valueOnPath !== 'object' || Array.isArray(valueOnPath))) {
      throw new Error(`Retrieved value from context is actually not an object`);
    }

    return this.pipe(valueOnPath);
  };
}
