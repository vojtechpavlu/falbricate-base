import { randomSampleFromArray } from '../../../src/utils/random/arrays';

describe('randomSampleFromArray function', () => {
  it('should return array of items of given length', () => {
    const array = ['a', 'b', 'c', 'd'];
    const sample = randomSampleFromArray(array, 2);

    expect(sample.length).toBe(2);
  });

  it('should return items in the array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const sample = randomSampleFromArray(array, 2);

    sample.forEach((item) => {
      expect(array.includes(item)).toBeTruthy();
    })
  })

  it('should return without repetition', () => {
    const array = ['a', 'b', 'c', 'd'];
    const shuffled = randomSampleFromArray(array, 4);

    shuffled.forEach((item1, idx1) => {
      shuffled.forEach((item2, idx2) => {
        if (idx1 < idx2) {
          expect(item1).not.toBe(item2);
        }
      })
    })
  })

  it('should throw on empty array', () => {
    expect(() => randomSampleFromArray([], 2)).toThrow()
  })

  it('should throw on n > arr.length', () => {
    const array = ['a'];
    expect(() => randomSampleFromArray(array, 5)).toThrow()
  })

  it('should throw on n < 1', () => {
    const array = ['a', 'b', 'c', 'd'];
    expect(() => randomSampleFromArray(array, 0)).toThrow()
    expect(() => randomSampleFromArray(array, -1)).toThrow()
  })
})