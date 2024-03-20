type GenerationContextValueType =
  | string
  | boolean
  | number
  | (any & {})
  | any[];

export interface GenerationContext {
  [propName: string]: GenerationContextValueType | GenerationContext;
}
