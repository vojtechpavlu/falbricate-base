import { GeneratedValue, ValueGenerator, ValueGeneratorConfig } from '../generators/ValueGenerator';

export type StandardValueGenerator = ValueGenerator<GeneratedValue, ValueGeneratorConfig>

export type StandardValueGeneratorName = (
  string | (
    'uuid'
  )
);
