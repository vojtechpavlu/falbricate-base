# Contextuals

Here is a list of predefined generators retrieving values from 
[Fabrication Context](../Building-Blocks/05_context.md).


## Context Accessor

Returns a value from the received context. The value is reached by the given 
path the value shall be at.


=== "Configuration Declaration"
    
    The configuration is a bit more complex for this type of generator. Its declaration
    looks like this:
    
    ``` typescript linenums="1"
    export type ContextAccessorConfig = {
      path: string;
      sep?: PathSeparator;
      handleError?: boolean;
      useErrorValue?: any;
    } & ValueGeneratorConfig;
    ```


=== "Configuration Example"

    This configuration tries to access the data provided externally
    by the client, while accessing object `person` and taking the property
    `email`. When for example you forget to provide the person, it won't struggle
    with accessing proeprties of `undefined`, it simply returns `undefined` without error.

    ``` typescript linenums="1"
    const config: ContextAccessorConfig = {
      path: "person/email";
      sep: "/";
      handleError: true;
      useErrorValue: undefined;
    };
    ```

- `path` represents the path in the given fabrication context (like `data.myContext.myValue`)

- `sep` represents separator to be used on path; by default it's a dot (`.`); supported
  values are `.`, `/`, `#` and `$`

- `handleError` tells the accessor that if there is no value on the path or it comes into another
  issue, if it should try to handle or should fail in the first place. By default, it lets the error
  to be thrown. Otherwise, it uses *null-like* value specified in `useErrorValue`

- `useErrorValue` value to be used when an error occurs (the recommended option is using `undefined`)


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: ContextAccessorConfig = {
        path: 'input.value',
        sep: '.'
    }
    
    const generator = new ContextAccessor(config);

    const context: FabricationContext = {
        input: {
            value: "Value given from outside"
        }
    }

    console.log(generator.get(context));
    ```
    
    !!! abstract "Output"

        ```
        Value given from outside
        ```


=== "Declarative access"

    ``` typescript linenums="1"
    const config: ContextAccessorConfig = {
        path: 'input.value',
        sep: '.'
    }
    
    const generator = getValueGenerator('context-input', config);
    
    const context: FabricationContext = {
        input: {
            value: "Value given from outside"
        }
    }

    console.log(generator.get(context));
    ```
    
    !!! abstract "Output"

        ```
        Value given from outside
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'context-input',
                config: {
                    path: 'input.value',
                    sep: '.'
                }
            }
        }
    }
    
    const fabricator = new Fabricator(schema);
    
    const context: FabricationContext = {
        input: {
            value: "Value given from outside"
        }
    }
    
    console.log(fabricator.generate(context));
    ```
    
    !!! abstract "Output"

        ```
        { value: 'Value given from outside' }
        ```
