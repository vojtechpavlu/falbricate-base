import { Fabricator, SchemaInput } from '../../../src';

const schemaInput: SchemaInput = {
  profiles: ['identifiers'],
  fields: {
    rowNumber: '!ref-profiles.identifiers.rowNumber',
    randH: '!ref-profiles.identifiers.randH',
    randT: '!ref-profiles.identifiers.randT',
    randM: '!ref-profiles.identifiers.randM',
    uuid: '!ref-profiles.identifiers.uuid',
    UUID: '!ref-profiles.identifiers.UUID'
  },
};

const fabricator = new Fabricator(schemaInput);

describe('rowNumber property', () => {
  it('should always increase the value with index', () => {
    const generated = fabricator.generateMany(5);

    generated.forEach((item: any, idx) => {
      expect(item.rowNumber).toBe(idx)
    });
  });
});

describe('randH property', () => {
  it('should always be within a range of [100, 999]', () => {
    const generated = fabricator.generateMany(50);
    generated.forEach((item: any) => {
      expect(item.randH).toBeGreaterThanOrEqual(100);
      expect(item.randH).toBeLessThanOrEqual(999);
    });
  });
});

describe('randT property', () => {
  it('should always be within a range of [1000, 9999]', () => {
    const generated = fabricator.generateMany(50);
    generated.forEach((item: any) => {
      expect(item.randT).toBeGreaterThanOrEqual(1000);
      expect(item.randT).toBeLessThanOrEqual(9999);
    });
  });
});

describe('randM property', () => {
  it('should always be within a range of millions', () => {
    const generated = fabricator.generateMany(50);
    generated.forEach((item: any) => {
      expect(item.randM).toBeGreaterThanOrEqual(1_000_000);
      expect(item.randM).toBeLessThanOrEqual(9_999_999);
    });
  });
});
