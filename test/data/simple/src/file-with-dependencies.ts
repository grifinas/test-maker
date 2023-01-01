import { Function1 } from './file1';
import { Function2 as Function2Aliased } from './file2';

export function factoryWithDependencies(
  fn1: Function1,
  fn2: Function2Aliased,
) {}

export type FunctionWithDependencies = ReturnType<
  typeof factoryWithDependencies
>;
