# String generators

Here is a list of predefined generators for generating string values.


!!! note

    These generators are well combined with [Charsets](../../Utils/charset.md) feature  


## Random String of lenght

Generates a random string based on desired `length` (number) and given `charset`.

`charset` is checked to be a real [Charset](../../Utils/charset.md). When it's not,
it throws an error; so it does when the `length` is negative. Both fields are required.

### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: StringGeneratorConfig = {
        length: 13,
        charset: ['a', 'b', 'c', 'd']
    }

    const generator = new StringOfLengthGenerator(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        bccbdaddacdbd
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: StringGeneratorConfig = {
        length: 13,
        charset: ['a', 'b', 'c', 'd']
    }

    const generator = getValueGenerator('string-of-length', config);

    const value = generator.generate();
    ```

    !!! abstract "Output"

        ```
        bccbdaddacdbd
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'string-of-length',
                config: {
                    length: 13,
                    charset: ['a', 'b', 'c', 'd']
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'bccbdaddacdbd' }
        ```

## Random String

Generates a random string based on a given `charset` with length within a specified range.

### Configuration

This Value Generator requires configuration describing the attributes of the desired string looking
as follows:

=== "Configuration definition"

    This configuration requires a specification of the length as a range withing which the
    output string should be of, and a set of characters the result string should consist of:

    ``` typescript linenums="1"
    export type RandomStringGeneratorConfig = {
        minLen?: number;
        maxLen: number;
        charset: Charset;
    } & ValueGeneratorConfig;
    ```

=== "Example"

    The following configuration example could be used to generate strings of length
    somewhere in between 0 and 15 characters while using only characters of the set
    `['a', 'b', 'c', 'd', 'e', 'f']`

    ``` typescript linenums="1"
    const config: RandomStringGeneratorConfig = {
        maxLen: 15,
        charset: ['a', 'b', 'c', 'd', 'e', 'f']
    };
    ```

There are some general rules applied to the configuration being checked:

- Property `minLen` is optional. When not provided, zero (`0`) is used.
- Property `maxLen` is required.
- `minLen` must not be greater then `maxLen`.
- Both `minLen` and `maxLen` must be positive numbers.
- `charset` is checked to be a real [Charset](../../Utils/charset.md).

### Examples

=== "Instance access"

    ``` typescript linenums="1"
    const config: RandomStringGeneratorConfig = {
        maxLen: 15,
        charset: ['a', 'b', 'c', 'd', 'e', 'f']
    };

    const generator = new RandomStringGenerator(config);

    console.log(generator.generate());
    ```

    !!! abstract "Output"

        ```
        'acafbedcaf'
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    const config: RandomStringGeneratorConfig = {
        maxLen: 15,
        charset: ['a', 'b', 'c', 'd', 'e', 'f']
    };

    const generator = getValueGenerator('random-string', config);

    const value = generator.generate();
    ```

    !!! abstract "Output"

        ```
        'acafbedcaf'
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'random-string',
                config: {
                    maxLen: 15,
                    charset: ['a', 'b', 'c', 'd', 'e', 'f']
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'acafbedcaf' }
        ```

## String template

This Value Generator is a template String processor. It lets you generate any string you desire by
the specified template that is being filled up during the generation.

### Configuration

=== "Configuration definition"

    ``` typescript linenums="1"
    // Declaration of variables with values being generated
    export interface StringTemplateVariables {
        [variable: string]: (
            // This is a description of schema fields in declarative manner
            DeclarativeFieldDefinition |

            // Or, you can pass the Value Generator directly as an instance
            ValueGenerator<GeneratedValue, ValueGeneratorConfig>
        );
    }

    // Declaration of custom charsets assigned to tags - you can use
    // these tags in your template string and these will be then replaced
    // with a random character from the specified set of characters
    export interface CustomCharsets {
        [tag: string]: Charset
    }

    // The root configuration declaration
    export type StringTemplateGeneratorConfig = {
        template: string;
        variables?: StringTemplateVariables;
        customCharsets?: CustomCharsets;
    } & ValueGeneratorConfig;
    ```

=== "Example"

    The following configuration example could be used to generate strings of length
    somewhere in between 0 and 15 characters while using only characters of the set
    `['a', 'b', 'c', 'd', 'e', 'f']`

    ``` typescript linenums="1"
    const config: StringTemplateGeneratorConfig = {
        template: 'ID-{foo}-{foo}-{bar}-%c%c%C%C-%D%d-%x%x',
        variables: {
            foo: {
                type: 'constant-value',
                config: {
                    value: 'foo_value'
                }
            },
            bar: {
                type: 'constant-value',
                config: {
                    value: 'bar_value'
                }
            },
        },
        customCharsets: {
            '%x': ['x', 'y', 'z']
        }
    }
    ```

    !!! abstract "Expected Output"

        Expected output of such complex configuration could look something like
        this:

        ```
        'ID-foo_value-foo_value-bar_value-dvUT-73-zx'
        ```

#### Variables

Handling variables is one of the basic template features supported. The variable substitution
is split into two steps:

- **Value Generation** - To generate a value being used in the final string, you need to provide
  the desired Value Generator. You can use for example a Random String generator, Random Number generator
  or Context Accessor; the only requirement is to be actually a Value generator. Then, when this Template
  String Generator is requested for template generation, it will always generate new values for this
  provisioning. Keep in mind that this value is being reused during the whole single generation.

- **Replacement** - To replace the generated value in the template, you use a specific syntax to tell the
  Template generator where to put the value to - using `{variableName}`. The whole substring with brackets
  is then replaced with the actual value prepared by the generator specified by the `variableName`.

This generator is very useful for generating random strings of a specific
form. But it can also be used also (as noted above) to generate strings
with placeholders - variables.

It always follows this scenario:

!!! example

    ``` typescript linenums="1"
    const config = {
        template: '<< string template using {variable_name} as input >>',
        variables: {
            variable_name: {
                // Value Generator declaration
            }
        }
    }
    ```

#### Custom Charsets

Custom charsets is another feature enabling the client to use a custom set of characters
at a specific place in the template.

By defining the tag and assigning the desired Charset, the Value Generator seeks these tags
in the template and substitutes it with a randomly selected character.

You can specify those in an optional `customCharsets` property.

#### Predefined Charsets

The most basic feature of the String Template Generator is the ability to use common
character sets.

- `%d` describes any digit in range `[0, 9]`
- `%D` describes any digit in range `[1, 9]` (can be useful when want a set of digits to not
  start with a zero)
- `%c` describes any lowercase alphabetic character (like `[a-z]` regular expression)
- `%C` describes any uppercase alphabetic character (like `[A-Z]` regular expression)

### Examples

=== "Instance access"

    ``` typescript linenums="1"
    // Configuration of the String builder
    const config: StringTemplateGeneratorConfig = {
        template: 'UID_{userIdFromContext}-%userClass-item-%D%d%d%d%d%d',
        variables: {
            userIdFromContext: {
                type: 'context-input',
                config: {
                    path: 'userId'
                }
            }
        },
        customCharsets: {
            '%userClass': ['a', 'x', 'r', 'w']
        }
    };

    // Generator using the given configuration
    const generator = new StringTemplateGenerator(config);

    // Context passing the userId
    const context: FabricationContext = {
        userId: 123456789
    }

    console.log(generator.generate(context));
    ```

    !!! abstract "Output"

        ```
        'UID_123456789-r-item-203571'
        ```

=== "Declarative access"

    ``` typescript linenums="1"
    // Configuration of the String builder
    const config: StringTemplateGeneratorConfig = {
        template: 'UID_{userIdFromContext}-%userClass-item-%D%d%d%d%d%d',
        variables: {
            userIdFromContext: {
                type: 'context-input',
                config: {
                    path: 'userId'
                }
            }
        },
        customCharsets: {
            '%userClass': ['a', 'x', 'r', 'w']
        }
    };

    // Generator using the given configuration
    const generator = getValueGenerator('string-template', config);

    // Context passing the userId
    const context: FabricationContext = {
        userId: 123456789
    }

    console.log(generator.generate(context));
    ```

    !!! abstract "Output"

        ```
        'UID_123456789-r-item-203571'
        ```

=== "Schema access"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
      fields: {
        userItemId: {
          type: 'string-template',
          config: {
            template: 'UID_{userIdFromContext}-%userClass-item-%D%d%d%d%d%d',
            variables: {
              userIdFromContext: {
                type: 'context-input',
                config: {
                  path: 'userId'
                }
              }
            },
            customCharsets: {
              '%userClass': ['a', 'x', 'r', 'w']
            }
          }
        }
      }
    }

    // Fabricator generating Falsa of such shape
    const fabricator = new Fabricator(schema);

    // Context passing the userId
    const context: FabricationContext = {
        userId: 123456789
    }

    console.log(fabricator.generate(context));
    ```

    !!! abstract "Output"

        ```
        { userItemId: 'UID_123456789-r-item-203571' }
        ```
