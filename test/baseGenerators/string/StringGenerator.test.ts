import { StringGeneratorConfig, StringOfLengthGenerator } from '../../../src';

describe('StringGenerator class', () => {
  it('should return a string of a given length', () => {
    const conf: StringGeneratorConfig = {
      length: 5,
      charset: ['a', 'b'],
    };

    const generator = new StringOfLengthGenerator(conf);
    const value = generator.get();

    expect(value.length).toBe(5);
  });

  it('should return a string of a charset', () => {
    const conf: StringGeneratorConfig = {
      length: 5,
      charset: ['a', 'b'],
    };

    const generator = new StringOfLengthGenerator(conf);
    const generatedString = generator.get();

    generatedString.split('').forEach((char: any) => {
      expect(generatedString.includes(char)).toBe(true);
    });
  });

  it('should use pipes', () => {
    const conf: StringGeneratorConfig = {
      length: 1,
      charset: ['a', 'b'],
      pipes: [() => 73],
    };

    const generator = new StringOfLengthGenerator(conf);

    expect(generator.get()).toBe(73);
  });
});
