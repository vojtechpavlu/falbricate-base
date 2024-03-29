import { Falsum, ObjectFalsum } from '../../schema';

/**
 * This simply adds a property `generatedAt` that describes when
 * the given falsum was generated as a stringified date.
 *
 * @param falsum Falsum that should have a timestamp property assigned
 */
export const addGeneratedTimestampDate = (falsum: ObjectFalsum): Falsum => {
  return {
    ...falsum,
    generatedAt: new Date(),
  };
};

/**
 * This simply adds a property `generatedAt` that describes when
 * the given falsum was generated as a number timestamp.
 *
 * @param falsum Falsum that should have a timestamp property assigned
 */
export const addGeneratedTimestampNumber = (falsum: ObjectFalsum): Falsum => {
  return {
    ...falsum,
    generatedAt: new Date().getTime(),
  };
};
