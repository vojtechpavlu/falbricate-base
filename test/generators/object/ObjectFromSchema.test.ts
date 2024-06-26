import {
  DeclarativeFieldDefinition,
  Fabricator,
  getValueGenerator,
  ObjectFalsum,
  SchemaInput,
} from '../../../src';

const generatorName = 'object-from-schema';

const nested: SchemaInput = {
  fields: {
    test: { type: 'range-integer', config: { max: 20 } },
    parent: { type: 'context-input', config: { path: 'parent.test' } },
  },
};

const schema: SchemaInput = {
  fields: {
    test: { type: 'range-integer', config: { max: 20 } },
    nested: { type: 'object-from-schema', config: { schema: nested } },
  },
};

describe('ObjectFromSchema generator', () => {
  it('should be found by name', () => {
    const config = (schema.fields.nested as DeclarativeFieldDefinition).config;

    expect(() => getValueGenerator(generatorName, config)).not.toThrow();

    const generator = getValueGenerator(generatorName, config);

    expect(generator).not.toBeUndefined();
  });

  it('should generate an object with expected shape', () => {
    const fabricator = new Fabricator(schema);
    const generated = fabricator.generate() as ObjectFalsum;

    expect(Object.keys(generated).includes('nested')).toBe(true);
  });

  it('should generate a nested object with expected shape', () => {
    const fabricator = new Fabricator(schema);
    const generated = fabricator.generate() as ObjectFalsum;

    expect(Object.keys(generated.nested).includes('test')).toBe(true);
    expect(typeof generated.nested.test).toBe('number');
  });

  it('should access the parent via the context', () => {
    const fabricator = new Fabricator(schema);
    const generated = fabricator.generate() as ObjectFalsum;

    expect(generated.nested.parent).toBe(generated.test);
  });
});
