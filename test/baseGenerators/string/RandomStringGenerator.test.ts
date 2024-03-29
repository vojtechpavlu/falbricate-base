import { getValueGenerator, RandomStringGeneratorConfig } from '../../../src';

const generatorName = 'random-string';

describe('RandomStringGenerator', () => {
  it('should be possible to be found by name', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: 0,
      maxLen: 20,
      charset: ['a', 'b', 'c']
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });

  it('should generate a string', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: 0,
      maxLen: 20,
      charset: ['a', 'b', 'c']
    };

    const generator = getValueGenerator(generatorName, config);

    expect(typeof generator.generate()).toBe('string');
  });

  it('should generate a string of characters', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: 0,
      maxLen: 20,
      charset: ['a', 'b', 'c']
    };

    const generator = getValueGenerator(generatorName, config);

    const value = generator.generate() as string;

    value.split('').forEach((char) => {
      expect(config.charset.includes(char)).toBe(true);
    });
  });

  it('should generate a string of possible length', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: 0,
      maxLen: 20,
      charset: ['a', 'b', 'c']
    };

    const generator = getValueGenerator(generatorName, config);

    const value = generator.generate() as string;

    expect(value.length).toBeGreaterThanOrEqual(config.minLen as number);
    expect(value.length).toBeLessThanOrEqual(config.maxLen as number);
  });

  it('should throw on negative min length', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: -1,
      maxLen: 20,
      charset: ['a', 'b', 'c']
    };
    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });

  it('should throw on max > min', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: 20,
      maxLen: 3,
      charset: ['a', 'b', 'c']
    };
    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });

  it('should throw on max > min', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: 20,
      maxLen: 3,
      charset: ['a', 'b', 'c']
    };
    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });

  it('should throw on not-charset value', () => {
    const config: RandomStringGeneratorConfig = {
      minLen: 20,
      maxLen: 3,
      // @ts-ignore
      charset: 13
    };
    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });
});
