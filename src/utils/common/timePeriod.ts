interface FactorizationMap {
  [unit: string]: number;
}

export interface TimePeriod {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;

  [key: string]: number | undefined;
}

const FACTORIZATION_MAP: FactorizationMap = {
  milliseconds: 1,
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
  months: 30 * 24 * 60 * 60 * 1000,
  years: 12 * 30 * 24 * 60 * 60 * 1000,
};

export const calculatePeriod = (period: TimePeriod): number => {
  const props = [
    'years',
    'months',
    'days',
    'hours',
    'minutes',
    'seconds',
    'milliseconds',
  ];
  return Math.ceil(
    props
      .map((unit) => {
        const factor = FACTORIZATION_MAP[unit]!;
        const unitPeriod = period[unit]!;

        if (!!unitPeriod && unitPeriod < 0) {
          throw new Error(`Unsupported period: '${unit}' must not be negative`);
        }

        return period[unit] ? period[unit]! * factor : 0;
      })
      .reduce((acc: number, curr: number) => acc + curr),
  );
};
