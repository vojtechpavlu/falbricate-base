import { ArraySampleGenerator } from '../../../src';

describe('ArraySampleGenerator class', () => {
  it('should return a specified number of items', () => {
    const array = ['a', 'b', 'c', 'd'];
    const generator = new ArraySampleGenerator({
      array,
      sampleSize: 2,
    });

    expect(generator.generate().length).toBe(2);
  });

  it('should return a subset of the configured array', () => {
    const array = ['a', 'b', 'c', 'd'];
    const generator = new ArraySampleGenerator({
      array,
      sampleSize: 2,
    });

    const generatedItems = generator.generate();

    generatedItems.forEach((item: string) => {
      expect(array.includes(item)).toBe(true);
    });
  });

  it('should throw on zero sample size', () => {
    const config = {
      array: ['a', 'b', 'c', 'd'],
      sampleSize: 0,
    };

    expect(() => new ArraySampleGenerator(config)).toThrow();
  });

  it('should throw on negative sample size', () => {
    const config = {
      array: ['a', 'b', 'c', 'd'],
      sampleSize: -1,
    };

    expect(() => new ArraySampleGenerator(config)).toThrow();
  });

  it('should throw on empty array', () => {
    const config = {
      array: [],
      sampleSize: 1,
    };

    expect(() => new ArraySampleGenerator(config)).toThrow();
  });

  it('should throw on greater sample size than array length', () => {
    const config = {
      array: ['a', 'b', 'c', 'd'],
      sampleSize: 15,
    };

    expect(() => new ArraySampleGenerator(config)).toThrow();
  });
});
