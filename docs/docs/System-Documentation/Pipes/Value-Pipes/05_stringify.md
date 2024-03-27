# Stringification

These pipes are used to stringify the given values.

## Plain stringification

This value returns a string of the given value.

=== "Plain example"

    ``` typescript linenums="1"
    const value = {
        prop1: "my prop value",
        prop2: "my another prop value"
    };

    const pipe = getValuePipe('stringify');

    console.log(pipe(value))
    ```

    !!! abstract "Output"

        ```
        '{"prop1":"my prop value","prop2":"my another prop value"}'
        ```

=== "Example with Value Generator"

    ``` typescript linenums="1"
    const fieldSchema: SchemaInput = {
        fields: {
            prop1: {
                type: 'constant-string',
                config: {
                    text: 'my prop value'
                }
            },
            prop2: {
                type: 'constant-string',
                config: {
                    text: 'my another prop value'
                }
            }
        }
    }

    const generator = getValueGenerator('object-from-schema', {
        schema: fieldSchema,
        pipes: [
            'stringify'
        ]
    });

    console.log(generator.generate())
    ```

    !!! abstract "Output"

        ```
        '{"prop1":"my prop value","prop2":"my another prop value"}'
        ```

    !!! tip

        This example uses [Object Generator](../../Generators/06_objects.md#object-from-schema).
        You may want to check it out :wink:
