import { Registry } from '../../../../src';


describe('registry class', () => {
  it('should not fail on a registered builder', () => {
    const registry = new Registry();
    registry.register('my-test', ({}) => 3 as any);

    expect(() => registry.get('my-test')).not.toThrow();
  });

  it('should be able to register a builder', () => {
    const registry = new Registry();
    registry.register('my-test', ({}) => 3 as any);

    expect(registry.get('my-test')).not.toBeUndefined();
  });

  it('should return an expected builder', () => {
    const registry = new Registry();
    registry.register('my-test', ({}) => 3 as any);

    const builder = registry.get('my-test');

    expect(builder({})).toBe(3);
  });

  it('should return all the registered keys', () => {
    const registry = new Registry();

    const builder = ({}) => 3 as any;

    registry.register('my-test-0', builder);
    registry.register('my-test-1', builder);

    expect(registry.allNames().length).toBe(2);
  });

  it('should remove a registered builder', () => {
    const registry = new Registry();

    const builder = ({}) => 3 as any;

    registry.register('my-test', builder);

    expect(registry.allNames().length).toBe(1);

    registry.remove('my-test')

    expect(registry.allNames().length).toBe(0);
  });

  it('should fail on trying to register a builder with used name', () => {
    const registry = new Registry();

    const builder = ({}) => 3 as any;

    registry.register('my-test', builder);

    expect(() => registry.register('my-test', builder)).toThrow(
      `Builder with key 'my-test' is already registered`
    );
  });

  it('should fail on non-existing builder', () => {
    const registry = new Registry();
    expect(() => registry.get('my-test')).toThrow(
      `There is no builder with key 'my-test' registered`
    );
  });

  it('should not fail on non-existing builder when asking if it has it', () => {
    const registry = new Registry();
    expect(() => registry.has('my-test')).not.toThrow();
  });
});
