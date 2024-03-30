import { getValueGenerator } from '../../../src';

const generatorName = 'range-date-time';

describe('DateTimeInRange generator', () => {
  it('should be able to be found by name', () => {
    const config = {
      from: new Date('2000-01-01'),
      to: new Date('2999-01-01'),
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });

  it('should return a date', () => {
    const config = {
      from: new Date('2000-01-01'),
      to: new Date('2999-01-01'),
    };

    const generator = getValueGenerator(generatorName, config);

    expect(generator.generate({})).toBeInstanceOf(Date);
  });

  it('should return a date within the given range', () => {
    const config = {
      from: new Date('2000-01-01'),
      to: new Date('2999-01-01'),
    };

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate({}) as Date;

    expect(value.getTime()).toBeGreaterThanOrEqual(config.from.getTime());
    expect(value.getTime()).toBeLessThanOrEqual(config.to.getTime());
  });

  it('should throw on from > to', () => {
    const config = {
      from: new Date('2999-01-01'),
      to: new Date('2000-01-01'),
    };

    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });

  it('should accept strings', () => {
    const config = {
      from: '2000-01-01',
      to: '2999-01-01',
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });

  it('should accept numbers (timestamps)', () => {
    const config = {
      from: 123456,
      to: 654321,
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });
});
