import * as utils from './utils';

console.log(
  utils.randomDateTime(
    new Date('1990-03-15T12:33:01'),
    new Date('2050-03-15T12:33:01'),
  ),
);
