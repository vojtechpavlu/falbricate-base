import { FloatGenerator, FloatGeneratorConfig } from '../../../src';

describe('FloatGenerator class', () => {
  it('should return a float within a given range (without precision)', () => {
    const conf: FloatGeneratorConfig = {
      min: 0,
      max: 3,
    };

    const generator = new FloatGenerator(conf);

    expect(generator.generate()).toBeGreaterThanOrEqual(0);
    expect(generator.generate()).toBeLessThanOrEqual(3);
  });

  it('should return a float within a given range (with precision)', () => {
    const conf: FloatGeneratorConfig = {
      min: 0,
      max: 3,
      decimalDigits: 4,
    };

    const generator = new FloatGenerator(conf);

    expect(generator.generate()).toBeGreaterThanOrEqual(0);
    expect(generator.generate()).toBeLessThanOrEqual(3);
    expect(`${generator.generate()}`.split('.')[1]!.length).toBeLessThanOrEqual(
      4,
    );
  });
});
