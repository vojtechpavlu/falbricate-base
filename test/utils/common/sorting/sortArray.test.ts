import { sortArray } from '../../../../src/utils/common/sorting';

describe('sortArray function', () => {
  it('should return the same number of items', () => {
    const arr = [2, 1, 3];
    expect(sortArray(arr).length).toBe(3);
  });

  it('should not throw an error on empty list', () => {
    const arr: any[] = [];
    expect(() => sortArray(arr)).not.toThrow();
  });

  it('should throw an error array of objects', () => {
    const arr: any[] = [{ a: 1 }, { b: 2 }];
    expect(() => sortArray(arr)).toThrow();
  });

  it('should throw an error array of arrays', () => {
    const arr: any[] = [[0], [1]];
    expect(() => sortArray(arr)).toThrow();
  });

  it('should pass with array of mixed types', () => {
    const arr: any[] = ['a', 2];
    expect(() => sortArray(arr)).not.toThrow();
  });

  it('should sort an array of strings in desc order', () => {
    const arr = ['b', 'a', 'c'];
    expect(sortArray(arr, 'desc')[0]).toBe('c');
    expect(sortArray(arr, 'desc')[1]).toBe('b');
    expect(sortArray(arr, 'desc')[2]).toBe('a');
  });

  it('should sort an array of strings in asc order', () => {
    const arr = ['b', 'a', 'c'];
    expect(sortArray(arr, 'asc')[0]).toBe('a');
    expect(sortArray(arr, 'asc')[1]).toBe('b');
    expect(sortArray(arr, 'asc')[2]).toBe('c');
  });

  it('should sort an array of numbers in desc order', () => {
    const arr = [2, 1, 3];
    expect(sortArray(arr, 'desc')[0]).toBe(3);
    expect(sortArray(arr, 'desc')[1]).toBe(2);
    expect(sortArray(arr, 'desc')[2]).toBe(1);
  });

  it('should sort an array of numbers in asc order', () => {
    const arr = [2, 1, 3];
    expect(sortArray(arr, 'asc')[0]).toBe(1);
    expect(sortArray(arr, 'asc')[1]).toBe(2);
    expect(sortArray(arr, 'asc')[2]).toBe(3);
  });
});
