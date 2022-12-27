import { baz } from '../../lib/library-file';
import { UsefulAction } from '../../domain/actions/useful-action';

export class Repository {
  constructor(private readonly action: UsefulAction) {
  }

  baz() {
    baz({});
    this.action();
  }
}
