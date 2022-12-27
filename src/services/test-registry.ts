import { TestTransformer } from "../interfaces/test-transformer";

export class TestRegistry {
  static transformerMap = new Map<string, TestTransformer>();
  static register(type: string, transformer: TestTransformer) {
    if (TestRegistry.transformerMap.has(type)) {
      throw new Error(`Test transformer for type: ${type} already exists`);
    }

    TestRegistry.transformerMap.set(type, transformer);
  }

  public get(type: string): TestTransformer | null {
    return TestRegistry.transformerMap.get(type) || null;
  }
}
