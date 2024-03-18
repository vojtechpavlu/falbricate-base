import { Falsum, fieldsToCamel } from '../../../../src';
import { fieldsToSnake } from '../../../../src';

const falsum: Falsum = {
  prop_name: 'value',
  another_prop_name: 3,
};

describe('fieldsToCamel falsum pipe', () => {
  it('should not change the number of fields', () => {
    const snake = fieldsToCamel(falsum);

    expect(Object.keys(snake).length).toBe(Object.keys(falsum).length);
  });

  it('should not change the types of the values', () => {
    const snake = fieldsToCamel(falsum);
    const originalObjectKeys = Object.keys(falsum);
    const snakeObjectKeys = Object.keys(snake);

    originalObjectKeys.forEach((key: string, index: number) => {
      expect(typeof snake[snakeObjectKeys[index]!]).toBe(typeof falsum[key]);
    });
  });

  it('should camel-case all the fields in a given falsum', () => {
    const snake = fieldsToCamel(falsum);

    expect(Object.keys(snake)[0]).toBe('propName');
    expect(Object.keys(snake)[1]).toBe('anotherPropName');
  });

  it(`should change nested objects' property names`, () => {
    const falsum: Falsum = {
      prop_name: {
        nested_prop: 'value',
      },
    };

    const snake = fieldsToCamel(falsum);
    const nestedPropNames = Object.keys(snake['propName']);

    expect(nestedPropNames[0]).toBe('nestedProp');
  });

  it(`should change nested array's objects' property names`, () => {
    const falsum: Falsum = {
      prop_name: [{ nested_prop: 'value' }],
    };

    const snake = fieldsToCamel(falsum);
    const nestedPropNames = Object.keys(snake['propName'][0]);

    expect(nestedPropNames[0]).toBe('nestedProp');
  });

  it(`should return undefined on undefined given`, () => {
    // @ts-ignore
    const snake = fieldsToCamel(undefined);
    expect(snake).toBeUndefined();
  });

  it(`should return null on null given`, () => {
    // @ts-ignore
    const snake = fieldsToCamel(null);
    expect(snake).toBeNull();
  });
});
