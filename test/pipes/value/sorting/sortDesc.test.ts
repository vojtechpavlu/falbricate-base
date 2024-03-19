import { getValuePipe, sortDesc } from '../../../../src/pipes/value';

const name = 'sort-descending';

describe('sortDesc Value Pipe', () => {
  it('should sort an array of strings', () => {
    const arr = ['c', 'a', 'b'];
    expect(sortDesc(arr)).toEqual(['c', 'b', 'a']);
  });

  it('should sort an array of numbers', () => {
    const arr = [3, 1, 2];
    expect(sortDesc(arr)).toEqual([3, 2, 1]);
  });

  it('should sort a string', () => {
    const str = 'cab';
    expect(sortDesc(str)).toEqual('cba');
  });

  it('should be found by name', () => {
    expect(() => getValuePipe(name)).not.toThrow();

    const pipe = getValuePipe(name);
    const str = 'cab';
    expect(pipe(str)).toEqual('cba');
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
