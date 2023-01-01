import { UnitTest } from '../entities';
import { makeTestContext } from './make-test-context';
import { makeImportStringsFromGroupedImports } from './make-import-strings-from-grouped-imports';
import { makeFunctionTests } from './make-function-tests';
import { Actions, TestViewRegistry } from '../services';
import { unitTestTemplate } from '../templates/unit-test';
import { TestTypes } from '../interfaces';

TestViewRegistry.register(Actions.Create, TestTypes.UNIT, makeUnitTest);

export async function makeUnitTest(unit: UnitTest): Promise<string> {
  const imports = `${makeImportStringsFromGroupedImports(unit.imports).join(
    '\n',
  )}`;

  return unitTestTemplate({
    imports,
    unitName: unit.name,
    buildTestContext: makeTestContext(unit),
    tests: makeFunctionTests(unit),
  });
}
