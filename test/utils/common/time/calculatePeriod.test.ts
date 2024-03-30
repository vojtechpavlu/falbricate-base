import {
  calculatePeriod,
  TimePeriod,
} from '../../../../src/utils/common/timePeriod';

describe('calculatePeriod function', () => {
  it('should calculate expected single value period', () => {
    const period: TimePeriod = {
      hours: 3,
    };

    expect(calculatePeriod(period)).toBe(3 * 3600 * 1000);
  });

  it('should calculate expected multiple value period', () => {
    const period: TimePeriod = {
      hours: 3,
      seconds: 7,
    };

    expect(calculatePeriod(period)).toBe(
      // hours
      3 * 3600 * 1000 +
        // seconds
        7 * 1000,
    );
  });

  it('should throw on negative value', () => {
    const period: TimePeriod = {
      hours: -3,
    };

    expect(() => calculatePeriod(period)).toThrow();
  });

  it('should return 0 on empty TimePeriod config', () => {
    const period: TimePeriod = {};

    expect(calculatePeriod(period)).toBe(0);
  });

  it('should not use nor fail on any other field', () => {
    const period: TimePeriod = {
      nonExisting: 7000,
    };

    expect(calculatePeriod(period)).toBe(0);
  });
});
