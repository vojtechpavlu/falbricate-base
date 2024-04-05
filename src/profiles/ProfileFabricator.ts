import { Fabricator, SchemaInput } from '../schema';
import { ProfileFabricatorName } from './ProfileFabricatorRegistry';

/** Declaration of Profile Configuration */
export type ProfileFabricatorConfiguration = {} & any

/** Profile object-based definition */
export type ProfileFabricatorDefinition = {
  type: string;
  configuration?: ProfileFabricatorConfiguration
}

export type ProfileDeclaration = ProfileFabricatorDefinition | ProfileFabricatorName;

export abstract class ProfileFabricator {
  public readonly profileKey: string;
  private readonly schemaInput: SchemaInput;

  protected constructor(
    profileKey: string,
    schemaInput: SchemaInput
  ) {
    this.profileKey = profileKey;
    this.schemaInput = schemaInput;
  }

  public createFabricator = () => {
    return new Fabricator(this.schemaInput);
  };
}
