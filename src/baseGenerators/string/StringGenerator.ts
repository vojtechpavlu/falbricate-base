import { Charset, randomStringOfLength } from '../../utils';
import { ValueGenerator, ValueGeneratorConfig } from '../ValueGenerator';

/**
 * Configuration for the String generator of a specified length
 *
 * @see
 * <ul>
 *  <li>{@link Charset}               Definition of charset</li>
 *  <li>{@link isCharset}             Function for validating charsets</li>
 *  <li>{@link ValueGeneratorConfig}  General configuration for all value generators</li>
 * </ul>
 */
export type StringGeneratorConfig = {
  length: number;
  charset: Charset;
} & ValueGeneratorConfig;

/**
 * Generates a random string of a given length consisting
 * of the given charset items only.
 *
 * @see
 * <ul>
 *  <li>{@link Charset}                Definition of charset</li>
 *  <li>{@link isCharset}              Function for validating charsets</li>
 *  <li>{@link StringGeneratorConfig}  Configuration declaration for this generator</li>
 *  <li>{@link randomStringOfLength}   Function used to generate such value</li>
 *  <li>{@link ValuePipe}              Alters the generated value</li>
 * </ul>
 */
export class StringOfLengthGenerator extends ValueGenerator<
  string,
  StringGeneratorConfig
> {
  constructor(config: StringGeneratorConfig) {

    if (!config.length) {
      throw new Error(`Property 'length' is required`);
    } else if (!config.charset) {
      throw new Error(`Property 'charset' is required`);
    }

    super(config);
  }

  get = (): string => {
    let value = randomStringOfLength(this.config.charset, this.config.length);
    return this.pipe(value);
  };
}
