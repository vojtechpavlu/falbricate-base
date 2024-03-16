import { randomDateTime } from '../../../../src';

describe('randomDateTime function', () => {
  it('should return date in range', () => {
    const from = new Date('2000-01-01T00:00:00');
    const to = new Date('2000-12-31T00:00:00');
    const randomized = randomDateTime(from, to);

    expect(randomized.getTime()).toBeGreaterThan(from.getTime());
    expect(randomized.getTime()).toBeLessThan(to.getTime());
  });

  it('should return exact date when from === to', () => {
    const date = new Date();
    const randomized = randomDateTime(date, date);

    expect(randomized.getTime()).toBe(date.getTime());
  });

  it('should fail on from > to', () => {
    const from = new Date('2000-12-31T00:00:00');
    const to = new Date('2000-01-01T00:00:00');

    expect(() => randomDateTime(from, to)).toThrow();
  });
});
