import { Fabricator, SchemaInput } from '../schema';

export abstract class ProfileFabricator {
  public readonly profileKey: string;
  private readonly schemaInput: SchemaInput;

  protected constructor(profileKey: string, schemaInput: SchemaInput) {
    this.profileKey = profileKey;
    this.schemaInput = schemaInput;
  }

  public createFabricator = () => {
    return new Fabricator(this.schemaInput);
  };
}
