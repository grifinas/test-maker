import { stubFunction } from 'stubModule';
import { AliasModule } from '@alias/ourModule';

export class ModuleWrapper {
  constructor(
    private readonly stub: stubFunction,
    private readonly alias: AliasModule,
  ) {}

  a() {
    this.stub();
    this.alias.aliasify();
  }
}
