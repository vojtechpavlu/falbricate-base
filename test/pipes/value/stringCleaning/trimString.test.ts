import { trimString } from '../../../../src/pipes/value/stringCleaning';
import { getValuePipe } from '../../../../src/pipes/value';

const pipeName = 'trim';

describe('trimString Value Pipe', () => {
  it('should remove leading and trailing spaces', () => {
    const value = '  hello   world    ';
    expect(trimString(value)).toBe('hello   world');
  });

  it('should throw on other types', () => {
    expect(() => trimString(1)).toThrow();
    expect(() => trimString(true)).toThrow();
    expect(() => trimString([])).toThrow();
    expect(() => trimString({})).toThrow();
  });

  it('should throw on undefined and null', () => {
    expect(() => trimString(undefined)).toThrow();
    expect(() => trimString(null)).toThrow();
  });

  it('should be found on its name', () => {
    expect(() => getValuePipe(pipeName)).not.toThrow();

    const pipe = getValuePipe(pipeName);
    expect(pipe(' hello ')).toBe('hello');
  });
});
