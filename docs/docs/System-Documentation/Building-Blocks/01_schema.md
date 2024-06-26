# Schema

Schema represents an internal, abstract and somewhat _"proxy"_ model of what is
expected and what should be generated.

Technically speaking, it's a compiled version of [Schema Input](./02_schema-input.md),
which is provided by the client.

## Internals

Schema (as an instance of `Schema` class) consists of:

- Fields Definition - which fields should be generated, what resources has to be used to provide values,
  what values shall be generated for them and how these values expected to be modified. It not only uses
  [Value Generators](./03_value-generator.md) for retrieving a value for the field name, it also pipes the value
  through [Value Pipes](../Pipes/Value-Pipes/00_value-pipes.md)

- Falsum Pipes - pipes modifying the generated object by this schema ([more on Falsum Pipes](../Pipes/Falsum-Pipes/00_falsum-pipes.md))

- Profiles - pregenerated values (uniquely for each falsum generation) being accessible from the value generators 
  to maintain the result Falsum within a given context. For example when you generate an object representing a 
  person born in Germany, the city of birth mustn't be Paris, his nationality will most likely remain german and 
  his name will probably be Hans. See more on [Profiles](../Profiles/00_introduction.md).


## How is the Schema used

Schema is a root for `Fabricator` which uses it for Falsum fabrication. More on [Fabricator](./04_fabricator.md)
