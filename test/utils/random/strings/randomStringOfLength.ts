import { randomStringOfLength } from '../../../../src';

describe('randomStringOfLength function', () => {
  it('should return a string of length', () => {
    const charset = ['a', 'b', 'c'];
    const randomized = randomStringOfLength(charset, 10);

    expect(randomized.length).toBe(10);
  });

  it('should return a string of given charset', () => {
    const charset = ['a', 'b', 'c'];
    const randomized = randomStringOfLength(charset, 10);

    randomized.split('').forEach((char) => {
      expect(charset.includes(char)).toBe(true);
    });
  });

  it('should return an empty string on length === 0', () => {
    const charset = ['a', 'b', 'c'];
    const randomized = randomStringOfLength(charset, 0);

    expect(randomized).toBe('');
  });

  it('should throw on length < 0', () => {
    const charset = ['a', 'b', 'c'];

    expect(() => randomStringOfLength(charset, -5)).toThrow();
  });

  it('should throw on invalid charset', () => {
    const empty = [] as any[];
    const nonStrings = [1, 2, 3];
    const notSingleChars = ['not', 'single', 'characters'];

    expect(() => randomStringOfLength(empty, 5)).toThrow();
    expect(() => randomStringOfLength(nonStrings, 5)).toThrow();
    expect(() => randomStringOfLength(notSingleChars, 5)).toThrow();
  });
});
