# Sorting

These pipes are used to sort the given value.

!!! note

    These pipes are only applicable on array or string inputs

## Sort Ascending

This value pipe orders the given value in ascending order.

=== "Plain example"

    ``` typescript linenums="1"
    const value = ['b', 'x', 'a', 'm'];

    const pipe = getValuePipe('sort-ascending');

    console.log(pipe(value))
    ```

    !!! abstract "Output"

        ```
        [ 'a', 'b', 'm', 'x' ]
        ```

=== "Example with Value Generator"

    ``` typescript linenums="1"
    const generator = getValueGenerator('constant-value', {
        value: ['b', 'x', 'a', 'm'],
        pipes: [
            'sort-ascending'
        ]
    });

    console.log(generator.generate())
    ```

    !!! abstract "Output"

        ```
        [ 'a', 'b', 'm', 'x' ]
        ```

    !!! tip

        This example uses [Constant Value Generator](../../Generators/08_constants.md).
        You may want to check it out :wink:

## Sort Descending

This value pipe orders the given value in descending order.

=== "Plain example"

    ``` typescript linenums="1"
    const value = ['b', 'x', 'a', 'm'];

    const pipe = getValuePipe('sort-descending');

    console.log(pipe(value))
    ```

    !!! abstract "Output"

        ```
        [ 'x', 'm', 'b', 'a' ]
        ```

=== "Example with Value Generator"

    ``` typescript linenums="1"
    const generator = getValueGenerator('constant-value', {
        value: ['b', 'x', 'a', 'm'],
        pipes: [
            'sort-descending'
        ]
    });

    console.log(generator.generate())
    ```

    !!! abstract "Output"

        ```
        [ 'x', 'm', 'b', 'a' ]
        ```

    !!! tip

        This example uses [Constant Value Generator](../../Generators/08_constants.md).
        You may want to check it out :wink:
