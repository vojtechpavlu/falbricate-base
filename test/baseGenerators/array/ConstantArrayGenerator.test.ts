import { ConstantArrayGenerator } from '../../../src';

describe('ConstantArrayGenerator class', () => {
  it('should return array of the same size', () => {
    const array = ['a', 'b', 'c'];
    const generator = new ConstantArrayGenerator({ array });

    expect(generator.generate().length).toBe(array.length);
  });

  it('should return exactly same array as given', () => {
    const array = ['a', 'b', 'c'];
    const generator = new ConstantArrayGenerator({ array });

    const generated = generator.generate();

    generated.forEach((item: any, idx: number) => {
      expect(item).toBe(array[idx]);
    });
  });

  it('should throw on null', () => {
    const array = null;
    // @ts-ignore
    expect(() => new ConstantArrayGenerator({ array })).toThrow();
  });

  it('should throw on undefined', () => {
    const array = undefined;
    // @ts-ignore
    expect(() => new ConstantArrayGenerator({ array })).toThrow();
  });

  it('should throw on non-array argument', () => {
    const array = 'not array';
    // @ts-ignore
    expect(() => new ConstantArrayGenerator({ array })).toThrow();
  });
});
