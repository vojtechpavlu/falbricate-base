import {
  GeneratedValue,
  getValueGenerator,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../baseGenerators';
import { DeclarativeFieldDefinition, SchemaInput } from './SchemaInput';
import { FalsumPipe, getFalsumPipe } from '../pipes';

/** General declaration of a field definition. */
export interface FieldsDefinition {
  [name: string]: ValueGenerator<GeneratedValue, ValueGeneratorConfig>;
}

/**
 * Schema definition of the generated Falsum.
 *
 * @see
 * <ul>
 *   <li>{@link Falsum} Object generated and matching this schema</li>
 *   <li>{@link SchemaInput} Given input describing how the schema shall be compiled</li>
 *   <li>{@link Fabricator} Class using this schema to generate the falsum objects</li>
 * </ul>
 */
export class Schema {
  /** Field definitions by which the Falsum property will be generated */
  public readonly fields: FieldsDefinition;

  /** Pipes used to modify the whole generated falsum */
  public readonly pipes: FalsumPipe[];

  constructor(schemaInput: SchemaInput) {
    this.fields = Schema.compileFields(schemaInput);
    this.pipes = Schema.compilePipes(schemaInput);
  }

  /**
   * Compiles the fields.
   * @param schemaInput
   */
  public static compileFields = (schemaInput: SchemaInput): FieldsDefinition => {
    const compiled: FieldsDefinition = {};

    Object.keys(schemaInput.fields).forEach((key) => {
      let inputField = schemaInput.fields[key];

      // When already ValueGenerator -> no need to compile;
      // otherwise transform POJSO into matching ValueGenerator
      if (inputField instanceof ValueGenerator) {
        compiled[key] = inputField;
      } else {
        inputField = inputField as DeclarativeFieldDefinition;
        compiled[key] = getValueGenerator(inputField.type, inputField.config);
      }
    });

    return compiled;
  };

  public static compilePipes = (schemaInput: SchemaInput): FalsumPipe[] => {
    const pipes: FalsumPipe[] = [];

    schemaInput.pipes?.forEach((pipe) => {
      if (typeof pipe === 'function') {
        pipes.push(pipe);
      } else if (typeof pipe === 'string') {
        pipes.push(getFalsumPipe(pipe));
      } else {
        throw new Error(`Unrecognized type '${typeof pipe}'`);
      }
    });

    return pipes;
  };
}
