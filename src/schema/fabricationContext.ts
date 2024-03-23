type GenerationContextValueType =
  | string
  | boolean
  | number
  | (any & {})
  | any[];

export interface FabricationContext {
  [propName: string]: GenerationContextValueType | FabricationContext;
}
