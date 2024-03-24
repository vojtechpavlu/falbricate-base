import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig
} from '../ValueGenerator';
import { randomDateTime } from '../../utils';

/**
 * For easier access, it has to be either:
 * <ul>
 *   <li>instance of Date</li>
 *   <li>string representing the date time (in standard format)</li>
 *   <li>number representing the date time (in milliseconds)</li>
 * </ul>
 */
export type DateTimeDeclaration = Date | string | number

export type DateTimeInRangeGeneratorConfig = {
  from: DateTimeDeclaration;
  to: DateTimeDeclaration;
} & ValueGeneratorConfig;


/**
 * This class generates a random integer within a given range.
 */
export class DateTimeInRangeGenerator extends ValueGenerator<
  GeneratedValue,
  DateTimeInRangeGeneratorConfig
> {
  constructor(config: DateTimeInRangeGeneratorConfig) {

    if (!config.from) {
      throw new Error(`Property 'from' is required`);
    } else if (!config.to) {
      throw new Error(`Property 'to' is required`);
    }

    super(config);

    this.config.from = this.buildDate(config.from);
    this.config.to = this.buildDate(config.to);

    if (this.config.from.getTime() > this.config.to.getTime()) {
      throw new Error(`Given date 'from' is after given date 'to' (${this.config.from} > ${this.config.to})`);
    }
  }

  /** Shorthand for building the date */
  private buildDate = (value: DateTimeDeclaration): Date => {
    return new Date(value);
  };

  get = (): GeneratedValue => {
    return randomDateTime(
      this.config.from as Date,
      this.config.to as Date
    );
  };
}
