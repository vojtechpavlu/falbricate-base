# Fabrication Context

Fabrication Context is a way to pass some additional information and further instructions
related to the falsum being currently fabricated.

Partially it's given by client, partially it's a context provided internally by the
[Fabricator](./04_fabricator.md).

## Contents of the Context

Context consists of multiple parts. First and the most important is the context the
client provides. The client can put as the context whatever he needs.

For example have a look at [Context Accessor](../Generators/07_contextuals.md#context-accessor).

But there are also items added to the context internally:

- `index` - number of generated item in the row (counting from 0). More important
  when using `Fabricator#generateMany(n, context)` method

- `current` - falsum being currently fabricated; useful when you need to access
  other properties to stay consistent within falsa

- `previous` - previously fabricated falsum; only populated when using
  `Fabricator#generateMany(n, context)` method

!!! warning "Context overriding"

    This two dimensions of the context (the client given and internally generated)
    are being merged giving the clinet the opportunity to alter the context as he wish
    and whenever he needs.

    **On the other hand, be careful when doing so - you can simply get into unexpected
    behaviour just by overriding some of these default context proeprties!**

!!! example "Example Context"

    This is how the context might look like when passed to the Value Generator for the
    `email` field _(when no client-given data are provided)_:

    ``` javascript
    {
        index: 37,
        previous: {
            id: 36,
            username: 'alexander-the-great',
            email: 'alexander@alexandria.io',
            skills: ['horse riding', 'going to India']
        },
        current: {
            id: 37,
            username: 'genghis-khan'
        }
    }
    ```

    !!! note

        Note the `current` is being build in at the time the `email` is in the process
        of generation; keep in mind the order of the fields generation may influence
        the generated Falsum - when there are dependencies in between the fields

    !!! note

        Note the `previous` property is available only when generating multiple of falsa
        at once (using `generateMany` method); similarly it's for the `index` (for `generate`
        it remains always `0`)
