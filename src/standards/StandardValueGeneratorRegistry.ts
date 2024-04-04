import {
  StandardValueGenerator,
  StandardValueGeneratorName,
} from './StandardValueGenerator';
import { MongoObjectId, UUIDGenerator } from './index';
import {
  ConstantValue,
  ContextAccessor,
  IntegerGenerator,
  IPAddressValueGenerator,
  ProbableBooleanGenerator,
  TimestampGenerator,
} from '../generators';

export type StandardValueGeneratorBuilder = () => StandardValueGenerator;

export interface StandardValueGeneratorRegistry {
  [name: StandardValueGeneratorName]: StandardValueGeneratorBuilder;
}

const REGISTRY: StandardValueGeneratorRegistry = {};

export const getAllStandardValues = () => {
  return Object.keys(REGISTRY);
};

export const getStandard = (
  name: StandardValueGeneratorName,
): StandardValueGenerator => {
  if (name.startsWith('!ref-')) {
    return new ContextAccessor({
      path: name.substring(5),
    });
  }

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
  builder: StandardValueGeneratorBuilder,
) => {
  if (hasStandard(name)) {
    throw new Error(`Name '${name}' is already registered`);
  }

  REGISTRY[name] = builder;
};

// UUIDs
registerStandard('uuid', () => new UUIDGenerator());
registerStandard('UUID', () => new UUIDGenerator({ uppercase: true }));

// Mongo Object ID
registerStandard('mongo-object-id', () => new MongoObjectId());

// Boolean Standards
registerStandard('boolean', () => new ProbableBooleanGenerator());

const booleanProbabilities = [
  0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9,
];

booleanProbabilities.forEach((value) => {
  registerStandard(
    `boolean-${value}`,
    () => new ProbableBooleanGenerator({ probability: value }),
  );
});

registerStandard('true', () => new ConstantValue({ value: true }));
registerStandard('false', () => new ConstantValue({ value: false }));

// Integer Standards
const integerBases = [
  1, 10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000,
];

integerBases.forEach((base, idx) => {
  registerStandard(
    `integer-e${idx + 1}`,
    () =>
      new IntegerGenerator({
        min: base * 10 * -1,
        max: base * 10,
      }),
  );

  registerStandard(
    `integer-e${idx + 1}-u`,
    () =>
      new IntegerGenerator({
        min: 0,
        max: base * 10,
      }),
  );
});

// Timestamps registration
const timestampIntervals: any = {
  seconds: { vals: [1, 5, 10, 15, 30, 45], unit: 's' },
  minutes: { vals: [1, 5, 10, 15, 30, 45], unit: 'm' },
  hours: { vals: [1, 3, 6, 9, 12, 15, 18], unit: 'h' },
  days: { vals: [1, 2, 3, 4, 5, 6, 7, 10, 14, 20, 21, 28], unit: 'd' },
  months: { vals: [1, 3, 6, 9], unit: 'M' },
  years: { vals: [1, 2, 3, 5, 10, 20, 50, 100, 200], unit: 'y' },
};

Object.keys(timestampIntervals).forEach((unitKey: string) => {
  const unit = timestampIntervals[unitKey];
  unit.vals.forEach((value: number) => {
    ['past', 'future'].forEach((direction: string) => {
      ['timestamp', 'date'].forEach((type: string) => {
        const config: any = { direction, period: {} };
        config.period[unitKey] = value;
        config.asDate = type === 'date';

        registerStandard(
          `${type}-${direction}-${value}${unit.unit}`,
          () => new TimestampGenerator(config),
        );
      });
    });
  });
});

registerStandard(
  'timestamp-minute-before',
  () =>
    new TimestampGenerator({
      period: { minutes: 2 },
      minimumPeriod: { minutes: 1 },
      direction: 'past',
    }),
);

registerStandard(
  'timestamp-hour-before',
  () =>
    new TimestampGenerator({
      period: { hours: 2 },
      minimumPeriod: { hours: 1 },
      direction: 'past',
    }),
);

registerStandard(
  'timestamp-day-before',
  () =>
    new TimestampGenerator({
      period: { days: 2 },
      minimumPeriod: { days: 1 },
      direction: 'past',
    }),
);

registerStandard(
  'timestamp-week-before',
  () =>
    new TimestampGenerator({
      period: { days: 14 },
      minimumPeriod: { days: 7 },
      direction: 'past',
    }),
);

registerStandard(
  'timestamp-year-before',
  () =>
    new TimestampGenerator({
      period: { years: 2 },
      minimumPeriod: { years: 1 },
      direction: 'past',
    }),
);

registerStandard(
  'timestamp-decade-before',
  () =>
    new TimestampGenerator({
      period: { years: 20 },
      minimumPeriod: { years: 10 },
      direction: 'past',
    }),
);

