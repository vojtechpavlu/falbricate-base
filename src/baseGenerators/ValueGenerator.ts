export type SingleValue = string | number | boolean | (any & {});
export type GeneratedValue = SingleValue | SingleValue[];

/**
 * Declaration of a pipe altering the generated value
 *
 * @see
 * <ul>
 *  <li>{@link GeneratedValue} Value being modified by this pipe</li>
 * </ul>
 */
export type ValuePipe = (value: GeneratedValue) => GeneratedValue;

/**
 * Common configuration for all the value generators
 *
 * @see
 * <ul>
 *  <li>{@link ValuePipe} Pipe that can be used to modify the generated value</li>
 *  <li>{@link ValueGenerator} Generator using this configuration</li>
 * </ul>
 */
export interface ValueGeneratorConfig {
  pipes?: ValuePipe[];
}

/**
 * Generator of a value
 *
 * @see
 * <ul>
 *  <li>{@link ValueGeneratorConfig} Configuration to be used for this generator</li>
 *  <li>{@link GeneratedValue} Value being generated</li>
 *  <li>{@link ValuePipe} Pipe that can be used to modify the generated value</li>
 * </ul>
 */
export abstract class ValueGenerator<
  ValueType extends GeneratedValue,
  Conf extends ValueGeneratorConfig,
> {
  readonly config: Conf;

  protected constructor(config: Conf) {
    this.config = config;
  }

  /**
   * Returns a generated value
   */
  abstract get: () => ValueType;

  /**
   * Pipes the given value through the defined pipes to modify the
   * result output.
   *
   * @param value Value to be modified
   *
   * @see
   * <ul>
   *  <li>{@link ValuePipe} Pipe handling the modification of the given value</li>
   * </ul>
   */
  protected pipe = (value: ValueType) => {
    this.config.pipes?.forEach((pipe: ValuePipe) => {
      value = pipe(value);
    });

    return value;
  };
}
