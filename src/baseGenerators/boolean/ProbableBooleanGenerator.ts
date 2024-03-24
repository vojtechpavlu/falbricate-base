import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../ValueGenerator';
import { randomBoolean } from '../../utils/random/boolean';

/**
 * This configuration specifies how probably should be
 * `true` generated.
 */
export type BooleanGeneratorConfig = {
  probability?: number
} & ValueGeneratorConfig;

/**
 * This class generates a random integer within a given range.
 */
export class ProbableBooleanGenerator extends ValueGenerator<
  GeneratedValue,
  BooleanGeneratorConfig
> {
  constructor(config: BooleanGeneratorConfig) {

    config.probability = config.probability === undefined ? 0.5 : config.probability

    if (config.probability > 1) {
      throw new Error(`Given probability must be less or equal to 1: ${config.probability}`);
    } else if (config.probability < 0) {
      throw new Error(`Given probability must not be negative: ${config.probability}`)
    }

    super(config);
  }

  get = (): GeneratedValue => {
    return randomBoolean(this.config.probability);
  };
}