registerStandard(
  'timestamp-century-before',
  () =>
    new TimestampGenerator({
      period: { years: 200 },
      minimumPeriod: { years: 100 },
      direction: 'past',
    }),
);

registerStandard(
  'timestamp-minute-after',
  () =>
    new TimestampGenerator({
      period: { minutes: 2 },
      minimumPeriod: { minutes: 1 },
      direction: 'future',
    }),
);

registerStandard(
  'timestamp-hour-after',
  () =>
    new TimestampGenerator({
      period: { hours: 2 },
      minimumPeriod: { hours: 1 },
      direction: 'future',
    }),
);

registerStandard(
  'timestamp-day-after',
  () =>
    new TimestampGenerator({
      period: { days: 2 },
      minimumPeriod: { days: 1 },
      direction: 'future',
    }),
);

registerStandard(
  'timestamp-week-after',
  () =>
    new TimestampGenerator({
      period: { days: 14 },
      minimumPeriod: { days: 7 },
      direction: 'future',
    }),
);

registerStandard(
  'timestamp-year-after',
  () =>
    new TimestampGenerator({
      period: { years: 2 },
      minimumPeriod: { years: 1 },
      direction: 'future',
    }),
);

registerStandard(
  'timestamp-decade-after',
  () =>
    new TimestampGenerator({
      period: { years: 20 },
      minimumPeriod: { years: 10 },
      direction: 'future',
    }),
);

registerStandard(
  'timestamp-century-after',
  () =>
    new TimestampGenerator({
      period: { years: 200 },
      minimumPeriod: { years: 100 },
      direction: 'future',
    }),
);

registerStandard(
  'date-minute-before',
  () =>
    new TimestampGenerator({
      period: { minutes: 2 },
      minimumPeriod: { minutes: 1 },
      direction: 'past',
      asDate: true,
    }),
);

registerStandard(
  'date-hour-before',
  () =>
    new TimestampGenerator({
      period: { hours: 2 },
      minimumPeriod: { hours: 1 },
      direction: 'past',
      asDate: true,
    }),
);

registerStandard(
  'date-day-before',
  () =>
    new TimestampGenerator({
      period: { days: 2 },
      minimumPeriod: { days: 1 },
      direction: 'past',
      asDate: true,
    }),
);

registerStandard(
  'date-week-before',
  () =>
    new TimestampGenerator({
      period: { days: 14 },
      minimumPeriod: { days: 7 },
      direction: 'past',
      asDate: true,
    }),
);

registerStandard(
  'date-year-before',
  () =>
    new TimestampGenerator({
      period: { years: 2 },
      minimumPeriod: { years: 1 },
      direction: 'past',
      asDate: true,
    }),
);

registerStandard(
  'date-decade-before',
  () =>
    new TimestampGenerator({
      period: { years: 20 },
      minimumPeriod: { years: 10 },
      direction: 'past',
      asDate: true,
    }),
);

registerStandard(
  'date-century-before',
  () =>
    new TimestampGenerator({
      period: { years: 200 },
      minimumPeriod: { years: 100 },
      direction: 'past',
      asDate: true,
    }),
);

registerStandard(
  'date-minute-after',
  () =>
    new TimestampGenerator({
      period: { minutes: 2 },
      minimumPeriod: { minutes: 1 },
      direction: 'future',
      asDate: true,
    }),
);

registerStandard(
  'date-hour-after',
  () =>
    new TimestampGenerator({
      period: { hours: 2 },
      minimumPeriod: { hours: 1 },
      direction: 'future',
      asDate: true,
    }),
);

registerStandard(
  'date-day-after',
  () =>
    new TimestampGenerator({
      period: { days: 2 },
      minimumPeriod: { days: 1 },
      direction: 'future',
      asDate: true,
    }),
);

registerStandard(
  'date-week-after',
  () =>
    new TimestampGenerator({
      period: { days: 14 },
      minimumPeriod: { days: 7 },
      direction: 'future',
      asDate: true,
    }),
);

registerStandard(
  'date-year-after',
  () =>
    new TimestampGenerator({
      period: { years: 2 },
      minimumPeriod: { years: 1 },
      direction: 'future',
      asDate: true,
    }),
);

registerStandard(
  'date-decade-after',
  () =>
    new TimestampGenerator({
      period: { years: 20 },
      minimumPeriod: { years: 10 },
      direction: 'future',
      asDate: true,
    }),
);

registerStandard(
  'date-century-after',
  () =>
    new TimestampGenerator({
      period: { years: 200 },
      minimumPeriod: { years: 100 },
      direction: 'future',
      asDate: true,
    }),
);

registerStandard(
  'random-ip-address',
  () =>
    new IPAddressValueGenerator({
      octet1: { min: 1, max: 254 },
      octet2: { min: 1, max: 254 },
      octet3: { min: 1, max: 254 },
      octet4: { min: 1, max: 254 },
    }),
);
