import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig
} from '../index';
import { randomInteger } from '../../utils';
import { calculatePeriod, TimePeriod } from '../../utils/common/timePeriod';

/**
 * This is an alias for describing the timestamp
 * to be in the past or in the future
 */
export type TimeDirection = 'past' | 'future';

/**
 * This configuration describes the relative timestamp;
 * in what range (period) it should be, the direction
 * (past or future) and if the value should be a number
 * (UNIX timestamp) or if it should be a general Date.
 */
export type TimestampGeneratorConfig = {
  period: TimePeriod,
  direction: TimeDirection
  asDate?: boolean
  minimumPeriod?: TimePeriod
} & ValueGeneratorConfig

/**
 * This value generator is responsible for generating random
 * timestamps; either in future or in past.
 */
export class TimestampGenerator extends ValueGenerator<
  GeneratedValue,
  TimestampGeneratorConfig
> {

  private readonly period: number;
  private readonly minimumPeriod: number;

  constructor(config: TimestampGeneratorConfig) {
    super(config);

    this.period = calculatePeriod(this.config.period)
    this.minimumPeriod = this.config.minimumPeriod ? calculatePeriod(this.config.minimumPeriod) : 0

    if (this.period < this.minimumPeriod) {
      throw new Error(
        `Periods are not set properly: ` +
        `There is no suitable timestamp in ${this.config.direction} ` +
        `where the maximum period of time from now is ${this.period} ms but ` +
        `the date must be at least ${this.minimumPeriod} ms from now`
      )
    }
  }

  get = (): GeneratedValue => {
    // Create a timestamp pivot
    const currentTimestamp = Date.now();

    let timestamp;

    // Decide if the timestamp is in the past or in the future
    if (this.config.direction === 'past') {
      timestamp = randomInteger(
        currentTimestamp - this.period,
        currentTimestamp - this.minimumPeriod
      );
    } else {
      timestamp = randomInteger(
        currentTimestamp + this.minimumPeriod,
        currentTimestamp + this.period
      );
    }

    // When the timestamp should be a Date
    if (this.config.asDate) {
      timestamp = new Date(timestamp);
    }

    return timestamp;
  };
}
