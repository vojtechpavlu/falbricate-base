import { objectToList } from '../../../../src';

const o = {
  a: 1,
  b: 2,
};

describe('objectToList function', () => {
  it('should turn the object into expected array of length', () => {
    const manipulated = objectToList(o);

    expect(manipulated.length).toBe(2);
  });

  it('should turn the object into array with objects', () => {
    const manipulated = objectToList(o);

    manipulated.forEach((item) => {
      expect(typeof item === 'object').toBe(true);
      expect(Array.isArray(item)).toBe(false);
    });
  });

  it('should turn the object into array of objects with shape', () => {
    const manipulated = objectToList(o, 'myKey', 'myValue');

    manipulated.forEach((item) => {
      expect(item['myKey']).not.toBeUndefined();
      expect(item['myValue']).not.toBeUndefined();
    });
  });

  it('should throw on non-object types', () => {
    // @ts-ignore
    expect(() => objectToList(1)).toThrow();
    // @ts-ignore
    expect(() => objectToList(true)).toThrow();
    // @ts-ignore
    expect(() => objectToList('not object')).toThrow();
    // @ts-ignore
    expect(() => objectToList([])).toThrow();
  });

  it('should throw on undefined and null', () => {
    // @ts-ignore
    expect(() => objectToList(undefined)).toThrow();
    // @ts-ignore
    expect(() => objectToList(null)).toThrow();
  });
});
