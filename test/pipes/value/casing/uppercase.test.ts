import { getValuePipe, uppercase } from '../../../../src/pipes/value';
import { trimString } from '../../../../src/pipes/value/stringCleaning';

const name = 'uppercase';

describe('uppercase Value Pipe', () => {
  it('should turn a string to uppercase chars', () => {
    const value = 'test';
    expect(uppercase(value)).toBe('TEST');
  });

  it('should return undefined and null on null-like value', () => {
    expect(trimString(undefined)).toBe(undefined);
    expect(trimString(null)).toBe(null);
  });

  it('should throw on number', () => {
    const value = 123;
    expect(() => uppercase(value)).toThrow();
  });

  it('should throw on boolean', () => {
    const value = true;
    expect(() => uppercase(value)).toThrow();
  });

  it('should throw on array', () => {
    const value: any[] = [];
    expect(() => uppercase(value)).toThrow();
  });

  it('should throw on object', () => {
    const value = {};
    expect(() => uppercase(value)).toThrow();
  });

  it('should find the pipe by its name', () => {
    expect(() => getValuePipe(name)).not.toThrow();
    const pipe = getValuePipe(name);
    expect(pipe.name).toBe('uppercase');
    expect(pipe('test')).toBe('TEST');
  });
});
