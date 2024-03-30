import { getValuePipe, ValuePipe, ValuePipeName } from '../pipes/value';
import { FabricationContext } from '../schema/fabricationContext';
import { randomBoolean } from '../utils/random/boolean';

/**
 * Declaration of the basic Value Generator names for type-hinting purposes
 */
export type ValueGeneratorName =
  | string
  // Numerics
  | (
      | 'range-integer'
      | 'range-float'

      // Strings
      | 'string-of-length'
      | 'random-string'
      | 'string-template'

      // Boolean
      | 'probable-boolean'

      // Dates
      | 'range-date-time'

      // Arrays
      | 'array-picker'
      | 'array-sample'

      // Objects
      | 'object-from-schema'
      | 'list-of-schema'

      // Other
      | 'context-input'
      | 'constant-value'
    );

/** Values considered as null-like. */
export type NullLikeValue = undefined | null;

/** Declaration of how could a generated single value look like */
export type SingleValue =
  | string
  | number
  | boolean
  | (any & {})
  | NullLikeValue;

/** Declaration of the most general Generated Value type */
export type GeneratedValue = SingleValue | SingleValue[] | NullLikeValue;

/**
 * Configures a specification of how to treat possible
 * (and desired by client) nullability.
 */
export interface NullabilityConfiguration {
  /** Expected probability of null-like value in range [0, 1].  */
  probability: number;

  /** Expected null-like value - undefined or null */
  nullValue: undefined | null;
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
  /** Pipes to be used for modifying the generated value */
  pipes?: (ValuePipe | string)[];

  /** Description of how the nulls should be treated */
  nullability?: NullabilityConfiguration;
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
   * Method to autonomously decide if the value shall be generated or not;
   * based on specified optional nullability configuration.
   *
   * @param context Context to be used for value generation.
   */
  generate = (context?: FabricationContext): ValueType => {
    context = context ?? {};

    if (!!this.config.nullability) {
      const shouldGenerate: boolean = randomBoolean(
        this.config.nullability.probability,
      );

      if (!shouldGenerate) {
        return this.pipe(this.config.nullability.nullValue as ValueType);
      }
    }

    return this.pipe(this.get(context));
  };

  /**
   * Returns a generated value
   */
  protected abstract get: (context: FabricationContext) => ValueType;

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
    this.config.pipes?.forEach((pipe: ValuePipe | ValuePipeName) => {
      if (typeof pipe === 'string') {
        pipe = getValuePipe(pipe);
      }
      value = pipe(value);
    });

    return value;
  };
}
