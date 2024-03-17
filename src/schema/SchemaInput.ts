import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../baseGenerators';

/**
 * Plain JavaScript Object representation of a field for which
 * shall be a value generated.
 */
export interface DeclarativeFieldDefinition {
  type: string;
  config: ValueGeneratorConfig & any;
}

/**
 * Client-given schema declaration needing to be compiled.
 *
 * @see
 * <ul>
 *   <li>{@link Falsum} Object generated and matching this schema</li>
 *   <li>{@link Schema} Compiled version of this schema input</li>
 *   <li>{@link Fabricator} Class using this schema to generate the falsum objects</li>
 * </ul>
 */
export interface SchemaInput {
  fields: {
    [name: string]:
      | DeclarativeFieldDefinition
      | ValueGenerator<GeneratedValue, ValueGeneratorConfig>;
  };
}
