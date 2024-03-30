import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../generators';

export type StandardValueGenerator = ValueGenerator<
  GeneratedValue,
  ValueGeneratorConfig
>;

export type StandardValueGeneratorName = string | 'uuid';
