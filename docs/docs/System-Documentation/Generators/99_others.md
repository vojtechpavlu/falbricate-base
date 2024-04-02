# Other Generators

These generators are providing services of generating values in very different manner
and can't be easily categorized as others.

## XOR Generator

This type of generator chooses between given Value Generators and selects one randomly
to generate the result value while others remain idle.

### Examples

In the following examples, there is this probabilistic decision on
if the generated value shall be `0` or `1`. This XOR Generator then
automatically triggers one [Constant Value Generator](08_constants.md#constant-generator)
or another.

=== "Instance access"

    ``` typescript linenums="1"
    const config: XORConfiguration = {
      generators: {
        zero: { type: 'constant-value', config: { value: 0 } },
        one: { type: 'constant-value', config: { value: 1 } },
      }
    }

    const generator = new XORGenerator(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        1
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: XORConfiguration = {
      generators: {
        zero: { type: 'constant-value', config: { value: 0 } },
        one: { type: 'constant-value', config: { value: 1 } },
      }
    }

    const generator = getValueGenerator('xor', config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        1
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
      fields: {
        value: {
          type: 'xor',
          config: {
            generators: {
              zero: { type: 'constant-value', config: { value: 0 } },
              one: { type: 'constant-value', config: { value: 1 } }
            }
          }
        }
      }
    };

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 1 }
        ```
