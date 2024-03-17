import { ConstantNumberGenerator } from '../../../src';

describe('StringGenerator class', () => {
  it('should return a specified string', () => {
    const generator = new ConstantNumberGenerator({
      num: 3
    })

    expect(generator.get()).toBe(3);
  });

  it('should raise an error on undefined value', () => {
    const conf = { num: undefined }

    //@ts-ignore
    expect(() => new ConstantNumberGenerator(conf)).toThrow();
  });

  it('should raise an error on null value', () => {
    const conf = { num: null }

    //@ts-ignore
    expect(() => new ConstantNumberGenerator(conf)).toThrow();
  });

  it('should raise an error on not-number value', () => {
    const conf = { num: "string" }

    //@ts-ignore
    expect(() => new ConstantNumberGenerator(conf)).toThrow();
  });
});
