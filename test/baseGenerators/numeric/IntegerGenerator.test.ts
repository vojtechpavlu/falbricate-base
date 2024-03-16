import { IntegerGenerator, IntegerGeneratorConfig } from '../../../src';

describe("IntegerGenerator class", () => {
  it("should return a integer number in a given range", () => {
    const conf: IntegerGeneratorConfig = {
      min: 0,
      max: 3
    }

    const generator = new IntegerGenerator(conf);

    expect(generator.get()).toBeGreaterThanOrEqual(0);
    expect(generator.get()).toBeLessThanOrEqual(3)
  })

  it("should trigger the pipe", () => {
    const conf: IntegerGeneratorConfig = {
      min: 0,
      max: 3,
      pipes: [() => "test"]
    }

    const generator = new IntegerGenerator(conf);
    expect(generator.get()).toBe("test")
  })
})