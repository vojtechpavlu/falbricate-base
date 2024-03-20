import { accessProperty } from '../../../../src/utils/common/propertyAccessor';

describe('accessProperty function', () => {
  it('should access property at the first level', () => {
    const obj = {
      value: "test"
    }

    expect(accessProperty(obj, "value")).toBe("test")
  });

  it('should access property at the second level', () => {
    const obj = {
      envelope: {
        value: "test"
      }
    }

    expect(accessProperty(obj, "envelope.value")).toBe("test")
  });

  it('should access property at the third level', () => {
    const obj = {
      envelope1: {
        envelope2: {
          value: "test"
        }
      }
    }
    expect(accessProperty(obj, "envelope1.envelope2.value")).toBe("test")
  });

  it('should access property at the third level with different separator', () => {
    const obj = {
      envelope1: {
        envelope2: {
          value: "test"
        }
      }
    }

    const path = "envelope1/envelope2/value"
    const separator = "/"
    const value = accessProperty(obj, path, separator);

    expect(value).toBe("test")
  });

  it('should return undefined when found it', () => {
    const obj = {
      value: undefined
    }

    expect(accessProperty(obj, "value")).toBe(undefined)
  });

  it('should return null when found it', () => {
    const obj = {
      value: null
    }

    expect(accessProperty(obj, "value")).toBe(null)
  });

  it('should throw on empty object', () => {
    const obj = {}
    expect(() => accessProperty(obj, "test")).toThrow()
  });

  it('should throw on array', () => {
    const obj = ["a", "b"]
    expect(() => accessProperty(obj, "test")).toThrow()
  });

  it('should throw on undefined', () => {
    const obj = undefined

    // @ts-ignore
    expect(() => accessProperty(obj, "test")).toThrow()
  });

  it('should throw on null', () => {
    const obj = null

    // @ts-ignore
    expect(() => accessProperty(obj, "test")).toThrow()
  });
})
