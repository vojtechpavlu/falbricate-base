# Introduction

Falsum Pipes are Pipes transforming the generated falsum into another form.

They usually have an influence on the whole falsum object and are populating
these changes in depth (possibly nested fields).

## What really Falsum Pipes are

Falsum Pipe is technically a function taking the given Falsum (as an object)
and truning it into another object (usually Object, but can be used for object
or array reductions).

In the two following examples, you can see what Falsum Pipe might look like.
At both of them, you can see they can be very simple but very powerful.

=== "Plain example"

    ```typescript linenums="1"
    // Let's imagine this is a result of the fabrication
    const falsum: Falsum = {
      username: 'my-test-username',
      email: 'email@example.com'
    }

    // Define your Falsum Pipe
    const falsumPipe = (value: any) => JSON.stringify(value);

    console.log(falsumPipe(falsum));
    ```

    !!! abstract "Output"

        ```
        '{"username":"my-test-username","email":"email@example.com"}'
        ```

=== "Example with Falbricate"

    ```typescript linenums="1"
    // Let's imagine this is a result of the fabrication
    const falsum: Falsum = {
      username: 'my-test-username',
      email: 'email@example.com'
    }

    // Find the Falsum Pipe by name
    const falsumPipe = getFalsumPipe('stringify');

    console.log(falsumPipe(falsum));
    ```

    !!! abstract "Output"

        ```
        '{"username":"my-test-username","email":"email@example.com"}'
        ```

## How to use Falsum Pipes

Falsum Pipes are meant to be used as a part of the [Schema Input](../../Building-Blocks/02_schema-input.md),
alongside with the fields declaration. The existence of an array containing these Falsum Pipes makes
the [Fabricator](../../Building-Blocks/04_fabricator.md) to pipe the generated falsum through - just
before it's returned as fabrication result.

!!! example "Schema Input with Pipes"

    ``` typescript linenums="1"
    const schema: SchemaInput = {
        fields: {
            // Fields declaration in here
        },
        pipes: [
            // Falsum Pipes declaration
        ],
    }
    ```

!!! note

    Falsum Pipes declaration in the Schema Input is optional; when not provided, the Fabricator
    just returns what was generated - without any modifications.

    However, when specified, keep in mind it needs to be an `array`.

As seen above, there is an internal registry for Falsum Pipes, so you can easily access
them by providing the name. You can also pass a function as a Falsum Pipe (more in
[Custom Falsum Pipes](#custom-falsum-pipes)).

Keeping this design in mind, you can use it to modify the whole result Falsum
(just before it's returned) as you wish. Have a look at the following example:

!!! example "Example of Schema Input with Falsum Pipes"

    ``` typescript linenums="1"
    const schema: SchemaInput = {
      fields: {
        randomUsername: {
            type: 'string-of-length',
            config: {
                length: 13,
                charset: 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
            }
        },
        randomLanguages: {
          type: 'array-sample',
          config: {
            array: ['JS/TS', 'Java', 'Python', 'C/C++', 'R', 'Rust'],
            sampleSize: 3
          }
        }
      },
      pipes: [
        'snake-case-props',     // Turns all property names from camelCase -> snake_case
        'stringify'             // Turns the whole Falsum into stringified form
      ]
    }

    const fabricator = new Fabricator(schema);

    // Result: '{"random_username":"36l4rvo66rsia","random_languages":["Java","Python","R"]}'
    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        '{"random_username":"l8wx3ml6k7wp3","random_languages":["C/C++","Java","Python"]}'
        ```

!!! warning "Order matters!"

    Order in which you declare the Falsum Pipes in the schema matters - result of the
    first one is being passed to the second one. Result from the second one is piped
    to the third one and so on....

    **So - if you put them in wrong order, you might get in trouble very soon!**

## Custom Falsum Pipes

You might find yourself in situation when you can't find any Falsum Pipe you would use.
In this case, feel free to define your own.

### Single-purpose Falsum Pipe

For some small single-purpose tasks, the easiest way might be to declare the pipe simply
as a function and pass it to the schema.

!!! example "Single-purpose Falsum Pipe"

    ``` typescript linenums="1"
    const schema: SchemaInput = {
      fields: {
        randomUsername: {
            type: 'string-of-length',
            config: {
                length: 13,
                charset: 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
            }
        },
        randomLanguages: {
          type: 'array-sample',
          config: {
            array: ['JS/TS', 'Java', 'Python', 'C/C++', 'R', 'Rust'],
            sampleSize: 3
          }
        }
      },
      pipes: [
        (falsum: any) => JSON.stringify(falsum)
      ]
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

### Registration of Custom Falsum Pipes

For some repetetive tasks or when the pipe might be used more commonly, its better
to register it into internal registry of Falsum Pipes.

!!! example "Registration of Custom Falsum Pipe"

    ``` typescript linenums="1"
    // Implement the Falsum Pipe
    const myCustomFalsumPipe = (falsum: any) => {

        // ...change something with the falsum...

        return falsum
    }

    // Register the Falsum Pipe
    storeFalsumPipe('my-custom-falsum-pipe', myCustomFalsumPipe);
    ```

!!! danger "Unique names"

    Keep in mind the names needs to be unique - when there is one pipe
    with such name registered, it will throw an Error when trying to store!

!!! tip "Naming conventions"
It doesn't matter what name do you use. As long as it's a string. But
it's a best practice to avoid using whitespaces or special characters.
Shouldn't stop working if you do, though...

Now, when you have your custom pipe registered, you can use it in your schema
by just referring to it by previously given name:

!!! example "Using custom pipes"

    ``` typescript linenums="1"
    const schema: SchemaInput = {
      fields: {
        randomUsername: {
            type: 'string-of-length',
            config: {
                length: 13,
                charset: 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
            }
        },
        randomLanguages: {
          type: 'array-sample',
          config: {
            array: ['JS/TS', 'Java', 'Python', 'C/C++', 'R', 'Rust'],
            sampleSize: 3
          }
        }
      },
      pipes: [
        'my-custom-falsum-pipe'
      ]
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```
