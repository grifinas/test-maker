import { ViewTransformer } from '../interfaces/view-transformer';

export enum Actions {
  Create = 'Create',
  Update = 'Update',
}

interface Transformers {
  Create?: ViewTransformer;
  Update?: ViewTransformer;
}

export class TestViewRegistry {
  static transformerMap = new Map<string, Transformers>();
  static register(action: Actions, type: string, transformer: ViewTransformer) {
    const transformers = TestViewRegistry.transformerMap.get(type) || {};
    if (transformers[action]) {
      throw new Error(`View transformer for type: ${type} and action: ${action} already exists`);
    }

    transformers[action] = transformer;
    TestViewRegistry.transformerMap.set(type, transformers)
  }

  public getCreate(type: string): ViewTransformer|null {
    const transformers = TestViewRegistry.transformerMap.get(type) || {};
    return transformers[Actions.Create] || null;
  };
  public getUpdate(type: string): ViewTransformer|null {
    const transformers = TestViewRegistry.transformerMap.get(type) || {};
    return transformers[Actions.Update] || null;
  };
}