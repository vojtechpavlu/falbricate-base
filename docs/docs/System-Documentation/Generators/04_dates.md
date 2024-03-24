# Date generators

Here are listed predefined date generators.

## Date in range

This generator generates dates withing the specified range.

### Configuration

Keep in mind the `DateTimeDeclaration` is a specific type to ease the
bounds definition in the configuration. Have a look on these examples:

=== "Date object"

    Declaring the date as number

    ``` typescript
    // Using a date object
    const declaration: DateTimeDeclaration = new Date();
    ```

=== "String-based date"

    ``` typescript
    // Using string-based declaration of date 
    const declaration1: DateTimeDeclaration = '1999-12-31';

    // Using string-based declaration of date and time without ms
    const declaration2: DateTimeDeclaration = '1999-12-31T11:25:31';

    // Using string-based declaration of date and time with ms
    const declaration3: DateTimeDeclaration = '1999-12-31T11:25:31.975';
    ```

=== "Number-based date (Timestamp)"

    ``` typescript
    // Using number-based declaration of date (1970-01-01 at midnight)
    const declaration1: DateTimeDeclaration = 0;

    // Using number-based declaration of date (2014-09-12 at 23:52:25)
    const declaration2: DateTimeDeclaration = 1413157945123;

    // Using number-based declaration of date (1925-03-22 at 00:07:35)
    const declaration2: DateTimeDeclaration = -1413157945123;
    ```


Here you can see how to define the whole configuration:

=== "Configuration definition"

    ``` typescript
    export type DateTimeInRangeGeneratorConfig = {
      from: DateTimeDeclaration;
      to: DateTimeDeclaration;
    } & ValueGeneratorConfig;
    ```

=== "Configuration example"

    ``` typescript
    const config: DateTimeInRangeGeneratorConfig = {
      from: '1999-12-31T11:25:31.975',
      to: 1413157945123
    };
    ```


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: DateTimeInRangeGeneratorConfig = {
      from: '1999-12-31T11:25:31.975',
      to: 1413157945123
    };
    
    const generator = new DateTimeInRangeGenerator(config);
    
    console.log(generator.get());
    ```
    
    !!! abstract "Output"

        ```
        2006-01-17T09:42:39.858Z
        ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: DateTimeInRangeGeneratorConfig = {
      from: '1999-12-31T11:25:31.975',
      to: 1413157945123
    };
    
    const generator = getValueGenerator('range-date-time', config);
    
    const value = generator.get({});
    ```
    
    !!! abstract "Output"

        ```
        2006-01-17T09:42:39.858Z
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'range-date-time',
                config: {
                  from: '1999-12-31T11:25:31.975',
                  to: 1413157945123
                }
            }
        }
    }
        
    const fabricator = new Fabricator(schema);
        
    console.log(fabricator.generate());
    ```
    
    !!! abstract "Output"

        ```
        { value: 2006-01-17T09:42:39.858Z }
        ```
