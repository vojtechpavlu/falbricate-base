//
export type Charset = string[];

interface CharsetRegistry {
  [name: string]: Charset
}

const NUMBERS = "0123456789".split("");
const LOWERCASES = "abcdefghijklmnopqrstuvwxyz".split("");
const UPPERCASES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const SPECIALS = ".,-?!:_$#&@=+-;*`~/\\|\'\"".split("")
const DOUBLES = "(){}[]<>".split("")

export const DEFAULT_CHARSETS: CharsetRegistry = {
  NUMBERS: NUMBERS,
  LOWERCASE_CHARS: LOWERCASES,
  UPPERCASE_CHARS: UPPERCASES,
  SPECIAL_CHARS: SPECIALS,
  DOUBLE_CHARS: DOUBLES,

  // Combinations
  ALL_LETTERS: [
    ...LOWERCASES,
    ...UPPERCASES
  ],

  ALPHANUMERICS: [
    ...LOWERCASES,
    ...UPPERCASES,
    ...NUMBERS
  ],

  ALPHANUMERICS_WITH_SPECIALS: [
    ...LOWERCASES,
    ...UPPERCASES,
    ...NUMBERS,
    ...SPECIALS
  ],

  ALL: [
    ...LOWERCASES,
    ...UPPERCASES,
    ...NUMBERS,
    ...SPECIALS,
    ...DOUBLES
  ]
}



/**
 * Checks if the given potential charset is an array
 * of single-character strings.
 *
 * When it's not, it returns false.
 *
 * @param potentialCharset Potential charset to be checked
 */
export const isCharset = (potentialCharset: any): boolean => {
  if (potentialCharset === null || potentialCharset === undefined) {
    return false;
  } else if (!Array.isArray(potentialCharset)) {
    return false;
  } else if (potentialCharset.length < 1) {
    return false;
  }

  // Count all the characters in the given array
  const sumOfLengths = potentialCharset
    .map((item) => {
      return typeof item === 'string' ? item.length : 0
    })
    .reduce((acc, curr) => acc + curr);

  return sumOfLengths === potentialCharset.length;
};