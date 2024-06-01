import { ProfileFabricator } from '../ProfileFabricator';
import { SchemaInput } from '../../schema';

/**
 * This is a Profile Fabricator of various identifiers you can use.
 */
export class IdentifierProfileFabricator extends ProfileFabricator {
  private static readonly SCHEMA_INPUT: SchemaInput = {
    fields: {
      rowNumber: '!ref-index',
      randH: {
        type: 'range-integer',
        config: {
          min: 100,
          max: 999
        }
      },
      randT: {
        type: 'range-integer',
        config: {
          min: 1_000,
          max: 9_999
        }
      },
      randM: {
        type: 'range-integer',
        config: {
          min: 1_000_000,
          max: 9_999_999
        }
      },
      uuid: 'uuid',
      UUID: {
        type: 'context-input',
        config: {
          path: 'current.uuid',
          pipes: ['uppercase']
        },
      }
    },
  };

  constructor(key: string) {
    super(key, IdentifierProfileFabricator.SCHEMA_INPUT);
  }
}
