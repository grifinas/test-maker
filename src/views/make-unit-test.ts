import { UnitTest } from "../entities/unit-test";
import { getTemplateService, TEMPLATES } from "../services/template-service";
import { makeTestSpecificImports } from "../lib/unit-test";
import { makeTestContext } from "./make-test-context";
import { makeImportStringsFromGroupedImports } from "./make-import-strings-from-grouped-imports";
import { makeFunctionTests } from "./make-function-tests";
import { Actions, TestViewRegistry } from "../services/test-view-registry";
import { TestTypes } from "../actions/get-test-type";

TestViewRegistry.register(Actions.Create, TestTypes.UNIT, makeUnitTest);

export async function makeUnitTest(unit: UnitTest): Promise<string> {
  const imports = `${makeImportStringsFromGroupedImports(unit.imports).join(
    "\n"
  )}\n${await makeTestSpecificImports(unit)}`;

  return getTemplateService().use(TEMPLATES.UNIT_TEST, {
    imports,
    unitName: unit.name,
    buildTestContext: makeTestContext(unit),
    tests: makeFunctionTests(unit),
  });
}
