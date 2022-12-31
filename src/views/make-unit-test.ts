import { UnitTest } from '../entities/unit-test';
import { makeTestContext } from './make-test-context';
import { makeImportStringsFromGroupedImports } from './make-import-strings-from-grouped-imports';
import { makeFunctionTests } from './make-function-tests';
import { Actions, TestViewRegistry } from '../services/test-view-registry';
import { TestTypes } from '../actions/get-test-type';
import { unitTestTemplate } from '../../templates/unit-test';

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
