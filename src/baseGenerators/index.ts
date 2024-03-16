import { GeneratedValue, ValueGenerator, ValueGeneratorConfig } from './ValueGenerator';

/**
 * Type definition for builders of ValueGenerators
 *
 * @template ValueType  Type of the value to be generated using the built value generator
 * @template Conf       Type of the configuration to be passed to the value generator
 */
export type ValueGeneratorBuilder<ValueType extends GeneratedValue, Conf extends ValueGeneratorConfig> =
  (config: Conf) => ValueGenerator<ValueType, Conf>;

/**
 * Type definition of the Registry of all the value generators.
 *
 * @template ValueType  Type of the value to be generated using the built value generator
 * @template Conf       Type of the configuration to be passed to the value generator
 */
interface ValueGeneratorRegistry<ValueType extends GeneratedValue, Conf extends ValueGeneratorConfig> {
  [name: string]: ValueGeneratorBuilder<ValueType, Conf>;
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
export const get = <GenValue extends GeneratedValue, Conf extends ValueGeneratorConfig>(
  name: string,
  config: Conf
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
export const hasGenerator = (name: string): boolean => {
  return Object.keys(VALUE_GENERATOR_REGISTRY)
    .map((k: string) => k === name)
    .reduce((acc, curr) => acc || curr);
};

/**
 * Registers a new value generator builder.
 *
 * @param name    Name the value generator builder shall be assigned to
 * @param builder Value Generator builder to be assigned under the given name
 */
export const registerValueGenerator = <
  GeneratorValueType extends GeneratedValue, GivenConfig extends ValueGeneratorConfig
>(name: string, builder: ValueGeneratorBuilder<GeneratorValueType, GivenConfig>) => {
  if (hasGenerator(name)) {
    throw new Error(`There is already one value generator with name '${name}' registered`);
  }

  VALUE_GENERATOR_REGISTRY[name] = builder;
};

/** Registry for Value generator builders */
const VALUE_GENERATOR_REGISTRY: ValueGeneratorRegistry<any, any> = {};

export * from './numeric';
export * from './ValueGenerator';
export * from './string';