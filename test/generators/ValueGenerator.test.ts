import {
  getValueGenerator,
  IntegerGenerator,
  IntegerGeneratorConfig,
  registerValueGenerator,
  ValueGeneratorBuilder
} from '../../src';


const builder: ValueGeneratorBuilder<any, any> =
  (config: IntegerGeneratorConfig) => new IntegerGenerator(config);

const config: IntegerGeneratorConfig = { max: 50 }

describe('Common ValueGenerators', () => {
  it('should not fail on registering a valid generator', () => {
    expect(() => registerValueGenerator('test', builder)).not.toThrow()
  })

  it('should register a valid generator', () => {
    expect(() => getValueGenerator('test', config)).not.toThrow()
  })
})