export type StandardValueGeneratorName =
  | string
  // IDs
  | (
      | 'uuid'
      | 'UUID'
      | 'mongo-object-id'

      // Boolean Standards
      | 'boolean'
      | 'boolean-0.1'
      | 'boolean-0.2'
      | 'boolean-0.25'
      | 'boolean-0.3'
      | 'boolean-0.4'
      | 'boolean-0.5'
      | 'boolean-0.6'
      | 'boolean-0.7'
      | 'boolean-0.75'
      | 'boolean-0.8'
      | 'boolean-0.9'
      | 'true'
      | 'false'

      // Integer Standards
      | 'integer-e1'
      | 'integer-e2'
      | 'integer-e3'
      | 'integer-e4'
      | 'integer-e5'
      | 'integer-e6'
      | 'integer-e7'
      | 'integer-e8'
      | 'integer-e1-u'
      | 'integer-e2-u'
      | 'integer-e3-u'
      | 'integer-e4-u'
      | 'integer-e5-u'
      | 'integer-e6-u'
      | 'integer-e7-u'
      | 'integer-e8-u'

      // Past Timestamps
      | 'timestamp-past-1s'
      | 'timestamp-past-5s'
      | 'timestamp-past-10s'
      | 'timestamp-past-15s'
      | 'timestamp-past-30s'
      | 'timestamp-past-45s'
      | 'timestamp-past-1m'
      | 'timestamp-minute-before'
      | 'timestamp-past-5m'
      | 'timestamp-past-10m'
      | 'timestamp-past-15m'
      | 'timestamp-past-30m'
      | 'timestamp-past-45m'
      | 'timestamp-past-1h'
      | 'timestamp-hour-before'
      | 'timestamp-past-3h'
      | 'timestamp-past-6h'
      | 'timestamp-past-9h'
      | 'timestamp-past-12h'
      | 'timestamp-past-15h'
      | 'timestamp-past-18h'
      | 'timestamp-past-1d'
      | 'timestamp-past-2d'
      | 'timestamp-day-before'
      | 'timestamp-past-3d'
      | 'timestamp-past-4d'
      | 'timestamp-past-6d'
      | 'timestamp-past-7d'
      | 'timestamp-past-10d'
      | 'timestamp-past-14d'
      | 'timestamp-week-before'
      | 'timestamp-past-20d'
      | 'timestamp-past-21d'
      | 'timestamp-past-28d'
      | 'timestamp-past-1M'
      | 'timestamp-month-before'
      | 'timestamp-past-3M'
      | 'timestamp-past-6M'
      | 'timestamp-past-9M'
      | 'timestamp-past-1y'
      | 'timestamp-year-before'
      | 'timestamp-past-2y'
      | 'timestamp-past-3y'
      | 'timestamp-past-5y'
      | 'timestamp-past-10y'
      | 'timestamp-decade-before'
      | 'timestamp-past-20y'
      | 'timestamp-past-50y'
      | 'timestamp-past-100y'
      | 'timestamp-century-before'
      | 'timestamp-past-200y'

      // Future Timestamps
      | 'timestamp-future-1s'
      | 'timestamp-future-5s'
      | 'timestamp-future-10s'
      | 'timestamp-future-15s'
      | 'timestamp-future-30s'
      | 'timestamp-future-45s'
      | 'timestamp-future-1m'
      | 'timestamp-minute-after'
      | 'timestamp-future-5m'
      | 'timestamp-future-10m'
      | 'timestamp-future-15m'
      | 'timestamp-future-30m'
      | 'timestamp-future-45m'
      | 'timestamp-future-1h'
      | 'timestamp-hour-after'
      | 'timestamp-future-3h'
      | 'timestamp-future-6h'
      | 'timestamp-future-9h'
      | 'timestamp-future-12h'
      | 'timestamp-future-15h'
      | 'timestamp-future-18h'
      | 'timestamp-future-1d'
      | 'timestamp-day-after'
      | 'timestamp-future-2d'
      | 'timestamp-future-3d'
      | 'timestamp-future-4d'
      | 'timestamp-future-6d'
      | 'timestamp-future-7d'
      | 'timestamp-future-10d'
      | 'timestamp-week-after'
      | 'timestamp-future-14d'
      | 'timestamp-future-20d'
      | 'timestamp-future-21d'
      | 'timestamp-future-28d'
      | 'timestamp-future-1M'
      | 'timestamp-future-3M'
      | 'timestamp-future-6M'
      | 'timestamp-future-9M'
      | 'timestamp-future-1y'
      | 'timestamp-year-after'
      | 'timestamp-future-2y'
      | 'timestamp-future-3y'
      | 'timestamp-future-5y'
      | 'timestamp-future-10y'
      | 'timestamp-decade-after'
      | 'timestamp-future-20y'
      | 'timestamp-future-50y'
      | 'timestamp-future-100y'
      | 'timestamp-century-after'
      | 'timestamp-future-200y'

      // Past Dates
      | 'date-past-1s'
      | 'date-past-5s'
      | 'date-past-10s'
      | 'date-past-15s'
      | 'date-past-30s'
      | 'date-past-45s'
      | 'date-past-1m'
      | 'date-minute-before'
      | 'date-past-5m'
      | 'date-past-10m'
      | 'date-past-15m'
      | 'date-past-30m'
      | 'date-past-45m'
      | 'date-past-1h'
      | 'date-hour-before'
      | 'date-past-3h'
      | 'date-past-6h'
      | 'date-past-9h'
      | 'date-past-12h'
      | 'date-past-15h'
      | 'date-past-18h'
      | 'date-past-1d'
      | 'date-past-2d'
      | 'date-day-before'
      | 'date-past-3d'
      | 'date-past-4d'
      | 'date-past-6d'
      | 'date-past-7d'
      | 'date-past-10d'
      | 'date-past-14d'
      | 'date-week-before'
      | 'date-past-20d'
      | 'date-past-21d'
      | 'date-past-28d'
      | 'date-past-1M'
      | 'date-month-before'
      | 'date-past-3M'
      | 'date-past-6M'
      | 'date-past-9M'
      | 'date-past-1y'
      | 'date-year-before'
      | 'date-past-2y'
      | 'date-past-3y'
      | 'date-past-5y'
      | 'date-past-10y'
      | 'date-decade-before'
      | 'date-past-20y'
      | 'date-past-50y'
      | 'date-past-100y'
      | 'date-century-before'
      | 'date-past-200y'

      // Future Dates
      | 'date-future-1s'
      | 'date-future-5s'
      | 'date-future-10s'
      | 'date-future-15s'
      | 'date-future-30s'
      | 'date-future-45s'
      | 'date-future-1m'
      | 'date-minute-after'
      | 'date-future-5m'
      | 'date-future-10m'
      | 'date-future-15m'
      | 'date-future-30m'
      | 'date-future-45m'
      | 'date-future-1h'
      | 'date-hour-after'
      | 'date-future-3h'
      | 'date-future-6h'
      | 'date-future-9h'
      | 'date-future-12h'
      | 'date-future-15h'
      | 'date-future-18h'
      | 'date-future-1d'
      | 'date-day-after'
      | 'date-future-2d'
      | 'date-future-3d'
      | 'date-future-4d'
      | 'date-future-6d'
      | 'date-future-7d'
      | 'date-future-10d'
      | 'date-week-after'
      | 'date-future-14d'
      | 'date-future-20d'
      | 'date-future-21d'
      | 'date-future-28d'
      | 'date-future-1M'
      | 'date-future-3M'
      | 'date-future-6M'
      | 'date-future-9M'
      | 'date-future-1y'
      | 'date-year-after'
      | 'date-future-2y'
      | 'date-future-3y'
      | 'date-future-5y'
      | 'date-future-10y'
      | 'date-decade-after'
      | 'date-future-20y'
      | 'date-future-50y'
      | 'date-future-100y'
      | 'date-century-after'
      | 'date-future-200y'

      // IP Addresses
      | 'random-ip-address'
    );

import {
  GeneratedValue,
  ValueGenerator,
  ValueGeneratorConfig,
} from '../generators';

export type StandardValueGenerator = ValueGenerator<
  GeneratedValue,
  ValueGeneratorConfig
>;
