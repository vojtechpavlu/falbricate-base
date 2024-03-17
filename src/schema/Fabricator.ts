import { Schema } from './Schema';
import { GeneratedValue } from '../baseGenerators';
import { SchemaInput } from './SchemaInput';

/**
 * Falsum is a randomly generated object by the given schema.
 */
export interface Falsum {
  [name: string]: GeneratedValue;
}

/**
 * Falsum Pipe is a function altering a given Falsum into another one.
 *
 * The reason for this kind of pipes is to enable the client to change
 * the general mechanism of how is the Falsum generated to his needs.
 */
export type FalsumPipe = (falsum: Falsum) => Falsum;

/**
 * Fabricator is a factory class providing services of generating
 * Falsum objects and maintaining their generative process.
 */
export class Fabricator {
  /** Schema to be used for Falsum fabrication */
  readonly schema: Schema;

  /** Pipes used to modify the whole generated falsum */
  readonly pipes: FalsumPipe[];

  constructor(schemaInput: SchemaInput, pipes: FalsumPipe[] = []) {
    this.schema = new Schema(schemaInput);
    this.pipes = pipes;
  }

  /**
   * Generates a single Falsum fitting the schema given in constructor.
   */
  public generate = (): Falsum => {
    let falsum: Falsum = {};

    // Generate all properties
    Object.keys(this.schema.fields).forEach((property) => {
      falsum[property] = this.schema.fields[property]?.get();
    });

    // Pipe the value through all the Falsum Pipes
    this.pipes.forEach((pipe) => {
      falsum = pipe(falsum);
    })

    return falsum;
  };

  /**
   * Generates multiple Falsum objects fitting the schema given in constructor.
   *
   * @param n Number of Falsum objects to be generated. Has to be non-negative.
   *
   * @throws {Error} When the given number of expected Falsums doesn't match the
   * rule of non-negativity.
   */
  public generateMany = (n: number): Falsum[] => {
    if (!n || n < 0) {
      throw new Error(
        `Expected a positive number of how many items should be created: ${n}`,
      );
    }

    const items: Falsum[] = [];

    for (let i = 0; i < n; i++) {
      items.push(this.generate());
    }

    return items;
  };
}
