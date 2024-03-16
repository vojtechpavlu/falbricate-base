import { randomInteger } from './numbers';

/**
 * Generates a random date within a given date range.
 *
 * @param from  Start datetime period interval
 * @param to    End datetime period interval
 */
export const randomDateTime = (from: Date, to: Date) => {
  const periodMs = to.getTime() - from.getTime();
  return new Date(from.getTime() + randomInteger(0, periodMs));
}
