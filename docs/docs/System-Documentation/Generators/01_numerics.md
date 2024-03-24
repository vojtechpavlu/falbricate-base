# Number generators

Here is a list of predefined generators for generating numeric values.


## Random Integer

Random integer generator returns a number in a specified range.

Configuration fields are `min` and `max`, while `min` is optional; when not provided, the
default minimum value will be used (`0`).

Throws an error when `min` > `max` or when `max` is not provided.

### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: IntegerGeneratorConfig = {
        min: 13,
        max: 77
    }
    
    const generator = new IntegerGenerator(config);
    
    console.log(generator.get());
    ```
    
    !!! abstract "Output"

        ``` json
        39
        ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: IntegerGeneratorConfig = {
        min: 13,
        max: 77
    }
    
    const generator = getValueGenerator('range-integer', config);
    
    const value = generator.get({});
    ```
    
    !!! abstract "Output"

        ``` json
        39
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'range-integer',
                config: {
                    min: 13,
                    max: 77
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
        
    console.log(fabricator.generate());
    ```
    
    !!! abstract "Output"

        ``` json
        { value: 39 }
        ```


## Random Float

Random float generator returns a number in a specified range with stripping the number
of decimal digits to specified number. Of course, this is a maximum number of digits,
in the most extreme situation, it might end up with returning an integer - when all the
decimal digits are zeros.

Configuration fields are `min`, `max` and `decimalDigits`. Fields `min` and `decimalDigits` are optional:

- when `min` not provided, it uses `min: 0`.
- when `decimalDigits` not provided, it uses `decimalDigits: 2`.

It throws an error when `min` > `max`, when `max` is not provided or
when the `decimalDigits` is negative.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: FloatGeneratorConfig = {
        min: 13,
        max: 77,
        decimalDigits: 7
    }
    
    const generator = new FloatGenerator(config);
    
    console.log(generator.get());
    ```
    
    !!! abstract "Output"

        ``` json
        67.4635403
        ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: FloatGeneratorConfig = {
        min: 13,
        max: 77,
        decimalDigits: 7
    }
    
    const generator = getValueGenerator('range-float', config);
    
    console.log(generator.get({}));
    ```
    
    !!! abstract "Output"

        ``` json
        67.4635403
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'range-float',
                config: {
                    min: 13,
                    max: 77,
                    decimalDigits: 7
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
    
    console.log(fabricator.generate());
    ```
    
    !!! abstract "Output"

        ``` json
        { value: 67.4635403 }
        ```


## Constant Number

This generator simply returns a given number.

Configuration requires to have a field `num` of type number; otherwise it throws an error.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ConstantNumberConfig = {
        num: 13
    }
    
    const generator = new ConstantNumberGenerator(config);
    
    console.log(generator.get());
    ```
    
    !!! abstract "Output"

        ``` json
        13
        ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: ConstantNumberConfig = {
        num: 13
    }
    
    const generator = getValueGenerator('constant-number', config);
    
    console.log(generator.get({}));
    ```
    
    !!! abstract "Output"

        ``` json
        13
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'constant-number',
                config: {
                    num: 13
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
    
    console.log(fabricator.generate());
    ```
    
    !!! abstract "Output"

        ``` json
        { value: 13 }
        ```
