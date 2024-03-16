import {
  ValueGenerator,
  GeneratedValue,
  ValueGeneratorConfig,
} from '../baseGenerators/ValueGenerator';

/** General declaration of a field definition.*/
export interface FieldsDefinition<
  Value extends GeneratedValue,
  Conf extends ValueGeneratorConfig,
> {
  [name: string]: ValueGenerator<Value, Conf>;
}

/** General declaration of a schema for Falsum */
export interface Schema<
  Value extends GeneratedValue,
  Conf extends ValueGeneratorConfig,
> {
  fields: FieldsDefinition<Value, Conf>;
}
