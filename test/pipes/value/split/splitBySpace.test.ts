import { splitBySpace } from '../../../../src/pipes/value/split';
import { getValuePipe } from '../../../../src/pipes/value';
import { trimString } from '../../../../src/pipes/value/stringCleaning';

const pipeName = 'space-split';

describe('splitBySpace Value Pipe', () => {
  it('should create an array of length', () => {
    const value = 'hello world';
    expect(splitBySpace(value).length).toBe(2);
  });

  it('should split a given string by space into an array', () => {
    const value = 'hello world';
    expect(splitBySpace(value)[0]).toBe('hello');
    expect(splitBySpace(value)[1]).toBe('world');
  });

  it('should throw on not string', () => {
    expect(() => splitBySpace(1)).toThrow();
    expect(() => splitBySpace(true)).toThrow();
    expect(() => splitBySpace({})).toThrow();
    expect(() => splitBySpace([])).toThrow();
  });

  it('should return undefined and null on null-like value', () => {
    expect(trimString(undefined)).toBe(undefined);
    expect(trimString(null)).toBe(null);
  });

  it('should be possible to find by name', () => {
    expect(() => getValuePipe(pipeName)).not.toThrow();

    const pipe = getValuePipe(pipeName);
    expect(pipe('hello world').length).toBe(2);
  });
});
