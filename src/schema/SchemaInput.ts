import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../baseGenerators';
import { FalsumPipe } from '../pipes';

/**
 * Plain JavaScript Object representation of a field for which
 * shall be a value generated.
 */
export interface DeclarativeFieldDefinition {
  type: string;
  config: ValueGeneratorConfig & any;
}

/**
 * Declaration of a Falsum Pipe client input enabling the client
 * to can use either the actual function to pipe the falsum or
 * a name of predefined Falsum Pipe.
 */
export type FalsumPipeInput = FalsumPipe | string;

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

  pipes?: FalsumPipeInput[];
}
