import { UnitTest } from '../entities';
import { Actions, TemplateService, TestViewRegistry } from '../services';

import { TestTypes } from '../interfaces';
import { TEMPLATE_UNIT_TEST } from '../templates';

TestViewRegistry.register(Actions.Create, TestTypes.UNIT, makeUnitTest);

export async function makeUnitTest(
  templateService: TemplateService,
  unit: UnitTest,
): Promise<string> {
  return templateService.use(TEMPLATE_UNIT_TEST, unit);
}
