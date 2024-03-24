import { ConstantStringGenerator } from '../../../src';

describe('StringGenerator class', () => {
  it('should return a specified string', () => {
    const generator = new ConstantStringGenerator({
      text: 'TEST',
    });

    expect(generator.generate()).toBe('TEST');
  });

  it('should raise an error on empty string', () => {
    const conf = { text: '' };
    expect(() => new ConstantStringGenerator(conf)).toThrow();
  });

  it('should raise an error on undefined value', () => {
    const conf = { text: undefined };

    //@ts-ignore
    expect(() => new ConstantStringGenerator(conf)).toThrow();
  });

  it('should raise an error on null value', () => {
    const conf = { text: null };

    //@ts-ignore
    expect(() => new ConstantStringGenerator(conf)).toThrow();
  });

  it('should raise an error on non-string value', () => {
    const conf = { text: 1 };

    //@ts-ignore
    expect(() => new ConstantStringGenerator(conf)).toThrow();
  });
});
