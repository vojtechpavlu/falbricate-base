import { randomInteger } from '../../../src/utils';

describe('randomInteger function', () => {
  it('should return a number within range', () => {
    const value = randomInteger(1, 2);
    expect(value >= 1).toBeTruthy();
    expect(value <= 2).toBeTruthy();
  });

  it('should return a number when min === max', () => {
    const value = randomInteger(1, 1);
    expect(value).toBe(1);
  });

  it('should throw on min > max', () => {
    expect(() => randomInteger(30, 1)).toThrow();
  });
});
