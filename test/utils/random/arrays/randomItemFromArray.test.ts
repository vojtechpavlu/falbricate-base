import { randomItemFromArray } from '../../../../src';

describe('randomItemFromArray function', () => {
  it('should return an item withing the given array', () => {
    const array = ['a', 'b', 'c'];
    const item = randomItemFromArray(array);

    expect(array.includes(item)).toBeTruthy();
  });

  it('should return item on a single-item array', () => {
    const array = ['a'];
    const item = randomItemFromArray(array);
    expect(item).toBe('a');
  });

  it('should throw on empty array', () => {
    expect(() => randomItemFromArray([])).toThrow();
  });
});
