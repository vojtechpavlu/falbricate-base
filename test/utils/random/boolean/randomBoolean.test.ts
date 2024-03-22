import { randomBoolean } from '../../../../src/utils/random/boolean';

describe('randomBoolean function', () => {
  it('should return a boolean value', () => {
    const value = randomBoolean();
    expect(typeof value === 'boolean').toBe(true);
  });

  it('should generate always false on 0', () => {
    const value = randomBoolean(0);
    expect(value).toBe(false);
  });

  it('should generate always true on 1', () => {
    const value = randomBoolean(1);
    expect(value).toBe(true);
  });

  it('should generate always false on 0', () => {
    const value = randomBoolean(0);
    expect(value).toBe(false);
  });

  it('should throw on negative number', () => {
    expect(() => randomBoolean(-1)).toThrow();
  });

  it('should throw on number greater than 1', () => {
    expect(() => randomBoolean(7)).toThrow();
  });
});
