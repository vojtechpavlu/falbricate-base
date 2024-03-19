import { getValuePipe, sortAsc } from '../../../../src/pipes/value';

const name = 'sort-ascending';

describe('sortAsc Value Pipe', () => {
  it('should sort an array of strings', () => {
    const arr = ['c', 'a', 'b'];
    expect(sortAsc(arr)).toEqual(['a', 'b', 'c']);
  });

  it('should sort an array of numbers', () => {
    const arr = [3, 1, 2];
    expect(sortAsc(arr)).toEqual([1, 2, 3]);
  });

  it('should sort a string', () => {
    const str = 'cab';
    expect(sortAsc(str)).toEqual('abc');
  });

  it('should be found by name', () => {
    expect(() => getValuePipe(name)).not.toThrow();

    const pipe = getValuePipe(name);
    const str = 'cab';
    expect(pipe(str)).toEqual('abc');
  });

  it('should throw on undefined', () => {
    const value = undefined;

    // @ts-ignore
    expect(() => getValuePipe(value)).toThrow();
  });

  it('should throw on null', () => {
    const value = null;

    // @ts-ignore
    expect(() => getValuePipe(value)).toThrow();
  });

  it('should throw on object', () => {
    const value = {};

    // @ts-ignore
    expect(() => getValuePipe(value)).toThrow();
  });

  it('should throw on boolean', () => {
    const value = true;

    // @ts-ignore
    expect(() => getValuePipe(value)).toThrow();
  });

  it('should throw on number', () => {
    const value = 7;

    // @ts-ignore
    expect(() => getValuePipe(value)).toThrow();
  });
});
