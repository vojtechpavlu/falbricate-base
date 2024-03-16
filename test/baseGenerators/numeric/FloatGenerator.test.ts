import {
  FloatGenerator,
  FloatGeneratorConfig,
} from '../../../src';

describe('FloatGenerator class', () => {
  it('should return a float within a given range (without precision)', () => {
    const conf: FloatGeneratorConfig = {
      min: 0,
      max: 3,
    };

    const generator = new FloatGenerator(conf);

    expect(generator.get()).toBeGreaterThanOrEqual(0);
    expect(generator.get()).toBeLessThanOrEqual(3);
  });

  it('should return a float within a given range (with precision)', () => {
    const conf: FloatGeneratorConfig = {
      min: 0,
      max: 3,
      decimalDigits: 4,
    };

    const generator = new FloatGenerator(conf);

    expect(generator.get()).toBeGreaterThanOrEqual(0);
    expect(generator.get()).toBeLessThanOrEqual(3);
    expect(`${generator.get()}`.split('.')[1]!.length).toBeLessThanOrEqual(4);
  });

  it('should trigger the pipe', () => {
    const conf: FloatGeneratorConfig = {
      min: 0,
      max: 3,
      pipes: [() => 'test'],
    };

    const generator = new FloatGenerator(conf);
    expect(generator.get()).toBe('test');
  });
});
