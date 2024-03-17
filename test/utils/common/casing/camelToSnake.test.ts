import { camelToSnake } from '../../../../src';

describe('camelToCase function', () => {
  it('should return an expected result', () => {
    const camel = 'camelCase';
    const snake = camelToSnake(camel);

    expect(snake).toBe('camel_case');
  });
});
