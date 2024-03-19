import { sortString } from '../../../../src/utils/common/sorting';

describe('sortString function', () => {
  it('should return the same number of items', () => {
    const str = 'bca';
    expect(sortString(str).length).toBe(3);
  });

  it('should not throw an error on empty string', () => {
    const str = '';
    expect(() => sortString(str)).not.toThrow();
  });

  it('should sort characters of strings in desc order', () => {
    const str = 'bca';
    expect(sortString(str, 'desc')[0]).toBe('c');
    expect(sortString(str, 'desc')[1]).toBe('b');
    expect(sortString(str, 'desc')[2]).toBe('a');
  });

  it('should sort characters of strings in asc order', () => {
    const str = 'bca';
    expect(sortString(str, 'asc')[0]).toBe('a');
    expect(sortString(str, 'asc')[1]).toBe('b');
    expect(sortString(str, 'asc')[2]).toBe('c');
  });
});
