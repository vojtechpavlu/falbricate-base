import { ConstantValueConfig, getValueGenerator } from '../../../src';

const generatorName = 'constant-value';

describe('ConstantValue generator', () => {
  it('should be found using its name', () => {
    const config: ConstantValueConfig = {
      value: 'test',
    };

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();
  });

  it('should generate a string', () => {
    const config: ConstantValueConfig = {
      value: 'test',
    };

    const generator = getValueGenerator(generatorName, config);

    expect(generator.generate()).toBe('test');
    expect(typeof generator.generate()).toBe('string');
  });

  it('should generate a number', () => {
    const config: ConstantValueConfig = {
      value: 76,
    };

    const generator = getValueGenerator(generatorName, config);

    expect(generator.generate()).toBe(76);
    expect(typeof generator.generate()).toBe('number');
  });

  it('should generate an undefined', () => {
    const config: ConstantValueConfig = {
      value: undefined,
    };

    expect(getValueGenerator(generatorName, config).generate()).toBeUndefined();
  });

  it('should generate a null', () => {
    const config: ConstantValueConfig = {
      value: null,
    };

    expect(getValueGenerator(generatorName, config).generate()).toBeNull();
  });

  it('should generate an array', () => {
    const config: ConstantValueConfig = {
      value: ['a', 'b', 'c'],
    };

    const values = getValueGenerator(
      generatorName,
      config,
    ).generate() as string[];

    expect(values.length).toBe(config.value.length);

    config.value.forEach((value: string, index: number) => {
      expect(value).toBe(values[index]);
    });
  });

  it('should generate an object', () => {
    const config: ConstantValueConfig = {
      value: {
        a: 'test a',
        b: 'test b',
      },
    };

    const values = getValueGenerator(generatorName, config).generate() as any;

    expect(values.a).toBe('test a');
    expect(values.b).toBe('test b');
    expect(Object.keys(values).length).toBe(2);
  });

  it('should create a deep copy', () => {
    const config: ConstantValueConfig = {
      value: {
        a: 'test a',
      },
    };

    const values = getValueGenerator(generatorName, config).generate() as any;

    expect(values.a).toBe('test a');
    expect(Object.keys(values).length).toBe(1);

    config.value.a = 'not test a';

    expect(values.a).toBe('test a');
  });
});
