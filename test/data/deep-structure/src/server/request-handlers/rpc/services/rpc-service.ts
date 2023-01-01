import { UsefulAction } from '../../../../domain/actions/useful-action';
import { foo } from '../../../../lib/not-constructable';
import { Random } from '../../../../random';

export class RpcService {
  constructor(
    private readonly action: UsefulAction,
    private readonly random: Random,
  ) {}

  foo() {
    foo();
    this.action();
  }
}
