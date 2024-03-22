import { ContextAccessor, get } from '../../../src';

describe('ContextAccessor value generator', () => {
  it('should be accessible via name', () => {
    expect(() =>
      get('context-input', {
        path: 'not.relevant',
      }),
    ).not.toThrow();

    const generator = get('context-input', {
      path: 'not.relevant',
    });

    expect(generator).not.toBeUndefined();
  });

  it('should access a string-based value on path', () => {
    const generator = new ContextAccessor({
      path: 'data.value.myValue',
    });

    const context = {
      data: {
        value: {
          myValue: 'testString',
        },
      },
    };

    expect(generator.get(context)).toBe('testString');
  });

  it('should access an object-based value on path', () => {
    const generator = new ContextAccessor({
      path: 'data.value',
    });

    const context = {
      data: {
        value: {
          myValue: 'testString',
        },
      },
    };

    expect(typeof generator.get(context)).toBe('object');
    expect(generator.get(context).myValue).toBe('testString');
  });

  it('should access an array-based value on path', () => {
    const generator = new ContextAccessor({
      path: 'data.value',
    });

    const context = {
      data: {
        value: ['testString1', 'testString2'],
      },
    };

    expect(Array.isArray(generator.get(context))).toBe(true);
    expect(generator.get(context)[0]).toBe('testString1');
    expect(generator.get(context)[1]).toBe('testString2');
  });

  it('should access a number-based value on path', () => {
    const generator = new ContextAccessor({
      path: 'data.value',
    });

    const context = {
      data: {
        value: 11,
      },
    };

    expect(generator.get(context)).toBe(11);
  });

  it('should access a boolean-based value on path', () => {
    const generator = new ContextAccessor({
      path: 'data.value',
    });

    const context = {
      data: {
        value: true,
      },
    };

    expect(generator.get(context)).toBe(true);
  });
});
