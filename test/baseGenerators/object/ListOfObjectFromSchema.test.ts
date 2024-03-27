import { getValueGenerator, ListOfObjectsFromSchemaConfig } from '../../../src';

const generatorName = 'list-of-schema'

const config: ListOfObjectsFromSchemaConfig = {
  n: 3,
  schema: {
    fields: {
      testField1: {
        type: "constant-value",
        config: {
          value: "testValue"
        }
      },
      testField2: {
        type: "constant-value",
        config: {
          value: "testValue"
        }
      }
    }
  }
}

describe('ListOfObjectFromSchema generator', () => {
  it('should be accessible by name', () => {
    expect(() => getValueGenerator(generatorName, config)).not.toThrow()
  })

  it('should return a specified number of items', () => {
    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as any[]
    expect(value.length).toBe(config.n);
  });

  it('should generate object of expected schema', () => {
    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as any[]

    value.forEach((value) => {
      expect(Object.keys(value).length).toBe(2)
      expect(Object.keys(value)[0]).toBe('testField1')
      expect(Object.keys(value)[1]).toBe('testField2')
    })
  });

  it('should generate object with expected values', () => {
    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as any[]

    value.forEach((value) => {
      expect(value.testField1).toBe('testValue')
      expect(value.testField1).toBe('testValue')
    })
  });
});
