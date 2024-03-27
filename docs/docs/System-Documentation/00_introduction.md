# Introduction

The whole ecosystem is based on various building blocks. This section aims on giving an introduction into them.

## Fabrication Pipeline

Fabrication Pipeline represents the whole flow of the falsa generation.

## Fabricator

Fabricator is a base entrypoint to the whole fabrication ecosystem. This component is responsible for managing and
maintaining of the whole falsa generation - _fabrication pipeline_.

## Schema

Schema is an internal representation of what the client described in his [Schema Input](#schema-input) provided
to [Fabricator](#fabricator) and what is he expected to have at the end of the fabrication pipeline.

## Schema Input

Schema Input represents client given declaration of how should the generated falsa look like.

This input is then compiled inside in the Fabricator into the actual Schema that is being used in the
Fabrication Pipeline.

## Value Generator

Value generator is a in-depth component being able to generate a specific type of value. There are many kinds of them
defined in the ecosystem; each using a different strategy and providing a different kind of value generation.

Each Value Generator has its name assigned, so you can always refer to it by the name. You can also generate your own
generators when you find yourself in situation of not finding any suitable solution; and you can also register it to
access it as you need:

```typescript linenums="1"
import { registerValueGenerator, get } from '@falbricate/base';

// Registration of your custom Value Generator
registerValueGenerator(
  'my-custom-generator',
  (config: MyGeneratorConfig) => new MyGenerator(config),
);

// Accessing your Value Generator in code
const generator = get('my-custom-generator', {
  requiredParam1: 'my-parameter',
  requiredParam2: 123,
});
```
