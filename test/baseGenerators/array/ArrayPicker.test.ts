import { ArrayPicker } from '../../../src';

describe('ArrayPicker generator class', () => {
  it('should return an item from the given array', () => {
    const array = ['a', 'b', 'c'];
    const generator = new ArrayPicker({ array });
    expect(array.includes(generator.generate())).toBe(true);
  });

  it('should fail on empty array', () => {
    const array: any[] = [];
    expect(() => new ArrayPicker({ array })).toThrow();
  });

  it('should fail on non-array', () => {
    const array: string = '';
    // @ts-ignore
    expect(() => new ArrayPicker({ array })).toThrow();
  });

  it('should fail on null', () => {
    // @ts-ignore
    const array: any[] = null;
    // @ts-ignore
    expect(() => new ArrayPicker({ array })).toThrow();
  });

  it('should fail on undefined', () => {
    // @ts-ignore
    const array: any[] = undefined;
    // @ts-ignore
    expect(() => new ArrayPicker({ array })).toThrow();
  });
});
