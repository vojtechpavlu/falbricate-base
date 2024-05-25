# Charsets

Charset defines an alphabet that can be used; mostly for generating structured strings. In Falbricate ecosystem, 
charset is basically an array of single-character strings.


## Predefined charsets

There is already a set of charsets prepared for easier use:

- `numbers` (from interval `[0, 9]`)
- `lowercase` (`[a-z]`)
- `uppercase` (`[A-Z]`)
- `specials` (some of the special characters, like any of these: `.,-?!:_$#&@=+-;*~/\|'"`)
- `doubles` (double characters, like parentheses, brackets and so on)
- `hexlower` (hexadecimal characters in lowercases)
- `hexupper` (hexadecimal characters in uppercases)
- `letters` (upper- and lowercase letters)
- `alphanum` (uppercases, lowercases and numbers)
- `alphanumspecs` (uppercases, lowercases, numbers and special characters)


## Using charsets

Predefined charsets can be used at wide range of places through the Falbricate ecosystem, however the most common
use-case is definitely when generating strings.

To demonstrate the usage, let's use the [String of length](
../System-Documentation/Generators/02_strings.md#random-string-of-lenght) 
Value Generator.


### Examples

Here you can compare using predefined charsets with explicit declaration

=== "Explicit definition"

    ``` typescript linenums="1"    
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'string-of-length',
                config: {
                    length: 13,

                    // Normally, to define the lowercase hexadecimal characters,
                    // you would need to define the whole array of them
                    charset: [
                        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                        'a', 'b', 'c', 'd', 'e', 'f'
                    ]
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'd25a5e750566b' }
        ```

=== "Predefined charsets"

    ``` javascript linenums="1"
    const schema: SchemaInput = {
        fields: {
            value: {
                type: 'string-of-length',
                config: {
                    length: 13,

                    // Now, you only need to specify the charset name
                    charset: 'hexlower'
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { value: 'd25a5e750566b' }
        ```


## Custom charsets

If your application requires a specific set of characters, you are free to define
your own that meets the requirements.


### Example

To define such charset, you only need to register it into the Falbricate ecosystem
with following snippet:

``` javascript
registerCharset('my-custom-characters', ['x', 'y', 'z', '3']);
```

Now, let's see the whole example:

!!! example

    ``` javascript linenums="1"

    // Registration of my custom charset
    registerCharset('my-custom-characters', ['x', 'y', 'z', '3']);

    // Definition of schema using such charset
    const schema: SchemaInput = {
        fields: {
            mySpecialString: {
                type: 'string-of-length',
                config: {
                    length: 5,

                    // Now, define using your charset 
                    charset: 'my-custom-characters'
                }
            }
        }
    }

    const fabricator = new Fabricator(schema);

    console.log(fabricator.generate());
    ```

    !!! abstract "Output"

        ```
        { mySpecialString: 'y3zzx' }
        ```

!!! note
    
    There are some requirements your custom charset must meet:

    - **Unique naming convention** - name you specify must be unique through the whole
      ecosystem
    
    - **Given charset must be a charset** - the charset (as specified above) is considered
      to be an array of single-character strings; nothing else is allowed.
