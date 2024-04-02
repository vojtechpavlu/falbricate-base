# Integer Standards

Integer Standard Value Generators lets you generate random integers by a
predefined ranges.

There are two general declaration patterns; both derived from
logarithmic (base=10) notation:

- `integer-e<<base>>` - generates a random number within a range.
  You can declare you want a number in scale of hundreds by using `2`
  as base (`integer-e2`); the full list of available bases is:
  [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`]. Note this range includes
  also negative numbers.

- `integer-e<<base>>-u` - similar to the `integer-e<<base>>` pattern;
  by adding the `-u` flag, you specify the generated number has to be
  a positive number.

## Examples

### Signed

This is an example of the `integer-e<<base>>` pattern, where you
want to get any number within the range with possible negative numbers.

=== "Declarative access"

    ``` typescript linenums="1"
    const generator = getStandard('integer-e4');
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        -8405
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: 'integer-e4'
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: -8405 }
        ```

### Unsigned

This is an example of `integer-e<<base>>-u` pattern where you want
to restrict the numbers to be within a range of `[0, random * (10 ^ base)]`.

=== "Declarative access"

    ``` typescript linenums="1"
    const generator = getStandard('integer-e4-u');
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        7828
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: 'integer-e4-u'
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 7828 }
        ```
