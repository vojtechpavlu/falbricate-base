import { getValuePipe, lowercase } from '../../../../src/pipes/value';
import { trimString } from '../../../../src/pipes/value/stringCleaning';

const name = 'lowercase';

describe('lowercase Value Pipe', () => {
  it('should turn a string to lowercase chars', () => {
    const value = 'TEST';
    expect(lowercase(value)).toBe('test');
  });

  it('should return undefined and null on null-like value', () => {
    expect(trimString(undefined)).toBe(undefined);
    expect(trimString(null)).toBe(null);
  });

  it('should throw on number', () => {
    const value = 123;
    expect(() => lowercase(value)).toThrow();
  });

  it('should throw on boolean', () => {
    const value = true;
    expect(() => lowercase(value)).toThrow();
  });

  it('should throw on array', () => {
    const value: any[] = [];
    expect(() => lowercase(value)).toThrow();
  });

  it('should throw on object', () => {
    const value = {};
    expect(() => lowercase(value)).toThrow();
  });

  it('should find the pipe by its name', () => {
    expect(() => getValuePipe(name)).not.toThrow();
    const pipe = getValuePipe(name);
    expect(pipe.name).toBe('lowercase');
    expect(pipe('TEST')).toBe('test');
  });
});
