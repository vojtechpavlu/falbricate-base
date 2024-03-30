import { Charset, randomInteger, randomStringOfLength } from '../../utils';
import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';

/**
 * Configuration for the String generator of length in a specified range
 */
export type RandomStringGeneratorConfig = {
  minLen?: number;
  maxLen: number;
  charset: Charset;
} & ValueGeneratorConfig;

/**
 * Generates a random string of a given length range consisting
 * of the given charset items only.
 */
export class RandomStringGenerator extends ValueGenerator<
  GeneratedValue,
  RandomStringGeneratorConfig
> {
  constructor(config: RandomStringGeneratorConfig) {
    config.minLen = config.minLen ?? 0;

    if (!config.maxLen) {
      throw new Error(`Property 'maxLen' is required`);
    } else if (config.minLen < 0 || config.maxLen < 0) {
      throw new Error(`Both 'minLen' and 'maxLen' must not be negative`);
    } else if (config.minLen > config.maxLen) {
      throw new Error(
        `Maximum string length must be greater or equal than the minimum: ` +
          `(${config.minLen} > ${config.maxLen})`,
      );
    } else if (!config.charset) {
      throw new Error(`Property 'charset' is required`);
    }

    super(config);
  }

  protected get = (): GeneratedValue => {
    const length = randomInteger(
      this.config.minLen as number,
      this.config.maxLen,
    );
    return randomStringOfLength(this.config.charset, length);
  };
}
