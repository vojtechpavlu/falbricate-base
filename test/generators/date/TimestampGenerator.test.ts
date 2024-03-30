import { getValueGenerator, TimestampGeneratorConfig } from '../../../src';

const generatorName = 'relative-timestamp';

describe('TimestampGenerator', () => {
  it('should be available via name', () => {
    const config: TimestampGeneratorConfig = {
      period: {
        seconds: 20,
      },
      direction: 'past',
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });

  it('should generate number by default', () => {
    const config: TimestampGeneratorConfig = {
      period: {
        seconds: 20,
      },
      direction: 'past',
    };

    const generator = getValueGenerator(generatorName, config);

    expect(typeof generator.generate()).toBe('number');
  });

  it('should generate a date when specified', () => {
    const config: TimestampGeneratorConfig = {
      period: {
        seconds: 20,
      },
      direction: 'past',
      asDate: true,
    };

    const generator = getValueGenerator(generatorName, config);

    expect(generator.generate() instanceof Date).toBe(true);
  });

  it('should generate a timestamp in past', () => {
    const config: TimestampGeneratorConfig = {
      period: {
        hours: 100,
      },
      direction: 'past',
    };

    const generator = getValueGenerator(generatorName, config);

    const currentDate = Date.now();

    expect(generator.generate()).toBeLessThanOrEqual(currentDate);
  });

  it('should generate a timestamp in future', () => {
    const config: TimestampGeneratorConfig = {
      period: {
        hours: 100,
      },
      direction: 'future',
    };

    const generator = getValueGenerator(generatorName, config);

    const currentDate = Date.now();

    expect(generator.generate()).toBeGreaterThanOrEqual(currentDate);
  });

  it('should generate a timestamp in past within range', () => {
    const config: TimestampGeneratorConfig = {
      period: {
        seconds: 100,
      },
      direction: 'future',
      minimumPeriod: {
        seconds: 99,
      },
    };

    const generator = getValueGenerator(generatorName, config);

    const currentDate = Date.now() + 99 * 1000;

    expect(generator.generate()).toBeGreaterThanOrEqual(currentDate);
  });

  it('should generate a timestamp in past within range', () => {
    const config: TimestampGeneratorConfig = {
      period: {
        seconds: 100,
      },
      direction: 'past',
      minimumPeriod: {
        seconds: 99,
      },
    };

    const generator = getValueGenerator(generatorName, config);

    const currentDate = Date.now() - 99 * 1000;

    expect(generator.generate()).toBeLessThanOrEqual(currentDate);
  });
});
