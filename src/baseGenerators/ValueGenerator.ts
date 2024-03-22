import { ValuePipe } from '../pipes/value';
import { GenerationContext } from '../schema/generationContext';
import { randomBoolean } from '../utils/random/boolean';

export type NullLikeValue = undefined | null

export type SingleValue = string | number | boolean | (any & {}) | NullLikeValue;
export type GeneratedValue = SingleValue | SingleValue[] | NullLikeValue;

/**
 * Configures a specification of how to treat possible
 * (and desired by client) nullability.
 */
export interface NullabilityConfiguration {
  /** Expected probability of null-like value in range [0, 1].  */
  nullabilityProb: number,

  /** Expected null-like value - undefined or null */
  nullabilityValue: undefined | null
}

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
  nullability?: NullabilityConfiguration
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

  generate = (context: GenerationContext): ValueType => {
    if (!!this.config.nullability) {
      const shouldGenerate: boolean = randomBoolean(this.config.nullability.nullabilityProb);

      if (!shouldGenerate) {
        return this.config.nullability.nullabilityValue as ValueType;
      }
    }

    return this.get(context);
  }

  /**
   * Returns a generated value
   */
  abstract get: (context: GenerationContext) => ValueType;

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
  protected pipe = (value: ValueType): GeneratedValue => {
    this.config.pipes?.forEach((pipe: ValuePipe) => {
      value = pipe(value);
    });

    return value;
  };
}
