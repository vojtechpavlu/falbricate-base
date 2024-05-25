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

