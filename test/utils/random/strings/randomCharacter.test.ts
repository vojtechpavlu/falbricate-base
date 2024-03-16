import { randomCharacter } from '../../../../src/utils/random/strings';

describe('randomCharacter function', () => {
  it('should return a character from a valid charset', () => {
    const charset = ['a', 'b', 'c'];
    const randomized = randomCharacter(charset);

    expect(charset.includes(randomized)).toBe(true);
  })

  it('should throw on invalid charset', () => {
    const empty = [] as any[];
    const nonStrings = [1, 2, 3];
    const notSingleChars = ["not", "single", "characters"]

    expect(() => randomCharacter(empty)).toThrow();
    expect(() => randomCharacter(nonStrings)).toThrow();
    expect(() => randomCharacter(notSingleChars)).toThrow();
  })
})