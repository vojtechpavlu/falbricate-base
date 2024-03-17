import { Falsum } from '../../../../src';
import { fieldsToSnake } from '../../../../src';

const falsum: Falsum = {
  propName1: 'value',
  propName2: 3,
};

describe('fieldsToSnake falsum pipe', () => {
  it('should not change the number of fields', () => {
    const snake = fieldsToSnake(falsum);

    expect(Object.keys(snake).length).toBe(Object.keys(falsum).length);
  });

  it('should not change the types of the values', () => {
    const snake = fieldsToSnake(falsum);
    const originalObjectKeys = Object.keys(falsum);
    const snakeObjectKeys = Object.keys(snake);

    originalObjectKeys.forEach((key: string, index: number) => {
      expect(typeof snake[snakeObjectKeys[index]!]).toBe(typeof falsum[key]);
    });
  });

  it('should snake-case all the fields in a given falsum', () => {
    const falsum: Falsum = {
      propName: 'value',
      anotherPropName: 'anotherValue',
    };

    const snake = fieldsToSnake(falsum);

    expect(Object.keys(snake)[0]).toBe('prop_name');
    expect(Object.keys(snake)[1]).toBe('another_prop_name');
  });

  it(`should change nested objects' property names`, () => {
    const falsum: Falsum = {
      propName: {
        nestedProp: 'value',
      },
    };

    const snake = fieldsToSnake(falsum);
    const nestedPropNames = Object.keys(snake['prop_name']);

    expect(nestedPropNames[0]).toBe('nested_prop');
  });

  it(`should change nested array's objects' property names`, () => {
    const falsum: Falsum = {
      propName: [{ nestedProp: 'value' }],
    };

    const snake = fieldsToSnake(falsum);
    const nestedPropNames = Object.keys(snake['prop_name'][0]);

    expect(nestedPropNames[0]).toBe('nested_prop');
  });
});
