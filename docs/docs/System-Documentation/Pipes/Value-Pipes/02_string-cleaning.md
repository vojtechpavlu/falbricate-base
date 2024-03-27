# String Cleanup

These pipes are used to cleanup the given string values.

!!! note

    These pipes are only applicable on string inputs

## Trim Value Pipe

This value pipe removes all the leading and trailing whitespaces in
the given string.

=== "Plain example"

    ``` typescript linenums="1"
    const value = '  my string\t\n';

    const pipe = getValuePipe('trim');

    console.log(pipe(value))
    ```

    !!! abstract "Output"

        ```
        'my string'
        ```

=== "Example with Value Generator"

    ``` typescript linenums="1"
    const generator = getValueGenerator('constant-string', {
        text: '  my string\t\n',
        pipes: [
            'trim'
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

## Single Space Value Pipe

This Value Pipe removes multiple spaces and turns them into a single one.

=== "Plain example"

    ``` typescript linenums="1"
    const value = 'my  string    with spaces';

    const pipe = getValuePipe('single-space');

    console.log(pipe(value))
    ```

    !!! abstract "Output"

        ```
        'my string with spaces'
        ```

=== "Example with Value Generator"

    ``` typescript linenums="1"
    const generator = getValueGenerator('constant-string', {
        text: 'my  string    with spaces',
        pipes: [
            'single-space'
        ]
    });

    console.log(generator.generate())
    ```

    !!! abstract "Output"

        ```
        'my string with spaces'
        ```

    !!! tip

        This example uses [Constant String Generator](../../Generators/02_strings.md#constant-string).
        You may want to check it out :wink:
