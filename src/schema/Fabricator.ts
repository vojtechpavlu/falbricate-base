import { Schema } from './Schema';
import { GeneratedValue } from '../generators';
import { SchemaInput } from './SchemaInput';
import { FabricationContext } from './fabricationContext';

/**
 * Falsum is a randomly generated object by the given schema.
 */
export interface ObjectFalsum {
  [name: string]: GeneratedValue;
}

/**
 * Randomly generated Falsum by given schema and piped through
 * Falsum Pipes
 */
export type Falsum = ObjectFalsum | string;

/**
 * Fabricator is a factory class providing services of generating
 * Falsum objects and maintaining their generative process.
 */
export class Fabricator {
  /** Schema to be used for Falsum fabrication */
  readonly schema: Schema;

  constructor(schemaInput: SchemaInput) {
    this.schema = new Schema(schemaInput);
  }

  /**
   * Generates a single Falsum fitting the schema given in constructor.
   */
  public generate = (context?: FabricationContext): Falsum | ObjectFalsum => {
    // Future ObjectFalsum
    let falsum: any = {};

    // When not given, create empty one
    context = {
      index: 0,
      profiles: {},
      ...context,
    };

    // Generate profile data
    Object.keys(this.schema.profiles).forEach((profileKey: string) => {
      const generator = this.schema.profiles[profileKey];
      const profileData = generator!.generate(context);
      context!.profiles[profileKey] = profileData!;
    });

    // Generate all properties
    Object.keys(this.schema.fields).forEach((property) => {
      // Add falsum which is currently being generated
      context = {
        ...context,
        current: falsum,
      };

      // Generate a new value with the whole context
      falsum[property] = this.schema.fields[property]?.generate(context);
    });

    // Pipe the value through all the Falsum Pipes
    this.schema.pipes.forEach((pipe) => {
      falsum = pipe(falsum);
    });

    return falsum;
  };

  /**
   * Generates multiple Falsum objects fitting the schema given in constructor.
   *
   * @param n     Number of Falsum objects to be generated. Has to be non-negative.
   * @param data  Given client context to be used for generation of these falsa.
   *
   * @throws {Error} When the given number of expected falsa doesn't match the
   * rule of non-negativity.
   */
  public generateMany = (
    n: number,
    data: FabricationContext = {},
  ): Falsum[] | ObjectFalsum[] => {
    if (!n || n < 0) {
      throw new Error(
        `Expected a positive number of how many items should be created: ${n}`,
      );
    }

    const items: Falsum[] = [];
    let previous = undefined;

    for (let index = 0; index < n; index++) {
      const context = {
        index, // Add index
        previous, // Add previous item
        ...data, // Add client context
      };

      const item = this.generate(context);

      previous = item;
      items.push(item);
    }

    return items;
  };
}
