import { Actions, TemplateService, TestViewRegistry } from '../services';
import { UnitTest } from '../entities';

import { TestTypes } from '../interfaces';
import { TEMPLATE_INTEGRATION_TEST } from '../templates';

TestViewRegistry.register(Actions.Create, TestTypes.IT, makeIntegrationTest);

export async function makeIntegrationTest(
  templateService: TemplateService,
  test: UnitTest,
): Promise<string> {
  return templateService.use(TEMPLATE_INTEGRATION_TEST, test);
}
