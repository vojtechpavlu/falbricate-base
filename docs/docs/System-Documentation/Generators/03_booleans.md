# Boolean generators

Here is a list of predefined generators for generating boolean values.


## Probable boolean

Aims to generating boolean values considering a given probability. This specified
probability has a direct influence on if the generated value will be `true` or `false`.

The optional configuration field `probability` is expected to be a number in range of
`[0, 1]`, while the higher the value is, the more probable is that `true` will be generated.
When not provided at all, it uses `0.5` (probabilities for `true` and `false` are equal).


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: BooleanGeneratorConfig = {
        probability: 0.7
    }
    
    const generator = new ProbableBooleanGenerator(config);
    
    const value = generator.get();
    ```
    
    !!! abstract "Output"

        ``` json
        true
        ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: BooleanGeneratorConfig = {
        probability: 0.7
    }
    
    const generator = getValueGenerator('probable-boolean', config);
    
    const value = generator.get({});
    ```
    
    !!! abstract "Output"

        ``` json
        true
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'probable-boolean',
                config: {
                    probability: 0.7
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
        
    console.log(fabricator.generate());
    ```
    
    !!! abstract "Output"

        ``` json
        { value: true }
        ```
