/**
 * Turns the Camel Case into Snake case; like this:
 *
 * 'someText' -> 'some_text'
 *
 * @param camel Simple string to be turned into snake case
 */
export const camelToSnake = (camel: string): string => {
  let snake = '';

  for (let i = 0; i < camel.length; i++) {
    const character = camel[i] as string;
    if (i > 0 && character === character.toUpperCase()) {
      snake += '_';
    }
    snake += character.toLowerCase();
  }

  return snake;
};

/**
 * Turns the Snake case into Camel case; like this:
 *
 * 'some_text' -> 'someText'
 *
 * @param snake Simple string to be turned into camel case
 */
export const snakeToCamel = (snake: string): string => {
  const words = snake.split('_');

  return words
    .map((word, idx) => {
      if (idx === 0) {
        return word;
      } else {
        return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
      }
    })
    .join('');
};
