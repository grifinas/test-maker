import { getTemplateService, TEMPLATES } from "../services/template-service";
import { Actions, TestViewRegistry } from "../services/test-view-registry";
import { TestTypes } from "../actions/get-test-type";
import { UnitTest } from "../entities/unit-test";

TestViewRegistry.register(Actions.Create, TestTypes.IT, makeIntegrationTest);

export async function makeIntegrationTest(test: UnitTest): Promise<string> {
  return getTemplateService().use(TEMPLATES.INTEGRATION_TEST, {
    integrationName: test.name,
  });
}
