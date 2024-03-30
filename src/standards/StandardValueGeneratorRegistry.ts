import { StandardValueGenerator, StandardValueGeneratorName } from './StandardValueGenerator';
import { UUIDGenerator } from './index';

export type StandardValueGeneratorBuilder = () => StandardValueGenerator;

export interface StandardValueGeneratorRegistry {
  [name: StandardValueGeneratorName]: StandardValueGeneratorBuilder;
}

const REGISTRY: StandardValueGeneratorRegistry = {};

export const getStandard = (name: StandardValueGeneratorName): StandardValueGenerator => {
  const standard = REGISTRY[name];

  if (!standard) {
    throw new Error(`No Standard Value Generator with name '${name}' found`);
  }

  return standard();
};

export const hasStandard = (name: StandardValueGeneratorName): boolean => {
  return !!Object.keys(REGISTRY).find((key) => key === name);
};

export const registerStandard = (
  name: StandardValueGeneratorName,
  builder: StandardValueGeneratorBuilder
) => {
  if (hasStandard(name)) {
    throw new Error(`Name '${name}' is already registered`);
  }

  REGISTRY[name] = builder;
};

registerStandard('uuid', () => new UUIDGenerator());