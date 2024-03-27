# Fabricator

Fabricator is an entity providing services of generating falsa objects by given schema. This servant maintains
the whole [Fabrication Pipeline](../01_fabrication-pipeline.md).

The Fabricator is a class taking only the Schema Input as a parameter, compiles it into internal Schema representation
and provides the service of generating a single item (falsum) or multiple items (falsa) at once with its methods
`generate(context)` and `generateMany(n, context)`.

## Example

```javascript
// Define the Schema Input consisting of a single field of `age`
// which is expected to be an integer in range of [15, 85]
const schema = {
  fields: {
    age: {
      type: 'range-integer',
      config: {
        min: 15,
        max: 85,
      },
    },
  },
};

// Create fabricator
const fabricator = new Fabricator(schema);

// Generate 30 items
const falsa = fabricator.generateMany(30);

// Do something with generated objects
falsa.forEach((falsum) => console.log(JSON.stringify(falsum)));
```
