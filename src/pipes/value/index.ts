import { GeneratedValue } from '../../baseGenerators';
import { stringify } from './stringify';
import { sortAsc, sortDesc } from './sorting';
import { lowercase, uppercase } from './casing';
import { singleSpace, trimString } from './stringCleaning';
import { splitBySpace } from './split';
import { objectValueToList } from './objectValueManipulation';

/**
 * Declaration of a pipe altering the generated value
 *
 * @see
 * <ul>
 *  <li>{@link GeneratedValue} Value being modified by this pipe</li>
 * </ul>
 */
export type ValuePipe = (value: GeneratedValue) => GeneratedValue;

/** Names of the Value Pipes for type-hinting purposes */
export type ValuePipeName =
  | string
  // String value pipes
  | (
      | 'stringify'
      | 'trim'
      | 'single-space'
      | 'uppercase'
      | 'lowercase'
      | 'space-split'

      // Sorting
      | 'sort-ascending'
      | 'sort-descending'

      // Object manipulation
      | 'object-to-list'
    );

/**
 * Declaration of Value Pipes Registry type
 */
interface ValuePipeRegistry {
  [name: ValuePipeName]: ValuePipe;
}

/** The actual Value Pipes Registry */
const VALUE_PIPE_REGISTRY: ValuePipeRegistry = {};

/**
 * Tries to find a Value Pipe by a name assigned to it.
 *
 * @param name Name the pipe should have assigned
 *
 * @throws {Error} When no such Value Pipe is found
 */
export const getValuePipe = (name: ValuePipeName): ValuePipe => {
  const pipe: ValuePipe | undefined = VALUE_PIPE_REGISTRY[name];

  if (!pipe) {
    throw new Error(`Pipe with name '${name}' not found`);
  }

  return pipe;
};

/**
 * Returns if there is a Value Pipe with such name
 *
 * @param name Name of the Value Pipe
 */
export const hasValuePipe = (name: ValuePipeName): boolean => {
  return !!Object.keys(VALUE_PIPE_REGISTRY).find((key) => key === name);
};

/**
 * Tries to store the given Value Pipe with a given name assigned.
 *
 * @param name Name the Value Pipe should have assigned
 * @param pipe Pipe to be assigned to the given name
 *
 * @throws {Error} When the name is empty
 * @throws {Error} When the name is already taken
 * @throws {Error} When the given pipe is not defined
 */
export const storeValuePipe = (name: ValuePipeName, pipe: ValuePipe) => {
  if (!name) {
    throw new Error(`Name is required`);
  } else if (hasValuePipe(name)) {
    throw new Error(
      `There already is one Value Pipe registered with name '${name}'`,
    );
  } else if (!pipe) {
    throw new Error(`Pipe must be defined`);
  }

  VALUE_PIPE_REGISTRY[name] = pipe;
};

// String value pipes
storeValuePipe('stringify', stringify);
storeValuePipe('trim', trimString);
storeValuePipe('single-space', singleSpace);
storeValuePipe('uppercase', uppercase);
storeValuePipe('lowercase', lowercase);
storeValuePipe('space-split', splitBySpace);

// Sorting
storeValuePipe('sort-ascending', sortAsc);
storeValuePipe('sort-descending', sortDesc);

// Object manipulation
storeValuePipe('object-to-list', objectValueToList);

export * from './stringify';
export * from './casing';
export * from './sorting';
export * from './objectValueManipulation';
