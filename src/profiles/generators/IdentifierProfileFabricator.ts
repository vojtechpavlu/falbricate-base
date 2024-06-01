import { ProfileFabricator } from '../ProfileFabricator';
import { SchemaInput } from '../../schema';

/**
 * This is a Profile Fabricator of various identifiers you can use.
 */
export class IdentifierProfileFabricator extends ProfileFabricator {
  private static readonly SCHEMA_INPUT: SchemaInput = {
    fields: {
      rowNumber: { type: 'context-input', config: { path: 'index' } },
      randH: { type: 'range-integer', config: { max: 100 } },
      randT: { type: 'range-integer', config: { max: 1_000 } },
      randM: { type: 'range-integer', config: { max: 1_000_000 } },
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
