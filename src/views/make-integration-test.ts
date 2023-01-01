import { Actions, TestViewRegistry } from '../services/test-view-registry';
import { TestTypes } from '../actions/get-test-type';
import { UnitTest } from '../entities/unit-test';
import { integrationTestTemplate } from '../templates/integration-test';

TestViewRegistry.register(Actions.Create, TestTypes.IT, makeIntegrationTest);

export async function makeIntegrationTest(test: UnitTest): Promise<string> {
  return integrationTestTemplate({
    integrationName: test.name,
  });
}
