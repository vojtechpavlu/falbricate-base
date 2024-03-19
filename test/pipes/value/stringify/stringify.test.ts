import { stringify } from '../../../../src';
import { getValuePipe } from '../../../../src/pipes/value';

const name = "stringify"

describe('stringify Value Pipe', () => {
  it('should turn an empty object into a string', () => {
    const value = {}
    expect(stringify(value)).toBe("{}")
  });

  it('should turn an non-empty object into a string', () => {
    const value = {a: 7}
    expect(stringify(value)).toBe('{"a":7}')
  });

  it('should turn an empty array into a string', () => {
    const value: any[] = []
    expect(stringify(value)).toBe("[]")
  });

  it('should turn a non-empty array into a string', () => {
    const value = ["a", "b"]
    expect(stringify(value)).toBe('["a","b"]')
  });

  it('should let undefined as is; not as string', () => {
    const value: any = undefined
    expect(stringify(value)).toBe(undefined)
  });

  it('should turn null into a string', () => {
    const value: any = null
    expect(stringify(value)).toBe('null')
  });

  it('should turn string into a string', () => {
    const value: any = "abc"
    expect(stringify(value)).toBe('"abc"')
  });

  it('should turn number into a string', () => {
    const value: any = 77
    expect(stringify(value)).toBe("77")
  });

  it('should turn boolean into a string', () => {
    const value: any = true
    expect(stringify(value)).toBe("true")
  });

  it('should find the Value Pipe by its name', () => {
    expect(() => getValuePipe(name)).not.toThrow();

    const pipe = getValuePipe(name);
    expect(pipe([])).toBe("[]");
  });
});
