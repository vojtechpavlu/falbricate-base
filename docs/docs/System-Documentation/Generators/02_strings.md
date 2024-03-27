# String generators

Here is a list of predefined generators for generating string values.

## Random String of lenght

Generates a random string based on desired `length` (number) and given `charset`.

`charset` is checked to be a real [Charset](../../Utils/charset.md). When it's not,
it throws an error; so it does when the `length` is negative. Both fields are required.

### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: StringGeneratorConfig = {
        length: 13,
        charset: ['a', 'b', 'c', 'd']
    }

    const generator = new StringOfLengthGenerator(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        bccbdaddacdbd
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: StringGeneratorConfig = {
        length: 13,
        charset: ['a', 'b', 'c', 'd']
    }

    const generator = getValueGenerator('string-of-length', config);

    const value = generator.get({});
    ```

    !!! abstract "Output"

        ```
        bccbdaddacdbd
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'string-of-length',
                config: {
                    length: 13,
                    charset: ['a', 'b', 'c', 'd']
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'bccbdaddacdbd' }
        ```

## Constant String

This constant string generator simply returns a string value given
in the provided configuration.

The value is specified in the `text` property. When it's not of type string,
it throws an Error. Can be empty string (`''`).

### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ConstantStringConfig = {
        text: 'my constant string',
    }

    const generator = new ConstantStringGenerator(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        my constant string
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: ConstantStringConfig = {
        text: 'my constant string',
    }

    const generator = getValueGenerator('constant-string', config);

    console.log(generator.get({}));
    ```

    !!! abstract "Output"

        ```
        my constant string
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'constant-string',
                config: {
                    text: 'my constant string',
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'my constant string' }
        ```
