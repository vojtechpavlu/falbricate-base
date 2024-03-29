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

    const value = generator.generate();
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


## Random String

Generates a random string based on a given `charset` with length within a specified range.


### Configuration

This Value Generator requires configuration describing the attributes of the desired string looking
as follows:


=== "Configuration definition"

    This configuration requires a specification of the length as a range withing which the
    output string should be of, and a set of characters the result string should consist of:

    ``` typescript linenums="1"
    export type RandomStringGeneratorConfig = {
        minLen?: number;
        maxLen: number;
        charset: Charset;
    } & ValueGeneratorConfig;
    ```


=== "Example"

    The following configuration example could be used to generate strings of length
    somewhere in between 0 and 15 characters while using only characters of the set
    `['a', 'b', 'c', 'd', 'e', 'f']`

    ``` typescript linenums="1"
    const config: RandomStringGeneratorConfig = {
        maxLen: 15,
        charset: ['a', 'b', 'c', 'd', 'e', 'f']
    };
    ```


There are some general rules applied to the configuration being checked:

- Property `minLen` is optional. When not provided, zero (`0`) is used.
- Property `maxLen` is required.
- `minLen` must not be greater then `maxLen`.
- Both `minLen` and `maxLen` must be positive numbers.
- `charset` is checked to be a real [Charset](../../Utils/charset.md).


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: RandomStringGeneratorConfig = {
        maxLen: 15,
        charset: ['a', 'b', 'c', 'd', 'e', 'f']
    };

    const generator = new RandomStringGenerator(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        'acafbedcaf'
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: RandomStringGeneratorConfig = {
        maxLen: 15,
        charset: ['a', 'b', 'c', 'd', 'e', 'f']
    };

    const generator = getValueGenerator('random-string', config);

    const value = generator.generate();
    ```

    !!! abstract "Output"

        ```
        'acafbedcaf'
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'random-string',
                config: {
                    maxLen: 15,
                    charset: ['a', 'b', 'c', 'd', 'e', 'f']
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'acafbedcaf' }
        ```
