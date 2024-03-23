# Schema Input

Schema Input is an abstraction given by client which is being compiled by [Fabricator](./04_fabricator.md) into
[Schema](./01_schema.md) - which is an internal representation of what the client expects to retrieve and how should
the fabricated falsum look like.

Similarly to [Schema](./01_schema.md), the Schema Input also contains declarations of fields with 
[Value Generators](./03_value-generator.md) assigned.


## Schema Declaration

The whole process of describing the schema via Schema Input was designed with a high emphasis 
on it's highly declarative nature - to enable the client to be able to declare everything with 
somewhat static description without any functional code.

The reason for it is for example to be able to detach the schema into a separate static `.json`
where the application could read the schema from (as the schema input), compile it internally 
and build falsa based on this model.

For this purpose, there are many string shortcuts for common stuff you can use to describe 
*"what you want"* rather than *"how to achieve it"*.



