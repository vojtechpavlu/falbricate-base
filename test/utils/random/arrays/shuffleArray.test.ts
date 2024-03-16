import { shuffleArray } from '../../../../src/utils/random/arrays';

describe('shuffleArray function', () => {
  it('should return an array with same length', () => {
    const array = ['a', 'b', 'c'];
    const shuffled = shuffleArray(array);

    expect(shuffled.length).toBe(array.length);
  });

  it('should return all the items from the original array', () => {
    const array = ['a', 'b', 'c'];
    const shuffled = shuffleArray(array);

    array.forEach((item) => {
      expect(shuffled.includes(item)).toBeTruthy();
    });
  });

  it('should not modify original array', () => {
    const array = ['a', 'b', 'c'];
    const stringified = JSON.stringify(array);
    shuffleArray(array);

    expect(JSON.stringify(array)).toBe(stringified);
  });

  it('should actually shuffle the given array', () => {
    // Generate a long array
    const array = Array.from(Array(500).keys()).map(i => i);
    const shuffled = shuffleArray(array);

    expect(JSON.stringify(shuffled)).not.toBe(JSON.stringify(array));
  });

  it('should throw on empty array', () => {
    expect(() => shuffleArray([])).toThrow();
  });
})