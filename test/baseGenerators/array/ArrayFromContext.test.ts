import { get, ArrayFromContextGenerator } from '../../../src';

const generatorName = 'array-in-context';

describe('ArrayFromContext generator', () => {
  it('should access the context at first level', () => {
    const context = {
      value: [33],
    };

    const generator = new ArrayFromContextGenerator({
      path: 'value',
    });

    expect(generator.get(context)[0]).toBe(33);
  });

  it('should access the context at second level', () => {
    const context = {
      envelope: {
        value: [33],
      },
    };

    const generator = new ArrayFromContextGenerator({
      path: 'envelope.value',
    });

    expect(generator.get(context)[0]).toBe(33);
  });

  it('should access the context at third level', () => {
    const context = {
      envelope1: {
        envelope2: {
          value: [33],
        },
      },
    };

    const generator = new ArrayFromContextGenerator({
      path: 'envelope1.envelope2.value',
    });

    expect(generator.get(context)[0]).toBe(33);
  });

  it('should access the context at third level with separator', () => {
    const context = {
      envelope1: {
        envelope2: {
          value: [33],
        },
      },
    };

    const generator = new ArrayFromContextGenerator({
      path: 'envelope1/envelope2/value',
      sep: '/',
    });

    expect(generator.get(context)[0]).toBe(33);
  });

  it('should throw an error on string non-empty value', () => {
    const context = { value: 'test' };

    const generator = new ArrayFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).toThrow();
  });

  it('should not throw an error on empty array', () => {
    const context = { value: [] };

    const generator = new ArrayFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should not throw an error on undefined value', () => {
    const context = { value: undefined };

    const generator = new ArrayFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should not throw an error on null value', () => {
    const context = { value: null };

    const generator = new ArrayFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should use the pipes', () => {
    const context = {
      value: [33],
    };

    const generator = new ArrayFromContextGenerator({
      path: 'value',
      pipes: [(value: any[]) => value.length + 22],
    });

    expect(generator.get(context)).toBe(23);
  });

  it('should be available via string name', () => {
    const context = {
      value: [33],
    };

    const generator = get(generatorName, {
      path: 'value',
    });

    expect((generator.get(context) as number[])[0]).toBe(33);
  });
});
