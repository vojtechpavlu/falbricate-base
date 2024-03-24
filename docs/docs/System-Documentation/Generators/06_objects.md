# Object generators

Here is a list of predefined generators for generating object values.

## Object from Schema

Builds up an object by given schema.

The configuration object is required to have `schema` field containing
a [Schema Input](../Building-Blocks/02_schema-input.md) object. This configured
schema object will be used to generate nested falsum.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const fieldSchema: SchemaInput = {
        fields: {
            value: {
                type: 'array-picker',
                config: {
                    array: ['a', 'b', 'c', 'd']
                }
            }
        }
    }

    const config: ObjectFromSchemaConfig = {
        schema: fieldSchema
    }
    
    const generator = new ObjectFromSchemaGenerator(config);
    
    console.log(generator.get({}));
    ```
    
    !!! abstract "Output"

        ``` json
        { value: 'd' }
        ```


=== "Declarative access"

    ``` typescript linenums="1"

    const fieldSchema: SchemaInput = {
        fields: {
            value: {
                type: 'array-picker',
                config: {
                    array: ['a', 'b', 'c', 'd']
                }
            }
        }
    }

    const config: ObjectFromSchemaConfig = {
        schema: fieldSchema
    }
    
    const generator = getValueGenerator('object-from-schema', config);
    
    const value = generator.get({});
    ```
    
    !!! abstract "Output"

        ``` json
        { value: 'd' }
        ```

=== "Schema access"

    ``` javascript linenums="1"

    const fieldSchema: SchemaInput = {
        fields: {
            value: {
                type: 'array-picker',
                config: {
                    array: ['a', 'b', 'c', 'd']
                }
            }
        }
    }

    const schema: SchemaInput = {
        fields: {
            nested: {
                type: 'object-from-schema',
                config: {
                    schema: fieldSchema
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
        
    console.log(fabricator.generate());
    ```
    
    !!! abstract "Output"

        ``` json
        { nested: { value: 'd' } }
        ```
