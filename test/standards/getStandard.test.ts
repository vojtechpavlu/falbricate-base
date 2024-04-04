import { Fabricator, ObjectFalsum, SchemaInput } from '../../src';

describe('getStandard function', () => {
  it('should return a working context accessor', () => {
    const schema: SchemaInput = {
      fields: {
        value: '!ref-test.value'
      }
    };

    const fabricator = new Fabricator(schema);

    const context = {
      test: {
        value: 'test-string'
      }
    };

    const generated = fabricator.generate(context) as ObjectFalsum;

    expect(generated.value).toBe(context.test.value);
  });
});
