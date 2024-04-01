# Boolean Standards

Boolean Standard Value Generators enables you to use predefined
value generators for boolean values.

You can use any of the predefined standards from one of these groups:

- `boolean` - generates a random boolean, while the probability
  for being `true` is `0.5` (in about a half examples, the value will
  be `true`, in another half it will be `false`)

- `true` and `false` - will generate a static constant boolean value

- `boolean-<<probability>>` - lets you generate a boolean value with
  specification of how probable the value should be `true`. Predefined
  probabilities are [`0.1`, `0.2`, `0.25`, `0.3`, `0.4`, `0.5`, `0.6`,
  `0.7`, `0.75`, `0.8` and `0.9`]. The result name could be for example
  `boolean-0.75` (about one quarter of the values will be `false`, rest
  will be `true`)


## Examples


=== "Declarative access"

    ``` typescript linenums="1"
    const generator = getStandard('boolean-0.3');
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        false
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: 'boolean-0.3'
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: false }
        ```
