import { ProfileFabricator } from './ProfileFabricator';
import { IdentifierProfileFabricator } from './generators';

export type ProfileFabricatorBuilder = () => ProfileFabricator;

export type ProfileFabricatorName = string | (
  'identifiers'
  )

export interface ProfileFabricatorRegistry {
  [profileName: ProfileFabricatorName]: ProfileFabricatorBuilder
}

const REGISTRY: ProfileFabricatorRegistry = {};

export const getProfileFabricator = (
  name: ProfileFabricatorName
): ProfileFabricator => {
  const builder = REGISTRY[name];

  if (!builder) {
    throw new Error(`No Profile Fabricator found for name '${name}'`)
  }

  return builder();
}

export const hasProfileFabricator = (name: ProfileFabricatorName): boolean => {
  return !!Object.keys(REGISTRY).find((item) => item === name);
}

export const registerProfileFabricator = (
  name: string,
  builder: ProfileFabricatorBuilder
) => {
  if (hasProfileFabricator(name)) {
    throw new Error(`There already is a Profile Fabricator with this name: '${name}'`);
  }

  REGISTRY[name] = builder;
}

registerProfileFabricator(
  'identifiers',
  () => new IdentifierProfileFabricator('identifiers')
);
