# Introduction

Profiles are predefined [Fabricators](../Building-Blocks/04_fabricator.md)
used to pre-generate common fields to use it in the simplest possible manner.

These prepared data objects are meant to be accessible through a context object
provided to each Falsum Fabrication run. So, you can easily access them
using context accessors without needing to declare these on your own.

These are also meant to share pre-generated values for the falsum to remain
internally consistent; _e.g._ person born in Germany will probably have german
nationality, probably will have a telephone number starting with `+49` local prefix,
main language will be german and first name will most likely be Hans.


## Schema Declaration

To declare that you want to have access to a profile, you need to provide
the profile's name into a [Schema input](../Building-Blocks/02_schema-input.md)
like this:

```typescript linenums="1"
const schemaInput: SchemaInput = {
  // Declaration of profiles you want to use
  profiles: ['identifiers'],

  fields: {
    // Field using the profile via the provided context
    id: {
      type: 'context-input',
      config: {
        path: 'profiles.identifiers.uuid',
      },
    },

    // ... other fields ...
  },
};

const fabricator = new Fabricator(schemaInput);

console.log(fabricator.generate());
```

!!! abstract "Output"

    ```
    { id: '5c3c2dc9-905b-4005-4059-40ff821cd2cc' }
    ```

!!! tip

    In this example, you can see a basic usage of [Identifiers](./01_identifiers.md) 
    profile for generating an object ID. Check it out!

As you can see, the profile data are generated and passed into the
Fabrication Context object into `profiles` property; the actual
profile object (with its contents) you requested is then accessible
under its name.
