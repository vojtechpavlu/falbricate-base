import {
  Fabricator,
  FloatGenerator,
  IntegerGenerator,
  ObjectFalsum,
  SchemaInput
} from '../../src';

const schemaInput: SchemaInput = {
  fields: {
    test1: {
      type: 'range-integer',
      config: { min: 10, max: 50 }
    },
    test2: {
      type: 'range-float',
      config: { min: 10, max: 50 }
    }
  }
};

describe('Fabricator constructor', () => {
  it('should create a schema from given input', () => {
    const fabricator: Fabricator = new Fabricator(schemaInput);
    const schema = fabricator.schema;

    expect(Object.keys(schema.fields).length).toBe(2);
    expect(Object.keys(schema.fields)[0]).toBe('test1');
    expect(Object.keys(schema.fields)[1]).toBe('test2');

    const generator1 = schema.fields['test1'];
    const generator2 = schema.fields['test2'];

    expect(generator1!.constructor.name).toBe(IntegerGenerator.name);
    expect(generator2!.constructor.name).toBe(FloatGenerator.name);
  });
});

describe('Fabricator generate function', () => {
  it('should generate an object of expected shape', () => {
    const fabricator = new Fabricator(schemaInput);
    const falsum = fabricator.generate() as ObjectFalsum;

    // Check the general shape
    expect(typeof falsum).toBe('object');
    expect(Object.keys(falsum).length).toBe(2);

    // Check the property names
    expect(Object.keys(falsum)[0]).toBe('test1');
    expect(Object.keys(falsum)[1]).toBe('test2');

    // Check types of the properties
    expect(typeof falsum['test1']).toBe('number');
    expect(typeof falsum['test2']).toBe('number');
  });

  it('should pass the context', () => {
    const schema: SchemaInput = {
      fields: {
        test: {
          type: 'string-in-context',
          config: { path: 'data.key' }
        }
      }
    };

    const fabricator = new Fabricator(schema);
    const falsum = fabricator.generate({
      data: { key: 'value' }
    }) as ObjectFalsum;

    expect(falsum.test).toBe('value');
  });

  it('should pass the falsum being generated', () => {
    const fabricator = new Fabricator(schemaInput);
    const falsa = fabricator.generateMany(5);

    expect(Array.isArray(falsa)).toBe(true);
  });
});

describe('Fabricator generateMany function', () => {
  it('should generate an array of objects', () => {
    const fabricator = new Fabricator(schemaInput);
    const falsa = fabricator.generateMany(5);

    expect(Array.isArray(falsa)).toBe(true);
  });

  it('should generate specified number of objects', () => {
    const fabricator = new Fabricator(schemaInput);
    const generated = fabricator.generateMany(5);

    expect(generated.length).toBe(5);
  });

  it('should generate objects of a shape', () => {
    const fabricator = new Fabricator(schemaInput);
    const falsa = fabricator.generateMany(5) as ObjectFalsum[];

    falsa.forEach((falsum) => {
      // Check the general shape
      expect(typeof falsum).toBe('object');
      expect(Object.keys(falsum).length).toBe(2);

      // Check the property names
      expect(Object.keys(falsum)[0]).toBe('test1');
      expect(Object.keys(falsum)[1]).toBe('test2');

      // Check types of the properties
      expect(typeof falsum['test1']).toBe('number');
      expect(typeof falsum['test2']).toBe('number');
    });
  });

  it('should pass the context', () => {
    const schema: SchemaInput = {
      fields: {
        test: {
          type: 'string-in-context',
          config: { path: 'data.key' }
        }
      }
    };

    const fabricator = new Fabricator(schema);
    const falsa = fabricator.generateMany(5,  { key: 'value' }) as ObjectFalsum[];

    falsa.forEach((falsum) => {
      expect(falsum.test).toBe("value");
    })
  });

  it('should pass the index', () => {
    const schema: SchemaInput = {
      fields: {
        test: {
          type: 'number-in-context',
          config: {
            path: 'index'
          }
        }
      }
    };

    const fabricator = new Fabricator(schema);
    const falsa = fabricator.generateMany(5) as ObjectFalsum[];

    falsa.forEach((falsum, idx) => {
      expect(falsum.test).toBe(idx);
    });
  });

  it('should pass the previous', () => {
    const schema: SchemaInput = {
      fields: {
        test: {
          type: 'object-in-context',
          config: {
            path: 'previous'
          }
        }
      }
    };

    const fabricator = new Fabricator(schema);
    const falsa = fabricator.generateMany(2) as ObjectFalsum[];

    falsa.forEach((falsum, idx) => {
      if (idx === 1) {
        expect(falsum.test).not.toBeUndefined();
      }
    });
  });
});
