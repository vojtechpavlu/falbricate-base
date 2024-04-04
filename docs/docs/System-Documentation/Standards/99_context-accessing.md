# Context Accessing Shortcut

To simplify the context accessing and its definition, there's a shortcut notation defined.
This type of declaration was chosen to enable simplicity of the schema definition based on
more dynamic schema compilation approach.

Instead of somewhat statically typed names of standards, this approach lets you pass configuration
as a part of the name to your Field declaration.

This notation is based on two parts - `!ref-<<path>>`, where the `<<path>>` is the path in the
given context object using dots (`.`) as separators.

!!! example

    In this example, you can see how you can access the desired value by specifying the path through the
    Fabrication Context object.

    ```
    const context = {
        myField: {
            myValue: 'some-value'
        }
    };

    const valueGenerator = getStandard('!ref-myField.myValue');

    const generatedValue = valueGenerator.generate(context);
    ```

    !!! abstract "Output"

        ```
        'some-value'
        ```

Here's a full demonstration of how the shortcut can be used:

!!! example

    You can declare your schema with usage of identifiers [profile](../Profiles/00_introduction.md).
    This profile passes pregenerated values into a context object accessible to each value generator,
    so you can easily access it.

    You can also specify other fields; in this case `addressId` field - to take a value from given
    context object passed during the fabrication. This can be useful for example when you are generating
    instances of multiple entities linked by foreign keys.

    ```typescript linenums="1"
    // Declare your schema
    const schema: SchemaInput = {
      profiles: ['identifiers'],
      fields: {
        userId: '!ref-profiles.identifiers.uuid',
        addressId: '!ref-addressId',

        // ... another fields ...
      }
    };

    // Create a Fabricator instance
    const fabricator = new Fabricator(schema);

    // Generate a Falsum object with specified context
    const generated: Falsum = fabricator.generate({
      addressId: 123456
    });

    console.log(generated);
    ```

    !!! abstract "Output"

        ```
        { userId: 'f85d6bc3-1391-488b-90ad-8a114d1be5be', addressId: 123456 }
        ```
