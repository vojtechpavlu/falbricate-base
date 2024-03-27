import { ConstantValue, NullabilityConfiguration } from '../../src';

describe('Nullability of generated values', () => {
  it('should accept nullability configuration', () => {
    const conf: NullabilityConfiguration = {
      nullValue: undefined,
      probability: 0.5,
    };

    const generator = new ConstantValue({
      nullability: conf,
      value: 'test',
    });

    const value: string | undefined = generator.generate({});

    expect(value === undefined || value === 'test').toBe(true);
  });

  it('should always generate value on probability === 1', () => {
    const conf: NullabilityConfiguration = {
      nullValue: undefined,
      probability: 1,
    };

    const generator = new ConstantValue({
      nullability: conf,
      value: 'test',
    });

    const value: string = generator.generate({});

    expect(value).toBe('test');
  });

  it('should never generate value on probability === 0', () => {
    const conf: NullabilityConfiguration = {
      nullValue: undefined,
      probability: 0,
    };

    const generator = new ConstantValue({
      nullability: conf,
      value: 'test',
    });

    const value: undefined = generator.generate({});

    expect(value).toBeUndefined();
  });

  it('should generate more non-null values on probability === 0.9', () => {
    const conf: NullabilityConfiguration = {
      nullValue: undefined,
      probability: 0.9,
    };

    const generator = new ConstantValue({
      nullability: conf,
      value: 'test',
    });

    let undefineds = 0;
    let values = 0;

    for (let i = 0; i < 10_000; i++) {
      const value = generator.generate({});
      undefineds += value === undefined ? 1 : 0;
      values += value === 'test' ? 1 : 0;
    }

    expect(values > undefineds).toBe(true);
  });

  it('should generate more non-null values on probability === 0.9', () => {
    const conf: NullabilityConfiguration = {
      nullValue: undefined,
      probability: 0.1,
    };

    const generator = new ConstantValue({
      nullability: conf,
      value: 'test',
    });

    let undefineds = 0;
    let values = 0;

    for (let i = 0; i < 10_000; i++) {
      const value = generator.generate({});
      undefineds += value === undefined ? 1 : 0;
      values += value === 'test' ? 1 : 0;
    }

    expect(values < undefineds).toBe(true);
  });
});
