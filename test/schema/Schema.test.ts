import { IntegerGenerator, Schema, SchemaInput } from '../../src';

describe('Schema constructor', () => {
  it('should create a schema from ValueGenerators', () => {
    const schemaInput: SchemaInput = {
      fields: {
        test: new IntegerGenerator({ min: 10, max: 20 }),
      },
    };

    const schema = new Schema(schemaInput);

    expect(Object.keys(schema.fields).length).toBe(1);
    expect(Object.keys(schema.fields)[0]).toBe('test');

    const gen = schema.fields['test'];

    // Check it successfully recognized the right value generator
    expect(gen!.constructor!.name).toBe(IntegerGenerator.name);
  });

  it('should create a schema from string-based declaration', () => {
    const schemaInput: SchemaInput = {
      fields: {
        test: {
          type: 'range-integer',
          config: { min: 10, max: 50 },
        },
      },
    };

    const schema = new Schema(schemaInput);

    expect(Object.keys(schema.fields).length).toBe(1);
    expect(Object.keys(schema.fields)[0]).toBe('test');

    const gen = schema.fields['test'];

    // Check it successfully recognized the right value generator
    expect(gen!.constructor!.name).toBe(IntegerGenerator.name);
  });

  it('should create a schema from mixed definition', () => {
    const schemaInput: SchemaInput = {
      fields: {
        test1: {
          type: 'range-integer',
          config: { min: 10, max: 50 },
        },
        test2: new IntegerGenerator({ min: 10, max: 20 }),
      },
    };

    const schema = new Schema(schemaInput);

    expect(Object.keys(schema.fields).length).toBe(2);
    expect(Object.keys(schema.fields)[0]).toBe('test1');
    expect(Object.keys(schema.fields)[1]).toBe('test2');

    const gen1 = schema.fields['test1'];
    const gen2 = schema.fields['test2'];

    // Check it successfully recognized the right value generator
    expect(gen1!.constructor!.name).toBe(IntegerGenerator.name);
    expect(gen2!.constructor!.name).toBe(IntegerGenerator.name);
  });
});
