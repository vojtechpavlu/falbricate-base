import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from './ValueGenerator';
import {
  ConstantNumberConfig,
  ConstantNumberGenerator,
  FloatGenerator,
  FloatGeneratorConfig,
  IntegerGenerator,
  IntegerGeneratorConfig,
} from './numeric';
import {
  ConstantStringConfig,
  ConstantStringGenerator,
  StringGeneratorConfig,
  StringOfLengthGenerator,
} from './string';
import {
  ArrayPicker,
  ArrayPickerConfig,
  ArraySampleConfig,
  ArraySampleGenerator,
  ConstantArrayConfig,
  ConstantArrayGenerator,
} from './array';
import { ObjectFromSchemaConfig, ObjectFromSchemaGenerator } from './object';
import { ContextAccessor, ContextAccessorConfig } from './other';
import { ProbableBooleanGenerator, ProbableBooleanGeneratorConfig } from './boolean';

/**
 * Declaration of the basic Value Generator names for type-hinting purposes
 */
export type ValueGeneratorName =
  | string
  | (
      | 'range-integer'
      | 'range-float'
      | 'constant-number'
      | 'string-of-length'
      | 'constant-string'
      | 'array-picker'
      | 'constant-array'
      | 'array-sample'
      | 'context-input'
      | 'object-from-schema'
      | 'probable-boolean'
    );

/**
 * Type definition for builders of ValueGenerators
 *
 * @template ValueType  Type of the value to be generated using the built value generator
 * @template Conf       Type of the configuration to be passed to the value generator
 */
export type ValueGeneratorBuilder<
  ValueType extends GeneratedValue,
  Conf extends ValueGeneratorConfig,
> = (config: Conf) => ValueGenerator<ValueType, Conf>;

/**
 * Type definition of the Registry of all the value generators.
 *
 * @template ValueType  Type of the value to be generated using the built value generator
 * @template Conf       Type of the configuration to be passed to the value generator
 */
interface ValueGeneratorRegistry<
  ValueType extends GeneratedValue,
  Conf extends ValueGeneratorConfig,
> {
  [name: ValueGeneratorName]: ValueGeneratorBuilder<ValueType, Conf>;
}

/**
 * Tries to find a builder for value generator by the given name and builds it
 * with given configuration.
 *
 * @param name    Name of the value generator to be built
 * @param config  Configuration the value generator should hold
 *
 * @template GenValue Type of the value the generator should be generating
 * @template Conf     Configuration to be passed to the builder for the generator
 *
 * @throws {Error} When there is no value generator builder found for the given name
 * @throws {Error} When an issue occurs during construction of the generator; usually
 * when the erroneous configuration is given
 *
 * @return {ValueGenerator} Configured and prepared value generator
 */
export const getValueGenerator = <
  GenValue extends GeneratedValue,
  Conf extends ValueGeneratorConfig,
>(
  name: ValueGeneratorName,
  config: Conf & any,
): ValueGenerator<GenValue, Conf> => {
  const generatorBuilderFunction = VALUE_GENERATOR_REGISTRY[name];

  if (!generatorBuilderFunction) {
    throw new Error(`No value generator '${name}' found`);
  }

  return generatorBuilderFunction(config) as ValueGenerator<GenValue, Conf>;
};

/**
 * Access method to check there is a value generator builder
 * assigned to the given name.
 *
 * @param name Name of the value generator builder
 */
export const hasGenerator = (name: ValueGeneratorName): boolean => {
  return !!Object.keys(VALUE_GENERATOR_REGISTRY).find(
    (key: string) => key === name,
  );
};

/**
 * Registers a new value generator builder.
 *
 * @param name    Name the value generator builder shall be assigned to
 * @param builder Value Generator builder to be assigned under the given name
 */
export const registerValueGenerator = <
  GeneratorValueType extends GeneratedValue,
  GivenConfig extends ValueGeneratorConfig,
>(
  name: string,
  builder: ValueGeneratorBuilder<GeneratorValueType, GivenConfig>,
) => {
  if (hasGenerator(name)) {
    throw new Error(
      `There is already one value generator with name '${name}' registered`,
    );
  }

  VALUE_GENERATOR_REGISTRY[name] = builder;
};

/** Registry for Value generator builders */
const VALUE_GENERATOR_REGISTRY: ValueGeneratorRegistry<any, any> = {};

registerValueGenerator(
  'range-integer',
  (config: IntegerGeneratorConfig) => new IntegerGenerator(config),
);
registerValueGenerator(
  'range-float',
  (config: FloatGeneratorConfig) => new FloatGenerator(config),
);
registerValueGenerator(
  'constant-number',
  (config: ConstantNumberConfig) => new ConstantNumberGenerator(config),
);
registerValueGenerator(
  'string-of-length',
  (config: StringGeneratorConfig) => new StringOfLengthGenerator(config),
);
registerValueGenerator(
  'constant-string',
  (config: ConstantStringConfig) => new ConstantStringGenerator(config),
);
registerValueGenerator(
  'array-picker',
  (config: ArrayPickerConfig) => new ArrayPicker(config),
);
registerValueGenerator(
  'constant-array',
  (config: ConstantArrayConfig) => new ConstantArrayGenerator(config),
);
registerValueGenerator(
  'array-sample',
  (config: ArraySampleConfig) => new ArraySampleGenerator(config),
);
registerValueGenerator(
  'object-from-schema',
  (config: ObjectFromSchemaConfig) => new ObjectFromSchemaGenerator(config),
);
registerValueGenerator(
  'context-input',
  (config: ContextAccessorConfig) => new ContextAccessor(config),
);
registerValueGenerator(
  'probable-boolean',
  (config: ProbableBooleanGeneratorConfig) => new ProbableBooleanGenerator(config)
);

export * from './ValueGenerator';
export * from './numeric';
export * from './string';
export * from './array';
export * from './object';
export * from './other';
export * from './boolean';
