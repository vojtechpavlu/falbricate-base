import { getValuePipe, uppercase } from '../../../../src/pipes/value';

const name = 'uppercase';

describe('uppercase Value Pipe', () => {
  it('should turn a string to uppercase chars', () => {
    const value = "test";
    expect(uppercase(value)).toBe("TEST")
  });

  it('should throw on undefined', () => {
    const value = undefined;
    expect(() => uppercase(value)).toThrow()
  });

  it('should throw on null', () => {
    const value = null;
    expect(() => uppercase(value)).toThrow()
  });

  it('should throw on number', () => {
    const value = 123;
    expect(() => uppercase(value)).toThrow()
  });

  it('should throw on boolean', () => {
    const value = true;
    expect(() => uppercase(value)).toThrow()
  });

  it('should throw on array', () => {
    const value: any[] = [];
    expect(() => uppercase(value)).toThrow()
  });

  it('should throw on object', () => {
    const value = {};
    expect(() => uppercase(value)).toThrow()
  });

  it('should find the pipe by its name', () => {
    expect(() => getValuePipe(name)).not.toThrow()
    const pipe = getValuePipe(name);
    expect(pipe.name).toBe('uppercase');
    expect(pipe("test")).toBe("TEST")
  });
})
