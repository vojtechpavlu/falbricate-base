import { ProfileFabricator } from '../ProfileFabricator';
import { SchemaInput } from '../../schema';

/**
 * This is a Profile Fabricator of various identifiers you can use.
 */
export class IdentifierProfileFabricator extends ProfileFabricator {
  private static readonly SCHEMA_INPUT: SchemaInput = {
    fields: {
      rowNumber: { type: 'context-input', config: { path: 'index' } },
      randH: 'integer-e3-u',
      randT: 'integer-e4-u',
      randM: 'integer-e7-u',
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
