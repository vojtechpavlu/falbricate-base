import { addGeneratedTimestampNumber } from '../../../../src';

describe('addGeneratedTimestampNumber function', () => {
  it('should create `generatedAt` field in the given object', () => {
    const falsum = { test: "test-value" }
    const modified = addGeneratedTimestampNumber(falsum);

    expect(Object.keys(modified).includes("generatedAt")).toBe(true);
  });

  it('should add a timestamp of Date type', () => {
    const falsum = { test: "test-value" }
    const modified = addGeneratedTimestampNumber(falsum);

    expect(typeof modified['generatedAt'] === 'number').toBe(true);
  });
})
