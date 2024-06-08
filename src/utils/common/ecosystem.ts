type Configuration = Record<string, any>;
type Builder<T extends Configuration = Configuration> = (config: T) => () => any;

export class Registry<K extends string> {
  private registry: Map<K, Builder> = new Map();

  register(key: K, builder: Builder): void {
    if (this.registry.has(key)) {
      throw new Error(`Builder with key '${key}' is already registered`);
    }
    this.registry.set(key, builder);
  }

  has(key: K): boolean {
    return this.registry.has(key);
  }

  get(key: K): Builder {
    if (!this.has(key)) {
      throw new Error(`There is no builder with key '${key}' registered`);
    }

    return this.registry.get(key)!;
  }

  remove(key: K): boolean {
    if (!this.registry.has(key)) {
      throw new Error(`Builder with key '${key}' does not exist`);
    }
    return this.registry.delete(key);
  }

  allNames(): K[] {
    return Array.from(this.registry.keys());
  }
}
