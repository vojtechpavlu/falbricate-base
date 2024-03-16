export type SingleValue = string | number | boolean | (any & {});
export type GeneratedValue = SingleValue | SingleValue[]

export type ValuePipe = (value: GeneratedValue) => GeneratedValue

export interface ValueGeneratorConfig {
  pipes?: ValuePipe[]
}

export abstract class ValueGenerator<
  ValueType extends GeneratedValue,
  Conf extends ValueGeneratorConfig
> {

  readonly config: Conf

  protected constructor(config: Conf) {
    this.config = config
  }

  abstract get: () => ValueType

  protected pipe = (value: ValueType) => {
    this.config.pipes?.forEach((pipe: ValuePipe) => {
      value = pipe(value);
    })

    return value;
  }
}
