# Identifiers

Identifiers are one of the most basic metadata properties of data. Instead of
generating them on your own, you can use a predefined profile `identifiers`.

## Example Usage

At the following example you can see how could this profile:

```typescript linenums="1"
const schemaInput: SchemaInput = {
  // Declaration of profiles you want to use
  profiles: ['identifiers'],

  fields: {
    // Field being scraped from a context using the reference notation
    uuid: '!ref-profiles.identifiers.uuid'

    // ... other fields ...
  },
};

const fabricator = new Fabricator(schemaInput);

console.log(fabricator.generate());
```

!!! abstract "Output"

    ```
    { uuid: '5c3c2dc9-905b-4005-4059-40ff821cd2cc' }
    ```


## Contents

There are more various identifiers than just uuid:

- `rowNumber` - Number of the generated instance in a sequence 
  (only when using `generateMany(n)` method)
- `randH` - Random number within hundreds (from interval [100 - 999])
- `randT` - Random number within thousands (from interval [1,000 - 9,999])
- `randM` - Random number within millions (from interval [1,000,000 - 9,999,999])
- `uuid` - UUID (Universally Unique Identifier) in lowercase characters; 
  otherwise the value is the same as in `UUID` property 
- `UUID` - UUID (Universally Unique Identifier) in uppercase characters;
  otherwise the value is the same as in `uuid` property


## Example

Here's an example of how does the `identifiers` profile behave:

```typescript linenums="1"
const schemaInput: SchemaInput = {
  profiles: ['identifiers'],
  fields: {
    rowNumber: '!ref-profiles.identifiers.rowNumber',
    randH: '!ref-profiles.identifiers.randH',
    randT: '!ref-profiles.identifiers.randT',
    randM: '!ref-profiles.identifiers.randM',
    uuid: '!ref-profiles.identifiers.uuid',
    UUID: '!ref-profiles.identifiers.UUID'
  },
};

const fabricator = new Fabricator(schemaInput);

console.log(fabricator.generateMany(3));
```

!!! abstract "Output"

    ```
    [
        {
            rowNumber: 0,
            randH: 115,
            randT: 5263,
            randM: 3968364,
            uuid: '23d8ec5f-93ea-4919-ce83-df638a958303',
            UUID: '23D8EC5F-93EA-4919-CE83-DF638A958303'
        },
        {
            rowNumber: 1,
            randH: 649,
            randT: 9368,
            randM: 3201817,
            uuid: '38360491-f11a-484c-24c8-61d00ba29aba',
            UUID: '38360491-F11A-484C-24C8-61D00BA29ABA'
        },
        {
            rowNumber: 2,
            randH: 502,
            randT: 2845,
            randM: 5387946,
            uuid: '9393d3fb-d23d-43bb-9bdb-9af99c5d942a',
            UUID: '9393D3FB-D23D-43BB-9BDB-9AF99C5D942A'
        }
    ]
    ```
