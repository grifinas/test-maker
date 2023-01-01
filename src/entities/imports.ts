import { GroupedImports } from '../actions/get-imports-from-parameters';

export class Imports {
  private readonly data = new Map<string, string[]>();

  add(key: string, ...items: string[]): this {
    const currentItems = this.data.get(key) || [];
    currentItems.push(...items);
    this.data.set(key, currentItems);
    return this;
  }

  getGroupedImports(): GroupedImports {
    return this.data;
  }
}
