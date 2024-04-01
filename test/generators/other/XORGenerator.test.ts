import { getValueGenerator, XORConfiguration } from '../../../src';

const generatorName = 'xor';

describe('XORGenerator', () => {
  it('should be available by name', () => {
    const config: XORConfiguration = {
      generators: {
        zero: { type: 'constant-value', config: { value: 0 } },
        one: { type: 'constant-value', config: { value: 1 } },
      },
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });

  it('should be generate one or the other', () => {
    const config: XORConfiguration = {
      generators: {
        zero: { type: 'constant-value', config: { value: 0 } },
        one: { type: 'constant-value', config: { value: 1 } },
      },
    };

    const generator = getValueGenerator(generatorName, config);

    expect([0, 1].includes(generator.generate() as number)).toBe(true);
  });

  it('should be generate eventually both values ', () => {
    const config: XORConfiguration = {
      generators: {
        zero: { type: 'constant-value', config: { value: 0 } },
        one: { type: 'constant-value', config: { value: 1 } },
      },
    };

    const generator = getValueGenerator(generatorName, config);

    const values: number[] = [];

    for (let i = 0; i < 100; i++) {
      values.push(generator.generate() as number);
    }

    [0, 1].forEach((value) => {
      expect(values.includes(value)).toBe(true);
    });
  });
});
