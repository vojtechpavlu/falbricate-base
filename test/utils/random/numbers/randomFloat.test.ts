import { randomFloat } from '../../../../src';

describe('randomFloat function', () => {
  it('should return a number within range', () => {
    const value = randomFloat(1, 2);
    expect(value >= 1).toBeTruthy();
    expect(value <= 2).toBeTruthy();
  });

  it('should return a number when min === max', () => {
    const value = randomFloat(1, 1);
    expect(value).toBe(1);
  });

  it('should return a specific decimal digits', () => {
    const value = randomFloat(1, 5, 3);
    const decimalPart = `${value}`.split('.')[1]!;

    // In case the last decimal digits are zero
    expect(decimalPart.length).toBeLessThanOrEqual(3);
  });

  it('should throw on min > max', () => {
    expect(() => randomFloat(30, 1)).toThrow();
  });

  it('should throw on negative decimalDigits', () => {
    expect(() => randomFloat(1, 5, -1)).toThrow();
  });
});
