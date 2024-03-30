import { getStandard } from '../../src';

const generatorName = 'uuid';
const generatorNameUpper = 'UUID';

describe('UUIDGenerator', () => {
  it('should be able to be found using name (lower)', () => {
    expect(() => getStandard(generatorName)).not.toThrow();
  });

  it('should be able to be found using name (upper)', () => {
    expect(() => getStandard(generatorNameUpper)).not.toThrow();
  });

  it('should return a string (lower)', () => {
    const generator = getStandard(generatorName);

    expect(typeof generator.generate()).toBe('string');
  });

  it('should return a string (upper)', () => {
    const generator = getStandard(generatorNameUpper);

    expect(typeof generator.generate()).toBe('string');
  });

  it('should return a string matching the regular expression (lower)', () => {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    const generator = getStandard(generatorName);

    expect(regex.test(generator.generate() as string)).toBe(true);
  });

  it('should return a string matching the regular expression (upper)', () => {
    const regex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/;
    const generator = getStandard(generatorNameUpper);

    expect(regex.test(generator.generate() as string)).toBe(true);
  });
});
