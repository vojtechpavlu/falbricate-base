# UUID Standards

UUID (Universally unique identifier) is a type of unique label used through various computer systems 
([see more](https://en.wikipedia.org/wiki/Universally_unique_identifier)).

These Standard Value Generators tries to support it in your Falsa to ease the whole process of generating falsum data.

!!! warning

    Keep in mind this implementation does not aim on secure randoms; some collisions might occur.


## `uuid` Standard

This is a basic Standard Value Generator providing a service of generating UUIDs. In this case, it generates them 
built of lowercase hexadecimal characters (for uppercase version, use [`UUID` Standard](#uuid-standard-1)).


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const generator = new UUIDGenerator();
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        'fd1e9650-d9bc-43c9-3cf1-9b39449908a6'
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const generator = getStandard('uuid');
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        'fd1e9650-d9bc-43c9-3cf1-9b39449908a6'
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: 'uuid'
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'fd1e9650-d9bc-43c9-3cf1-9b39449908a6' }
        ```


## `UUID` Standard

This Standard Value Generator generates UUIDs - similarly as 
[`uuid` Standard](#uuid-standard), however the generated value is built
of uppercase hexadecimal values.


### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const generator = new UUIDGenerator({ uppercase: true });
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        '9364B9C8-4A89-429C-B224-C185DABC5619'
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const generator = getStandard('UUID');
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        '9364B9C8-4A89-429C-B224-C185DABC5619'
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: 'UUID'
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: '9364B9C8-4A89-429C-B224-C185DABC5619' }
        ```