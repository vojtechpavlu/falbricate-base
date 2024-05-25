# Value Generator

Value Generator provides a service to generate values the Falsum consists of. These generators are designed to be
able to generate a random (or for example to simply pass predefined value from context) and return it. This service is
used for generating a falsum by given schema.

Every Value Generator is of type `ValueGenerator<ValueType, Configuration>` _(internally predefined class)_.
The constructor takes the configuration of type `Configuration` _(which needs to be of type_ `ValueGeneratorConfig`_)_.
Then, the generator on its `get(context: GenerationContext)` method call returns a value of type `ValueType`.

For example how can you use the generator, have a look on [how to access the generator](#accessing-value-generators).


## Accessing Value Generators

Value generators are basically classes (or instances if you wish). It can be accessed as any other
class instance you know.

!!! example

    Accessing the generator as a class instance

    ``` typescript
    const generator = new IntegerGenerator({ max: 17 });
    const value = generator.generate();
    ```

But this is not the only way you can use these generators. The Falbricate ecosystem also enables you to
access these generators from internal registry of generators - accessing by generator name.

!!! tip

    It is highly recommended to refer to the Value Generators using their name, not to pass them directly.

!!! example

    Accessing to the generator using registry

    ``` typescript
    const generator = getValueGenerator('range-integer', { max: 17 });
    const value = generator.get({});
    ```

## Configuration

Every Value Generator needs to be configured during its initialization.
For this purpose, there's a mutual type defined looking like this:

```typescript
export interface ValueGeneratorConfig {
  /** Pipes to be used for modifying the generated value */
  pipes?: ValuePipe[];

  /** Description of how the nulls should be treated */
  nullability?: NullabilityConfiguration;
}
```

Each Value Generator Configuration consists of these two optional fields:

- `pipes` - Declares a list of Value Pipes for minor modifications of the generated value (
  more at [Introduction to Value Pipes](../Pipes/Value-Pipes/00_value-pipes.md))

- `nullability` - Declares how should be _null_-like values treated. It means whether the fields
  should or should not be empty values (more at [Nullability](../Nullability/00_nullability.md))

## Custom Value Generators

You can find yourself the predefined value generators do not meet your requirements. Feel free to define
your own Value Generators!

### Creating a custom generator

To create a Value Generator and to use it within the ecosystem, you need to follow simple rules:

1. The generator needs to extend an abstract and generic class `ValueGenerator<ValueType, Configuration>`
2. Your configuration must be a superset of the `ValueGeneratorConfig` type
3. _(Optional) if you want to register your value generator, you must follow [these instructions](#register-custom-value-generator)_

!!! example

    This example represents how you can create a random Star-rating value generator. The usecase
    of it is to generate a ratings like `n Stars`, while the `n` can be a number within a specified
    range; the expected result might look like `4 Stars` when given range `{ minStars: 1, maxStars: 5 }`.

    ``` typescript linenums="1"
        /** Configuration for the custom Value Generator extending the base config type */
        type RatingGeneratorConfig = {
          minStars: number,
          maxStars: number
        } & ValueGeneratorConfig;


        /** Custom generator providing the actual service of random value generation */
        class RatingGenerator extends ValueGenerator<string, RatingGeneratorConfig>{

          /** Constructor taking the configuration */
          constructor(config: RatingGeneratorConfig) {
            super(config)
          }

          /** Implementation of the actual generator */
          get = (): string => {
            const numberOfStars = randomInteger(this.config.minStars, this.config.maxStars);
            return `${numberOfStars} Stars`
          }
        }


        // Creating the instance of the Rating generator with specified configuration
        const ratingGenerator = new RatingGenerator({
          minStars: 1,
          maxStars: 5
        });

        // Do something with the value
        console.log(ratingGenerator.get())
    ```

### Register Custom Value Generator

When you create your Custom Value Generator, you'll probably want it to be registered in the
ecosystem _(it is recommended approach anyway)_. Then, you can easily access it via the name you choose to use.

!!! danger "Unique Naming"

    Keep in mind the name you choose must be unique and can't collide with any already existing!
    When it does, the registration will throw an Error.

!!! example

    ``` typescript linenums="1"
    // Registration of your custom Value Generator
    registerValueGenerator(
        'my-star-rating-generator',
        (config: RatingGeneratorConfig) => new RatingGenerator(config),
    );


    // Accessing your Value Generator in code
    const generator = getValueGenerator('my-star-rating-generator', {
        minStars: 1,
        maxStars: 10
    });
    ```
