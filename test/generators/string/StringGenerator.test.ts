import { StringGeneratorConfig, StringOfLengthGenerator } from '../../../src';

describe('StringGenerator class', () => {
  it('should return a string of a given length', () => {
    const conf: StringGeneratorConfig = {
      length: 5,
      charset: ['a', 'b'],
    };

    const generator = new StringOfLengthGenerator(conf);
    const value = generator.generate();

    expect(value.length).toBe(5);
  });

  it('should return a string of a charset', () => {
    const conf: StringGeneratorConfig = {
      length: 5,
      charset: ['a', 'b'],
    };

    const generator = new StringOfLengthGenerator(conf);
    const generatedString = generator.generate();

    generatedString.split('').forEach((char: any) => {
      expect(generatedString.includes(char)).toBe(true);
    });
  });
});
