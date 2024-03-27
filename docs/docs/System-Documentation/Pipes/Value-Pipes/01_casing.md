# Casing Value Pipes

These pipes are used to change the casing of the characters.

!!! note

    These pipes are only applicable on string inputs

## Uppercase Value Pipe

This Value Pipe sets all the characters in the given value to uppercase.

=== "Plain example"

    ``` typescript linenums="1"
    const value = 'mY sTrInG';

    const pipe = getValuePipe('uppercase');

    console.log(pipe(value))
    ```

    !!! abstract "Output"

        ```
        'MY STRING'
        ```

=== "Example with Value Generator"

    ``` typescript linenums="1"
    const generator = getValueGenerator('constant-string', {
        text: 'mY sTrInG',
        pipes: [
            'uppercase'
        ]
    });

    console.log(generator.generate())
    ```

    !!! abstract "Output"

        ```
        'MY STRING'
        ```

    !!! tip

        This example uses [Constant String Generator](../../Generators/02_strings.md#constant-string).
        You may want to check it out :wink:

## Lowercase Value Pipe

This Value Pipe sets all the characters in the given value to lowercase.

=== "Plain example"

    ``` typescript linenums="1"
    const value = 'mY sTrInG';

    const pipe = getValuePipe('lowercase');

    console.log(pipe(value))
    ```

    !!! abstract "Output"

        ```
        'my string'
        ```

=== "Example with Value Generator"

    ``` typescript linenums="1"
    const generator = getValueGenerator('constant-string', {
        text: 'mY sTrInG',
        pipes: [
            'lowercase'
        ]
    });

    console.log(generator.generate())
    ```

    !!! abstract "Output"

        ```
        'my string'
        ```

    !!! tip

        This example uses [Constant String Generator](../../Generators/02_strings.md#constant-string).
        You may want to check it out :wink:
