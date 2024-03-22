import { Fabricator, SchemaInput } from '../../schema';
import { GeneratedValue, ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';
import { GenerationContext } from '../../schema/generationContext';

/**
 * Configuration specifying the schema to be used
 * to generate this field.
 */
export type ObjectFromSchemaConfig = {
  schema: SchemaInput
} & ValueGeneratorConfig;

/**
 * This generator is building a Falsum based on the preconfigured
 * schema.
 */
export class ObjectFromSchemaGenerator extends ValueGenerator<
  GeneratedValue,
  ObjectFromSchemaConfig
> {

  private readonly fabricator: Fabricator;

  constructor(config: ObjectFromSchemaConfig) {
    if (!config.schema) {
      throw new Error(`Property 'schema' is required`);
    }

    super(config);

    // Initialize the fabricator for given schema
    this.fabricator = new Fabricator(config.schema);
  }

  get = (context: GenerationContext): GeneratedValue => {

    context = {
      index: 0,
      data: context.data,
      parent: context.current,
      current: undefined
    }

    return this.fabricator.generate(context);
  }
}
