# Introduction

Standards are basically preconfigured [Value Generators](../Generators/00_introduction.md). Since such Standard
Value Generators do not require any further configuration, their specification is much simpler.

To describe to the [Fabricator](../Building-Blocks/04_fabricator.md) you want to use a specific standard value
generator in your schema, you only need to attach the standard's name to the field.


!!! example

    ```typescript linenums="1"
    const schema: SchemaInput = {
        fields: {
            myStandardField: 'some-standard-name',
            myAnotherStandardField: 'some-another-standard-name',
            onceMoreStandardField: 'some-different-standard-name',

            // ... Some other desired fields ...
        },

        // ... Other configuration when desired ...
    };
    
    const fabricator = new Fabricator(config);
    
    console.log(fabricator.generate());
    ```

## Motivation

The main two benefits of using Standard Value Generators are:

- Much simpler definition of common value types - much easier to read the schema declaration
- Much less repetition when using the very same value types - when you do not want to repeat the very
  same field definition over many schemas - DRY Concept

But to be fully transparent, there is one disadvantage - you can't configure it anymore. For example,
when you want to use [Value Pipes](../Pipes/Value-Pipes/00_value-pipes.md), you'll need to either
define your own [Custom Standard](#custom-standards) or to use plain Value Generator.

## Structure

In most cases, the Standard Value Generator are really just preconfigured Value Generators with default settings
used in real world cases.

For example [UUID Standard](./01_uuid.md) is implemented as a preconfigured
[String Template Generator](../Generators/02_strings.md#string-template) following the basic rules defined for
UUIDs - how the result string should look like, what characters can it have at each position and so on.

## Custom Standards

To create a custom Standard Value Generator, you need to prepare your desired configuration and a Value Generator to
be sealed (can be a new one or an existing one).

!!! example

    This is just a simple generator always returning a value `'Hello World!'` - nothing useful but can show the basics.

    ```typescript linenums="1"
    class HelloWorldStandard extends ConstantValue {
      constructor(config: ValueGeneratorConfig) {
        super({ ...config, value: "Hello World!" });
      }
    }

    // This is technically the very same generator as any other.
    // Thus, feel free to use it in the very same manner as any other
    const generator = new HelloWorldStandard();
    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        'Hello World!'
        ```

### Custom Standard Registration

To register your Custom Standard into the Falbricate ecosystem, you need to provide a `StandardValueGeneratorBuilder`
function. This is basically a function defined like this:

```typescript
export type StandardValueGeneratorBuilder = () => StandardValueGenerator;
```

This means the builder function is just returning your Standard Value Generator on demand (on invocation). To
actually perform the registration, pick a unique name and store it like this:

```typescript
registerStandard('hello-world-standard', () => new HelloWorldStandard());
```

!!! warning "Unique Name"

    Keep in mind the name is expected to be unique. When does your selected name colide with any other currently used
    name, the function will throw an error on this attempt.

### Using Custom Standards

Then, you can use it as explained above:

```typescript linenums="1"
const schema: SchemaInput = {
  fields: {
    myStandardField: 'hello-world-standard',
  },
};

const fabricator = new Fabricator(schema);

console.log(fabricator.generate());
```

!!! abstract "Output"

    ```
    { myStandardField: 'Hello World!' }
    ```

### Full example

Now, to put it all together, it could look something like this:

```typescript linenums="1"
class HelloWorldStandard extends ConstantValue {
  constructor(config: ValueGeneratorConfig = {}) {
    super({ ...config, value: 'Hello World!' });
  }
}

registerStandard('hello-world-standard', () => new HelloWorldStandard());

const schema: SchemaInput = {
  fields: {
    myStandardField: 'hello-world-standard',
  },
};

const fabricator = new Fabricator(schema);

console.log(fabricator.generate());
```

!!! abstract "Output"

    ```
    { myStandardField: 'Hello World!' }
    ```
