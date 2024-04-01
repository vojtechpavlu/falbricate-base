# @falbricate/base

Simple and lightweight tool for mocking data in a shape you describe.

[Here](https://vojtechpavlu.github.io/falbricate-base/) you can find full documentation for this tool,
feel free to visit!

## Install

To install this package, you only need to enter:

```shell
npm i @falbricate/base
```

## Example

The following example shows the simplest way of how to declare how your
data should look like:

```javascript
const fabricator = new Fabricator({
  fields: {
    id: 'uuid',                   // Generate UUID
    username: {
      type: 'string-of-length',   // Generate random string of a given length
      config: {
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''),
        length: 10,
        pipes: [                  // Modify the generated value with pipes
          'lowercase',
          (value) => `u/${value}`
        ]
      }
    },
    age: {
      type: 'range-integer',      // Generate random integer within a range
      config: { min: 15, max: 50 }
    },
    languages: {
      type: 'array-sample',       // Select random sample from specified list
      config: {
        array: ['JS/TS', 'Java', 'C#', 'Python', 'R', 'C/C++'],
        sampleSize: 3
      }
    }
  }
});

// Generate a single item
const falsum: Falsum = fabricator.generate();

// Generate multiple items at once
const falsa: Falsum[] = fabricator.generateMany(5);

// Possible output:
// {
//   id: '5c3c2dc9-905b-4005-4059-40ff821cd2cc',
//   username: 'u/ooqne190mc',
//   age: 18,
//   languages: [ 'Python', 'Java', 'JS/TS' ]
// }
```

## Disclaimer

This package uses nothing but native JavaScript functionality. The randomization is
not based on high cryptography security standards. It is not recommended to use this
tool for generating passwords nor for any sensitive data or data used in production
environments.
