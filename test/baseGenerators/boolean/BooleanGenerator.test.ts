import { ProbableBooleanGenerator, getValueGenerator } from '../../../src';

const generatorName = 'probable-boolean';

describe('BooleanGenerator', () => {
  it('should be accessible via name', () => {
    expect(() => getValueGenerator(generatorName, {})).not.toThrow();

    const generator = getValueGenerator(generatorName, {});

    expect(generator).not.toBeUndefined();
  });

  it('should be return a boolean value', () => {
    const generator = getValueGenerator(generatorName, {}) as ProbableBooleanGenerator;

    const value = generator.generate();

    expect(typeof value).toBe('boolean');
  });

  it('should return true on probability === 1', () => {
    const generator = getValueGenerator(generatorName, {
      probability: 1
    }) as ProbableBooleanGenerator;

    const value = generator.generate();

    expect(value).toBe(true);
  });

  it('should return false on probability === 0', () => {
    const generator = getValueGenerator(generatorName, {
      probability: 0
    }) as ProbableBooleanGenerator;

    const value = generator.generate();

    expect(value).toBe(false);
  });
});
