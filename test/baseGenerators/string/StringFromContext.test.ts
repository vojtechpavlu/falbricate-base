import { get, StringFromContextGenerator } from '../../../src';

const generatorName = 'string-in-context';

describe('StringFromContext generator', () => {
  it('should access the context at first level', () => {
    const context = {
      value: 'test',
    };

    const generator = new StringFromContextGenerator({
      path: 'value',
    });

    expect(generator.get(context)).toBe('test');
  });

  it('should access the context at second level', () => {
    const context = {
      envelope: {
        value: 'test',
      },
    };

    const generator = new StringFromContextGenerator({
      path: 'envelope.value',
    });

    expect(generator.get(context)).toBe('test');
  });

  it('should access the context at third level', () => {
    const context = {
      envelope1: {
        envelope2: {
          value: 'test',
        },
      },
    };

    const generator = new StringFromContextGenerator({
      path: 'envelope1.envelope2.value',
    });

    expect(generator.get(context)).toBe('test');
  });

  it('should access the context at third level with separator', () => {
    const context = {
      envelope1: {
        envelope2: {
          value: 'test',
        },
      },
    };

    const generator = new StringFromContextGenerator({
      path: 'envelope1/envelope2/value',
      sep: '/',
    });

    expect(generator.get(context)).toBe('test');
  });

  it('should throw an error on non-string non-empty value', () => {
    const context = { value: 1 };

    const generator = new StringFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).toThrow();
  });

  it('should not throw an error on empty string value', () => {
    const context = { value: '' };

    const generator = new StringFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should not throw an error on undefined value', () => {
    const context = { value: undefined };

    const generator = new StringFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should not throw an error on null value', () => {
    const context = { value: null };

    const generator = new StringFromContextGenerator({
      path: 'value',
    });

    expect(() => generator.get(context)).not.toThrow();
  });

  it('should use the pipes', () => {
    const context = {
      value: 'test',
    };

    const generator = new StringFromContextGenerator({
      path: 'value',
      pipes: [(value: string) => value.toUpperCase()],
    });

    expect(generator.get(context)).toBe('TEST');
  });

  it('should be available via string name', () => {
    const context = {
      value: 'test',
    };

    const generator = get(generatorName, {
      path: 'value',
    });

    expect(generator.get(context)).toBe('test');
  });
});
