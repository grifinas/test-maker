import { UsefulAction } from '../../../../domain/actions/useful-action';
import { Random } from '../../../../random';
import { baz } from '../../../../lib/library-file';

export class RpcServiceWithIntegrationTest {
  constructor(
    private readonly action: UsefulAction,
    private readonly random: Random,
  ) {}

  bar() {
    baz({});
    this.action();
  }
}
