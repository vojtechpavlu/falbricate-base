import { snakeToCamel } from '../../../../src';

describe('snakeToCamel function', () => {
  it('should return an expected result', () => {
    const snake = 'snake_case';
    const camel = snakeToCamel(snake);

    expect(camel).toBe('snakeCase');
  });
});
