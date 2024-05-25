# Randomizer

By default, Falbricate uses default JavaScript `Math.random` for generating random values.
For some cases, this might not be desired; sometimes you might want to use something 
cryptographically _more secure_.

## Predefined generators

There are currently set these generators:

- `default` - using native JavaScript implementation (`Math.random`) for random floats 
  within `[0, 1]` interval generation.

- `crypto` - using Node.js' `crypto` library for generation of more cryptographically 
  secure randoms


To specify you want to use a different generator, you need to specify it using
`useRandomizer(name: string)` function:

!!! example

    ```javascript
    useRandomizer('crypto')
    ```

## What is a randomizer

For Falbricate, randomizer (or Random Generator) is a function providing a _pseudo-_random 
number in range `[0, 1]` and is being used all over the Falbricate ecosystem. For example 
the default randomizer is simply the default `Math.random` function.


## Seeded randomizer

In some scenarios, you might need to use not exactly random values, but seeded randoms - to
be able to determinate the results.

For this purpose, there's a simple implementation of Linear Congruential Generator (LCG) implemented.

To enable this feature, you need to start with:

```javascript
useSeed(123)
```

This will make sure your Fabricators will generate pseudo-random results with a deterministic element - results
shall be always the same. This feature might be very useful for extensive testing purposes.


## Custom generators

You may find yourself in a situation when you need to implement your own generator. For this purpose, you
need to define your random-generator function and register it into the Falbricate ecosystem.

```javascript linenums="1"
const randomizer = () => 0.12345;

storeRandomizer('my-randomizer', randomizer);

useRandomizer('my-randomizer');
```


