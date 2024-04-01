import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import { FieldDeclaration, FieldsDefinition, Schema } from '../../schema';
import { randomItemFromArray } from '../../utils';
import { FabricationContext } from '../../schema/fabricationContext';

/**
 * Configuration specifying what value should be used
 */
export type XORConfiguration = {
  generators: {
    [name: string]: FieldDeclaration
  };
} & ValueGeneratorConfig;

/**
 * This generator simply returns the value specified in the configuration.
 */
export class XORGenerator extends ValueGenerator<
  GeneratedValue,
  XORConfiguration
> {

  private readonly generators: FieldsDefinition;

  constructor(config: XORConfiguration) {
    super(config);

    this.generators = Schema.compileFields({ fields: config.generators });
  }

  get = (context?: FabricationContext): GeneratedValue => {
    // Find a random generator form the specified ones
    const valueGeneratorName = randomItemFromArray(Object.keys(this.generators));
    const valueGenerator = this.generators[valueGeneratorName]!;

    // Return its value
    return valueGenerator.generate(context);
  };
}
