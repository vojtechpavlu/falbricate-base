import {
  singleSpace,
  trimString,
} from '../../../../src/pipes/value/stringCleaning';
import { getValuePipe } from '../../../../src/pipes/value';

const pipeName = 'single-space';

describe('singleSpace Value Pipe', () => {
  it('should remove consecutive spaces', () => {
    const value = '  hello   world    ';
    expect(singleSpace(value)).toBe(' hello world ');
  });

  it('should throw on other types', () => {
    expect(() => singleSpace(1)).toThrow();
    expect(() => singleSpace(true)).toThrow();
    expect(() => singleSpace([])).toThrow();
    expect(() => singleSpace({})).toThrow();
  });

  it('should return undefined and null on null-like value', () => {
    expect(trimString(undefined)).toBe(undefined);
    expect(trimString(null)).toBe(null);
  });

  it('should be found on its name', () => {
    expect(() => getValuePipe(pipeName)).not.toThrow();

    const pipe = getValuePipe(pipeName);
    expect(pipe('  hello  world  ')).toBe(' hello world ');
  });
});
