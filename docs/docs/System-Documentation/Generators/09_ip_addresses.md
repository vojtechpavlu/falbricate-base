# IP Address Generator

This generator is responsible for generating random IP Address (v4) in a given range per each octet.

## Configuration

!!! example

```typescript linenums="1"
const config: IPAddressConfig = {
  octet1: { min: 10, max: 12 },
  octet2: { min: 1, max: 32 },
  octet3: { min: 1, max: 254 },
  octet4: { min: 1, max: 254 },
};
```

## Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: IPAddressConfig = {
        octet1: { min: 10, max: 12 },
        octet2: { min: 1, max: 32 },
        octet3: { min: 1, max: 254 },
        octet4: { min: 1, max: 254 }
    }

    const generator = new IPAddressValueGenerator(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        '12.16.131.227'
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: IPAddressConfig = {
        octet1: { min: 10, max: 12 },
        octet2: { min: 1, max: 32 },
        octet3: { min: 1, max: 254 },
        octet4: { min: 1, max: 254 }
    }

    const generator = getValueGenerator('ip-address', config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        '12.16.131.227'
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'ip-address',
                config: {
                    octet1: { min: 10, max: 12 },
                    octet2: { min: 1, max: 32 },
                    octet3: { min: 1, max: 254 },
                    octet4: { min: 1, max: 254 }
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: '12.16.131.227' }
        ```
