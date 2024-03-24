# Object Manipulation

These pipes are used to manipulate objects.


## Object into list

This value pipe turns the given object into a list.

=== "Plain example"

    ``` typescript linenums="1"
    const value = {
        prop1: "my prop value",
        prop2: "my another prop value"
    };
    
    const pipe = getValuePipe('object-to-list');

    console.log(pipe(value))
    ```

    !!! abstract "Output"
        
        ```
        [
            { key: 'prop1', value: 'my prop value' },
            { key: 'prop2', value: 'my another prop value' }
        ]
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
            'object-to-list'
        ]
    });
    
    console.log(generator.generate())
    ```

    !!! abstract "Output"
        
        ```
        [
            { key: 'prop1', value: 'my prop value' },
            { key: 'prop2', value: 'my another prop value' }
        ]
        ```
    
    !!! tip
    
        This example uses [Object Generator](../../Generators/06_objects.md#object-from-schema).
        You may want to check it out :wink:
