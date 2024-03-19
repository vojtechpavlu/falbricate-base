/**
 * Declaration of charset as a list of single-character strings.
 */
export type Charset = string[];

export type CharsetName =
  | string
  | (
      | 'numbers'
      | 'lowercase'
      | 'uppercase'
      | 'specials'
      | 'doubles'
      | 'hexlower'
      | 'hexupper'
      | 'letters'
      | 'alphanum'
      | 'alphanumspecs'
    );

/**
 * Declaration of registry holding the registered charsets
 */
interface CharsetRegistry {
  [name: CharsetName]: Charset;
}

/* Definition of basic charsets */
const NUMBERS = '0123456789'.split('');
const LOWERCASES = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPERCASES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const SPECIALS = '.,-?!:_$#&@=+-;*`~/\\|\'"'.split('');
const DOUBLES = '(){}[]<>'.split('');
const HEXADECIMAL_LOWERCASES = '0123456899abcdef'.split('');
const HEXADECIMAL_UPPERCASES = '0123456899ABCDEF'.split('');

/** Charset registry */
const CHARSET_REGISTRY: CharsetRegistry = {
  /** Numeric characters (can be described as [0-9] regular expression) */
  numbers: NUMBERS,

  /** Lowercase characters (can be described as [a-z] regular expression) */
  lowercase: LOWERCASES,

  /** Uppercase characters (can be described as [A-Z] regular expression) */
  uppercase: UPPERCASES,

  /** Special characters */
  specials: SPECIALS,

  /** Characters going in pairs, like parentheses */
  doubles: DOUBLES,

  /** Hexadecimal characters in lowercase letters */
  hexlower: HEXADECIMAL_LOWERCASES,

  /** Hexadecimal characters in uppercase letters */
  hexupper: HEXADECIMAL_UPPERCASES,

  /** All letters (can be described as [a-zA-Z] regular expression) */
  letters: [...LOWERCASES, ...UPPERCASES],

  /** Alphanumerics (can be described as [a-zA-Z0-9] regular expression) */
  alphanum: [...LOWERCASES, ...UPPERCASES, ...NUMBERS],

  /** Alphanumeric characters with special characters */
  alphanumspecs: [...LOWERCASES, ...UPPERCASES, ...NUMBERS, ...SPECIALS],
};

/**
 * Checks if the given potential charset is an array of single-character strings.
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
      return typeof item === 'string' ? item.length : 0;
    })
    .reduce((acc, curr) => acc + curr);

  return sumOfLengths === potentialCharset.length;
};

/**
 * Tries to find a charset of a given name
 *
 * @param name Name of the charset to be returned
 *
 * @throws {Error} When there is no charset of such name
 */
export const getCharset = (name: CharsetName): Charset => {
  const charset = CHARSET_REGISTRY[name];

  if (!charset) {
    throw new Error(`Charset '${name}' not found`);
  }

  return charset;
};

/**
 * Checks there is a charset of this name registered.
 *
 * @param name Name of the charset to be checked
 */
export const hasCharset = (name: CharsetName): boolean => {
  return !!Object.keys(CHARSET_REGISTRY).find((key) => key === name);
};

/**
 * Tries to store the given charset
 *
 * @param name    Name the charset should be assigned to
 * @param charset Charset to be stored under the given name
 *
 * @throws {Error} When the given charset does not match the requirements
 * @throws {Error} When there already is a charset of such name registered
 */
export const storeCharset = (name: string, charset: Charset) => {
  if (!isCharset(charset)) {
    throw new Error(
      `Given argument is not charset (non-empty array of single-character strings)`,
    );
  } else if (hasCharset(name)) {
    throw new Error(
      `There already is a charset with name '${name}' registered`,
    );
  }

  CHARSET_REGISTRY[name] = charset;
};
