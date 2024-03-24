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
    
    const generator = new ObjectFromSchemaGenerator(config);
    
    console.log(generator.generate());
    ```
    
    !!! abstract "Output"

        ```
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
    
    const value = generator.generate();
    ```
    
    !!! abstract "Output"

        ```
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

        ```
        { nested: { value: 'd' } }
        ```


## List of Objects from Schema

Builds up a list of an objects by given schema.

The configuration object is required to have `schema` field containing
a [Schema Input](../Building-Blocks/02_schema-input.md) object. This configured
schema object will be used to generate nested falsum.

It also expects field `n` describing how many items should it generate.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ListOfObjectsFromSchemaConfig = {
        n: 3,
        schema: {
            fields: {
                testField1: {
                    type: "constant-string",
                    config: {
                        text: "testValue"
                    }
                },
                testField2: {
                    type: "constant-string",
                    config: {
                        text: "testValue"
                    }
                }
            }
        }
    }
    
    const generator = new ListOfObjectsFromSchemaGenerator(config);
    
    console.log(generator.generate());
    ```
    
    !!! abstract "Output"

        ```
        [
            { testField1: 'testValue', testField2: 'testValue' },
            { testField1: 'testValue', testField2: 'testValue' },
            { testField1: 'testValue', testField2: 'testValue' }
        ]
        ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: ListOfObjectsFromSchemaConfig = {
        n: 3,
        schema: {
            fields: {
                testField1: {
                    type: "constant-string",
                    config: {
                        text: "testValue"
                    }
                },
                testField2: {
                    type: "constant-string",
                    config: {
                        text: "testValue"
                    }
                }
            }
        }
    }
    
    const generator = getValueGenerator('list-of-schema', config);
    
    const value = generator.generate();
    ```
    
    !!! abstract "Output"

        ```
        [
            { testField1: 'testValue', testField2: 'testValue' },
            { testField1: 'testValue', testField2: 'testValue' },
            { testField1: 'testValue', testField2: 'testValue' }
        ]
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
                type: 'list-of-schema',
                config: {
                    n: 5,
                    schema: fieldSchema
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
        
    console.log(fabricator.generate());
    ```
    
    !!! abstract "Output"

        ```
        {
            nested: [
                { value: 'a' },
                { value: 'c' },
                { value: 'c' },
                { value: 'b' },
                { value: 'a' }
            ]
        }
        ```
