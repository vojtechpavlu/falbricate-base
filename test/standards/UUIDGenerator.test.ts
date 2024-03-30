import { getStandard } from '../../src';

const generatorName = 'uuid';

describe('UUIDGenerator', () => {
  it('should be able to be found using name', () => {
    expect(() => getStandard(generatorName)).not.toThrow();
  });

  it('should return a string', () => {
    const generator = getStandard(generatorName);

    expect(typeof generator.generate()).toBe('string');
  });

  it('should return a string matching the regular expression', () => {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    const generator = getStandard(generatorName);

    expect(regex.test(generator.generate() as string)).toBe(true);
  });
});
