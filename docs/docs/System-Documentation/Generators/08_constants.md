# Constant Generator

This generator simply generates a deep copy of the value specified in the configuration.

As the given value in the configuration, you can use whatever value you need - string, number, array, object,
array of objects, undefined or null.

## Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ConstantValueConfig = {
        value: 'my constant value'
    }

    const generator = new ConstantValue(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        'my constant value'
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: ConstantValueConfig = {
        value: 'my constant value'
    }

    const generator = getValueGenerator('constant-value', config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        'my constant value'
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'constant-value',
                config: {
                    value: 'my constant value'
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'my constant value' }
        ```
