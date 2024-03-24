import { Fabricator, SchemaInput } from '../../schema';
import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig
} from '../ValueGenerator';
import { FabricationContext } from '../../schema/fabricationContext';

/**
 * Configuration specifying the schema to be used
 * and number of items expected.
 */
export type ListOfObjectsFromSchemaConfig = {
  n: number,
  schema: SchemaInput;
} & ValueGeneratorConfig;

/**
 * This generator is building Falsa based on the preconfigured schema.
 */
export class ListOfObjectsFromSchemaGenerator extends ValueGenerator<
  GeneratedValue,
  ListOfObjectsFromSchemaConfig
> {
  private readonly fabricator: Fabricator;

  constructor(config: ListOfObjectsFromSchemaConfig) {
    if (!config.n || config.n < 1) {
      throw new Error(`Property 'schema' is required and must be greater than zero`);
    }

    if (!config.schema) {
      throw new Error(`Property 'schema' is required`);
    }

    super(config);

    // Initialize the fabricator for given schema
    this.fabricator = new Fabricator(config.schema);
  }

  get = (context: FabricationContext): GeneratedValue => {
    return this.fabricator.generateMany(this.config.n, context);
  };
}
