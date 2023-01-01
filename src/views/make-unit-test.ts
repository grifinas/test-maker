import { UnitTest } from '../entities';
import { makeTestContext } from './make-test-context';
import { makeImportStringsFromGroupedImports } from './make-import-strings-from-grouped-imports';
import { makeFunctionTests } from './make-function-tests';
import { Actions, TemplateService, TestViewRegistry } from '../services';

import { TestTypes } from '../interfaces';
import { TEMPLATE_UNIT_TEST } from '../templates';

TestViewRegistry.register(Actions.Create, TestTypes.UNIT, makeUnitTest);

export async function makeUnitTest(
  templateService: TemplateService,
  unit: UnitTest,
): Promise<string> {
  const imports = `${makeImportStringsFromGroupedImports(unit.imports).join(
    '\n',
  )}`;

  return templateService.use(TEMPLATE_UNIT_TEST, {
    imports,
    unitName: unit.name,
    buildTestContext: makeTestContext(templateService, unit),
    tests: makeFunctionTests(templateService, unit),
  });
}
