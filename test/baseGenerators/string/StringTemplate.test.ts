import { getValueGenerator, StringTemplateGeneratorConfig } from '../../../src';

const generatorName = 'string-template'

describe('StringTemplateGenerator', () => {
  it('should be available by name', () => {
    const config: StringTemplateGeneratorConfig = {
      template: '{test}'
    }

    expect(() => getValueGenerator(generatorName, config)).not.toThrow()
  })

  it('should throw on missing template', () => {
    const config = {}

    expect(() => getValueGenerator(generatorName, config)).toThrow()
  })

  it('should be generate a number within range [0, 9] on %d', () => {

    /** To minimize the risk of false negative test */

    const partialTemplate: string = '%d'
    let wholeTemplate = ''

    for (let i = 0; i < 100; i++) {
      wholeTemplate += partialTemplate
    }

    const config: StringTemplateGeneratorConfig = {
      template: wholeTemplate
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    expect(value.includes('0')).toBe(true);
  })

  it('should be generate a number within range [1, 9] on %D', () => {

    /** To minimize the risk of false negative test */

    const partialTemplate: string = '%D'
    let wholeTemplate = ''

    for (let i = 0; i < 100; i++) {
      wholeTemplate += partialTemplate
    }

    const config: StringTemplateGeneratorConfig = {
      template: wholeTemplate
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    expect(value.includes('0')).toBe(false);
  })

  it('should be generate a number on %d', () => {

    /** To minimize the risk of false negative test */

    const partialTemplate: string = '%d'
    let wholeTemplate = ''

    for (let i = 0; i < 100; i++) {
      wholeTemplate += partialTemplate
    }

    const config: StringTemplateGeneratorConfig = {
      template: wholeTemplate
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    expect(/^\d+$/.test(value)).toBe(true)
  })

  it('should be generate a number on %D', () => {

    /** To minimize the risk of false negative test */

    const partialTemplate: string = '%D'
    let wholeTemplate = ''

    for (let i = 0; i < 100; i++) {
      wholeTemplate += partialTemplate
    }

    const config: StringTemplateGeneratorConfig = {
      template: wholeTemplate
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    expect(/^\d+$/.test(value)).toBe(true)
  })

  it('should be generate a lowercase character on %c', () => {

    /** To minimize the risk of false negative test */

    const partialTemplate: string = '%c'
    let wholeTemplate = ''

    for (let i = 0; i < 100; i++) {
      wholeTemplate += partialTemplate
    }

    const config: StringTemplateGeneratorConfig = {
      template: wholeTemplate
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    expect(/^[a-z]+$/.test(value)).toBe(true)
  })

  it('should be generate an uppercase character on %C', () => {

    /** To minimize the risk of false negative test */

    const partialTemplate: string = '%C'
    let wholeTemplate = ''

    for (let i = 0; i < 100; i++) {
      wholeTemplate += partialTemplate
    }

    const config: StringTemplateGeneratorConfig = {
      template: wholeTemplate
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    expect(/^[A-Z]+$/.test(value)).toBe(true)
  })

  it('should replace variables with repetition', () => {
    const config: StringTemplateGeneratorConfig = {
      template: '{foo}-{bar}-{foo}',
      variables: {
        foo: {
          type: 'constant-value',
          config: {
            value: 'foo'
          }
        },
        bar: {
          type: 'constant-value',
          config: {
            value: 'bar'
          }
        },
      }
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    expect(value).toBe('foo-bar-foo')
  })

  it('should use custom charsets', () => {
    const config: StringTemplateGeneratorConfig = {
      template: '%custom1#%custom2',
      customCharsets: {
        '%custom1': ['1', '2', '3', '4'],
        '%custom2': ['a', 'b', 'c', 'd'],
      }
    }

    const generator = getValueGenerator(generatorName, config);
    const value = generator.generate() as string;

    const [numeric, letter] = value.split('#');

    expect(/^\d$/.test(numeric as string)).toBe(true)
    expect(/^[a-z]$/.test(letter as string)).toBe(true)
  })
})