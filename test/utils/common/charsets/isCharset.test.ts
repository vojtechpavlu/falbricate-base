import { isCharset } from '../../../../src';

describe('isCharset function', () => {
  it('should return false on empty array', () => {
    expect(isCharset([])).toBe(false);
  });

  it('should return false on non-array', () => {
    expect(isCharset('test')).toBe(false);
  });

  it('should return false on undefined', () => {
    expect(isCharset(undefined)).toBe(false);
  });

  it('should return false on null', () => {
    expect(isCharset(null)).toBe(false);
  });

  it('should return false on non-single-character strings', () => {
    const array = ['non-single', 'character'];
    expect(isCharset(array)).toBe(false);
  });

  it('should return false on non-string array', () => {
    const array = [1, 2, 3];
    expect(isCharset(array)).toBe(false);
  });

  it('should return true on single-character strings', () => {
    const array = ['a', 'b', 'c'];
    expect(isCharset(array)).toBe(true);
  });
});
