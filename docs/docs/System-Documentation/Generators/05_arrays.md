# Array generators

Here is a list of predefined generators for generating array values.


## Array Picker

Returns a value by randomly selecting an item from the specified array 
in the configuration.

The `array` field can be an array of any type; the only restriction is
it needs to be at least one item long.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ArrayPickerConfig = {
        array: ['a', 'b', 'c', 'd']
    }
    
    const generator = new ArrayPicker(config);
    
    const value = generator.get();
    ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: ArrayPickerConfig = {
        array: ['a', 'b', 'c', 'd']
    }
    
    const generator = getValueGenerator('array-picker', config);
    
    const value = generator.get({});
    ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'array-picker',
                config: {
                    array: ['a', 'b', 'c', 'd']
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
        
    console.log(fabricator.generate());
    ```


## Constant Array

This generator simply returns an array specified in the configuration.

The `array` property can consist of any instance types. It also can be empty,
but must be defined.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ConstantArrayConfig = {
        array: ['a', 'b', 'c', 'd']
    }
    
    const generator = new ConstantArrayGenerator(config);
    
    console.log(generator.get());
    ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: ConstantArrayConfig = {
        array: ['a', 'b', 'c', 'd']
    }
    
    const generator = getValueGenerator('constant-array', config);
    
    console.log(generator.get({}));
    ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'constant-array',
                config: {
                    array: ['a', 'b', 'c', 'd']
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
    
    console.log(fabricator.generate());
    ```


## Array Sample

This generator creates a deep copy of the specified array and returns
a shuffled sample of it.

It takes `array` field as a non-empty array of items of any type and 
the `sampleSize` which is any integer number greater than 0.

When these requirements are not met, it throws an error; so does when the
sample size is greater than the length of the given array.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ArraySampleConfig = {
        array: ['a', 'b', 'c', 'd'],
        sampleSize: 2
    }
    
    const generator = new ArraySampleGenerator(config);
    
    console.log(generator.get());
    ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: ArraySampleConfig = {
        array: ['a', 'b', 'c', 'd'],
        sampleSize: 2
    }
    
    const generator = getValueGenerator('array-sample', config);
    
    console.log(generator.get({}));
    ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'array-sample',
                config: {
                    array: ['a', 'b', 'c', 'd'],
                    sampleSize: 2
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
    
    console.log(fabricator.generate());
    ```
