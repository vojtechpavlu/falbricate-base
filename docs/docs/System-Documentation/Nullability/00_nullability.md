# Nullability Configuration

Nullability is a feature for enabling to specify to the Value Generator to include _null-like_ values instead
of the specified ones - on demand. Sometimes it's useful.

## Configuration

The configuration is based on description of how often should the _null-like_ value occur in the
generated dataset and what actual _null-like_ value should be used.

```typescript linenums="1"
const nullabilityConfiguration: NullabilityConfiguration = {
    probability: 0.73,
    nullValue: undefined
}
```

This configuration describes the used Value Generator should generate 73% of values and
the rest 27% to be `undefined`. The `probability` has to be in a range `[0, 1]` - otherwise it throws an error. The `nullValue` should
be `null` or `undefined`.

### How to use Nullability

This is an example how you can implement the nullability into your Schemas.

=== "Using with Value Generator"

    ``` typescript linenums="1"
    const config: ConstantValueConfig = {
        value: "my constant value",
        nullability: {
            probability: 0.5,
            nullValue: undefined
        }
    };

    const generator = getValueGenerator('constant-value', config);

    for (let i = 0; i < 10; i++) {
        console.log(generator.generate());
    }
    ```

    !!! abstract "Output"

        ``` linenums="1"
        undefined
        undefined
        undefined
        'my constant value'
        undefined
        'my constant value'
        undefined
        'my constant value'
        'my constant value'
        'my constant value'
        ```

This configuration is optional. When you do not provide it, the generated values won't include
any specified not-null values.
