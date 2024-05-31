# Value Generators

Value Generators are one of the key components of the whole ecosystem. These units are responsible for
generating values by the specified configuration - whether it's a random number within a given range or
a list of complex nested objects.

There are already many generators predefined and ready to use in the base framework - like for
numbers, dates, strings, arrays, objects and many more.


## Usage

The recommended usage of Value Generators is within a static [Schema Input](../Building-Blocks/02_schema-input.md),
where you can declare such value.

!!! example

    In here you can see a usage of [Random Integer](./01_numerics.md#examples) generator.

    ```javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            randomRating: {
                type: 'range-integer',
                config: {
                    min: 1,
                    max: 5
                }
            }
        }
    }
    
    const fabricator = new Fabricator(schema);
    
    console.log(fabricator.generate());
    ```

    !!! abstract "Output"
        
        ```
        { randomRating: 4 }
        ```

Anyway, you can use the generator as a standalone class by directly invoking the
constructor or by requesting the generator by name. To show you all the alternatives,
for each generator, there are always all this three example usages shown.


## Value Pipes

Another features related to the value generators are [Value Pipes](../Pipes/Value-Pipes/00_value-pipes.md)
used to manipulate the generated value to meet the required format.

There are a set of predefined pipes you can use and you can use, you can also easily
define and register your own when the predefined ones do not satisfy you fully.



## Custom Value Generators

There are many reasons why to prepare your own generator, but usually it's because
the value generation process might be too complex and too specific to achieve
the desired values by your implementation rather than making hard-to-read schema.


### Custom configuration

First thing to consider is to have prepared possible configuration for such
generator. This configuration must extend the specified parent declaration looking
like this:

```typescript
interface ValueGeneratorConfig {
  /** Pipes to be used for modifying the generated value */
  pipes?: (ValuePipe | string)[];

  /** Description of how the nulls should be treated */
  nullability?: NullabilityConfiguration;
}
```


### Defining Value Generator

Every value generator is basically an object with the basic method 
`get<R extends GeneratedValue>(context: FabricationContext) -> R`.

In other words, it generates a value of a specified type and optionally 
can process a [given context](../Building-Blocks/05_context.md). No big deal.

When you decide to use your custom configuration, you also should define your own
constructor passing your configuration to the super class. It's the best practice 
to validate the given values to match rules of your generation logic, or to define
the assumed default configuration values.


### Register the Value generator

After you successfully pass through these steps, you can register your generator
into the Falbricate ecosystem and use it in the declarative (schematic) manner.

Note the name must be unique within all the other Value Generators.


### Example

To show the whole example, let's have a look at Ratings generator.

!!! example

    ```typescript linenums="1"
    /** 
     * Configuration declaration for string-based ratings with unit
     */
    export type CustomRatingsGeneratorConfig = {
      includeZero: boolean;
      rateUnitSingular?: string;
      rateUnitPlural?: string;
      max: number;
    } & ValueGeneratorConfig;
    
    
    /** 
     * Value Generator class declaration generating 
     * a string-based rating with unit
     */
    export class CustomRatingGeneratorConfig extends ValueGenerator<
      string,
      CustomRatingsGeneratorConfig
    > {
    
      private readonly generator: IntegerGenerator;
    
      constructor(config: CustomRatingsGeneratorConfig) {
    
        // When any of these is empty, use default stars rating
        if (!config.rateUnitSingular || !config.rateUnitPlural) {
          config.rateUnitSingular = 'star';
          config.rateUnitPlural = 'stars';
        }
    
        // When the max limit is not defined, throw an error
        if (!config.max) {
          throw new Error(`Property 'max' is required'`);
        }
    
        // Other checks you might find reasonable here...
    
        // Build-up the parent object
        super(config);
    
        // Prepare a random number generator to make your life easier
        this.generator = new IntegerGenerator({
          min: config.includeZero ? 0 : 1,
          max: config.max
        });
      };
    
      
      /** 
       * Simple method deciding whether to use singular or plural 
       */
      protected get = (): GeneratedValue => {
        const rating: number = this.generator.generate();
    
        // When the generated rating is zero
        if (rating === 0) {
          return `0 ${this.config.rateUnitPlural}`;
        }
    
        // When the generated rating is equal to 1
        if (rating === 1) {
          return `1 ${this.config.rateUnitSingular}`;
        }
    
        // Else (greater than 1)
        return `${rating} ${this.config.rateUnitPlural}`;
      };
    }
    ```

Now, you can register this Value Generator into the ecosystem.

!!! example

    ```typescript linenums="1"
    registerValueGenerator(
      'my-custom-rating-generator',
      (config: CustomRatingsGeneratorConfig) => new CustomRatingGeneratorConfig(config),
    )
    ```

And the last step is to show how can this be used now!

!!! example

    ```typescript linenums="1"
    const schema: SchemaInput = {
        fields: {
            starRatingWithZero: {
                type: 'my-custom-rating-generator',
                config: {
                    includeZero: true,
                    max: 5,
                }
            },
            heartRatingWithoutZero: {
                type: 'my-custom-rating-generator',
                config: {
                    includeZero: false,
                    rateUnitSingular: 'heart',
                    rateUnitPlural: 'hearts',
                    max: 10
                }
            },
            uppercasedStars: {
                type: 'my-custom-rating-generator',
                config: {
                    includeZero: true,
                    max: 5,
                    
                    // Here we can use a Value Pipe to uppercase the result
                    pipes: ['uppercase']
                }
            }
        }
    };
    
    const fabricator = new Fabricator(schema);
    
    console.log(fabricator.generate());
    ```

    !!! output
    
        ```typescript
        {
            starRatingWithZero: '0 stars',
            heartRatingWithoutZero: '6 hearts',
            uppercasedStars: '2 STARS'
        }
        ```