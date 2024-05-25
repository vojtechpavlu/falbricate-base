# Timestamps

Timestamps Standard Value Generators are simple generators providing a service of generating
time-points in the past or in the future. You only need to specify the time range.

And since this is an approach that might be very common and tends to be very repetetive,
there's a set of standards you can use.

## Names

Naming convention for prepared ones is as follows:

```
<<type>>-<<direction>>-<<period-length>><<time-unit>>
```

where:

- `<<type>>` describes the type of the output value - if it should be a timestamp (number) or
  a date. Available values are `timestamp` or `date`
- `<<direction>>` declares the direction in which the generated value shall be - in the future
  or in the past. Available values are `past` and `future`
- `<<period-lenght>>` defines up to how long should be the timestamp from the current moment
- `<<unit>>` defines which unit shall be used; strongly related to the `<<period-lenght>>`.
  Available values are:

  - `s` for seconds
  - `m` for minutes
  - `h` for hours
  - `d` for days
  - `M` for months
  - `y` for years

For example, you could use `'timestamp-past-15m'` which describes a generator
returning a number representing a timestamp in past 15 minutes.

There are also predefined time windows for past and future that have a time indent
from the current moment.

This follows this naming pattern:

```
<<type>>-<<unit>>-<<direction>>
```

where:

- `<<type>>` describes the type of the output value - if it should be a timestamp (number) or
  a date. Available values are `timestamp` or `date`
- `<<unit>>` describes the unit used; available values are `minute`, `hour`, `day`, `week`, `month`,
  `year`, `decade` and `century`
- `<<direction>>` declares the direction in which the generated value shall be - in the future
  or in the past. Available values are `before` and `after`

So, for example, you could define your field to have a timestamp from past in range
of 14 days before now but also up to 7 days before by using this generator
`timestamp-week-before`.

## Timestamp Standards

Standards of this type are generating a timestamp represented by a number (UNIX timestamp).

### Examples

=== "Declarative access"

    ```typescript linenums="1"
    const generator = getStandard('timestamp-past-12h');
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        1711865758409
        ```

=== "Schema access"

    ```typescript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: 'timestamp-past-12h'
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 1711865758409 }
        ```

## Date Standards

Similarly to [Timestamp Standards](#timestamp-standards), these generate a date based
on the time-range specification. The difference is that the result value is a date.

### Examples

=== "Declarative access"

    ``` typescript linenums="1"
    const generator = getStandard('date-past-12h');
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        2024-03-31T06:15:58.409Z
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: 'date-past-12h'
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 2024-03-31T06:15:58.409Z }
        ```
