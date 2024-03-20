import { get, NumberFromContextGenerator } from '../../../src';

const generatorName = 'number-in-context';

describe('NumberFromContext generator', () => {
  it('should access the context at first level', () => {
    const context = {
      value: 33,
    };

    const generator = new NumberFromContextGenerator({
      path: 'value',
    });

    expect(generator.get(context)).toBe(33);
  });

  it('should access the context at second level', () => {
    const context = {
      envelope: {
        value: 33,
      },
    };

    const generator = new NumberFromContextGenerator({
      path: 'envelope.value',
    });

    expect(generator.get(context)).toBe(33);
  });

  it('should access the context at third level', () => {
    const context = {
      envelope1: {
        envelope2: {
          value: 33,
        },
      },
    };

    const generator = new NumberFromContextGenerator({
      path: 'envelope1.envelope2.value',
    });

    expect(generator.get(context)).toBe(33);
  });

  it('should access the context at third level with separator', () => {
    const context = {
      envelope1: {
        envelope2: {
          value: 33,
        },
      },
    };

    const generator = new NumberFromContextGenerator({
      path: 'envelope1/envelope2/value',
      sep: '/',
    });

    expect(generator.get(context)).toBe(33);
  });

  it('should throw an error on string non-empty value', () => {
    const context = { value: "test" };

    const generator = new NumberFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).toThrow();
  });

  it('should not throw an error on zero value', () => {
    const context = { value: 0 };

    const generator = new NumberFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should not throw an error on undefined value', () => {
    const context = { value: undefined };

    const generator = new NumberFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should not throw an error on null value', () => {
    const context = { value: null };

    const generator = new NumberFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should use the pipes', () => {
    const context = {
      value: 33,
    };

    const generator = new NumberFromContextGenerator({
      path: 'value',
      pipes: [(value: number) => value + 11],
    });

    expect(generator.get(context)).toBe(44);
  });

  it('should be available via string name', () => {
    const context = {
      value: 33,
    };

    const generator = get(generatorName, {
      path: 'value',
    });

    expect(generator.get(context)).toBe(33);
  });
});
