import { GeneratedValue, get, ValueGenerator, ValueGeneratorConfig } from '../baseGenerators';
import { DeclarativeFieldDefinition, SchemaInput } from './SchemaInput';

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
  public readonly fields: FieldsDefinition;

  constructor(schemaInput: SchemaInput) {
    this.fields = this.compile(schemaInput);
  }

  private compile = (schemaInput: SchemaInput): FieldsDefinition => {
    const compiled: FieldsDefinition = {}

    Object.keys(schemaInput.fields).forEach((key) => {
      let inputField = schemaInput.fields[key];

      // When already ValueGenerator -> no need to compile;
      // otherwise transform POJSO into matching ValueGenerator
      if (inputField instanceof ValueGenerator) {
        compiled[key] = inputField
      } else {
        inputField = inputField as DeclarativeFieldDefinition;
        compiled[key] = get(inputField.type, inputField.config)
      }
    })

    return compiled;
  }
}
