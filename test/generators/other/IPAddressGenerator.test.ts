import {
  getValueGenerator,
  IPAddressConfig,
  IPAddressValueGenerator,
} from '../../../src';

const generatorName = 'ip-address';

describe('IP Generator', () => {
  it('should be found by name', () => {
    const config: IPAddressConfig = {
      octet1: { min: 1, max: 254 },
      octet2: { min: 1, max: 254 },
      octet3: { min: 1, max: 254 },
      octet4: { min: 1, max: 254 },
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });

  it('should generate a string', () => {
    const config: IPAddressConfig = {
      octet1: { min: 1, max: 254 },
      octet2: { min: 1, max: 254 },
      octet3: { min: 1, max: 254 },
      octet4: { min: 1, max: 254 },
    };

    const generator = getValueGenerator(generatorName, config);

    expect(typeof generator.generate()).toBe('string');
  });

  it('should generate with expected octets', () => {
    const config: IPAddressConfig = {
      octet1: { min: 1, max: 254 },
      octet2: { min: 1, max: 254 },
      octet3: { min: 1, max: 254 },
      octet4: { min: 1, max: 254 },
    };

    const generator = getValueGenerator(generatorName, config);
    const octets = (generator.generate() as string).split('.');

    octets.forEach((octet, idx) => {
      const numerized = parseInt(octet);
      expect(typeof numerized).toBe('number');
      expect(numerized).toBeGreaterThanOrEqual(config[`octet${idx + 1}`]!.min);
      expect(numerized).toBeLessThanOrEqual(config[`octet${idx + 1}`]!.max);
    });
  });

  it('should fail on negative octet min value', () => {
    const config: IPAddressConfig = {
      octet1: { min: -1, max: 254 },
      octet2: { min: -1, max: 254 },
      octet3: { min: -1, max: 254 },
      octet4: { min: -1, max: 254 },
    };

    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });

  it('should fail on octet max value > 255', () => {
    const config: IPAddressConfig = {
      octet1: { min: 1, max: 700 },
      octet2: { min: 1, max: 700 },
      octet3: { min: 1, max: 700 },
      octet4: { min: 1, max: 700 },
    };

    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });

  it('should fail on octet min > max', () => {
    const config: IPAddressConfig = {
      octet1: { min: 100, max: 7 },
      octet2: { min: 100, max: 7 },
      octet3: { min: 100, max: 7 },
      octet4: { min: 100, max: 7 },
    };

    expect(() => getValueGenerator(generatorName, config)).toThrow();
  });
});
