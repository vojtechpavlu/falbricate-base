import { addGeneratedTimestampDate, ObjectFalsum } from '../../../../src';

describe('addGeneratedTimestampDate function', () => {
  it('should create `generatedAt` field in the given object', () => {
    const falsum = { test: "test-value" }
    const modified = addGeneratedTimestampDate(falsum);

    expect(Object.keys(modified).includes("generatedAt")).toBe(true);
  });

  it('should add a timestamp of Date type', () => {
    const falsum = { test: "test-value" }
    const modified = addGeneratedTimestampDate(falsum) as ObjectFalsum;

    expect(modified['generatedAt']).toBeInstanceOf(Date);
  });
})