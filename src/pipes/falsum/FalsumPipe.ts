import { Falsum, ObjectFalsum } from '../../schema';
import { fieldsToCamel, fieldsToSnake } from './fieldNameCasing';
import {
  addGeneratedTimestampDate,
  addGeneratedTimestampNumber,
} from './generatedTimestamp';
import { pruneEmptyArrays, pruneNulls, pruneUndefined } from './falsumCleaners';
import { stringify, stringifyWithIndentation } from './stringification';
import { objectFalsumToList } from './objectFalsumManipulation';

/**
 * Falsum Pipe is a function altering a given Falsum into another one.
 *
 * The reason for this kind of pipes is to enable the client to change
 * the general mechanism of how is the Falsum generated to his needs.
 */
export type FalsumPipe = (falsum: ObjectFalsum) => Falsum | ObjectFalsum;

export type FalsumPipeName =
  | string
  // Field names modifications
  | (
      | 'snake-case-props'
      | 'camel-case-props'

      // Timestamps
      | 'generated-timestamp-date'
      | 'generated-timestamp-number'

      // Pruners
      | 'prune-undefined'
      | 'prune-null'
      | 'prune-empty-arrays'

      // Stringification
      | 'stringify'
      | 'stringify-indented'

      // Object Manipulation
      | 'object-to-list'
    );

/**
 * Registry used to store the commonly used Falsum Pipes
 * to modify the generated Falsum object
 */
interface FalsumPipeRegistry {
  [pipeName: string]: FalsumPipe;
}

/** The actual registry of all the pipes */
const FALSUM_PIPE_REGISTRY: FalsumPipeRegistry = {};

/**
 * Tries to find and return a Falsum Pipe by given name
 *
 * @param name the pipe is assigned to
 *
 * @throws {Error} When there is no pipe with this name assigned found
 */
export const getFalsumPipe = (name: string): FalsumPipe => {
  const pipe = FALSUM_PIPE_REGISTRY[name];

  if (!pipe) {
    throw new Error(`No Falsum Pipe assigned to name '${name}' found`);
  }

  return pipe;
};

/**
 * Stores a given Falsum Pipe under a given name.
 *
 * @param name the given Falsum Pipe should be stored under
 * @param pipe Falsum Pipe assigned to the given name
 *
 * @throws {Error} When a falsy pipe was provided
 * @throws {Error} When there already is a pipe registered under this name
 */
export const storeFalsumPipe = (name: string, pipe: FalsumPipe) => {
  if (!pipe) {
    throw new Error(`Falsum Pipe not provided`);
  } else if (hasFalsumPipe(name)) {
    throw new Error(
      `There already is one Falsum Pipe assigned to name '${name}'`,
    );
  }

  FALSUM_PIPE_REGISTRY[name] = pipe;
};

/**
 * Returns if there is registered pipe with a given name.
 *
 * @param name Name to be checked if is or is not already reserved.
 */
export const hasFalsumPipe = (name: string): boolean => {
  return !!Object.keys(FALSUM_PIPE_REGISTRY).find(
    (pipeName) => pipeName === name,
  );
};

// Falsum field names modifications
storeFalsumPipe('snake-case-props', fieldsToSnake);
storeFalsumPipe('camel-case-props', fieldsToCamel);

// Timestamps
storeFalsumPipe('generated-timestamp-date', addGeneratedTimestampDate);
storeFalsumPipe('generated-timestamp-number', addGeneratedTimestampNumber);

// Pruners
storeFalsumPipe('prune-undefined', pruneUndefined);
storeFalsumPipe('prune-null', pruneNulls);
storeFalsumPipe('prune-empty-arrays', pruneEmptyArrays);

// Stringification
storeFalsumPipe('stringify', stringify);
storeFalsumPipe('stringify-indented', stringifyWithIndentation);

// Object Manipulation
storeFalsumPipe('object-to-list', objectFalsumToList);
