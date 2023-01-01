import { Actions, TestViewRegistry } from '../services';
import { UnitTest } from '../entities';
import { integrationTestTemplate } from '../templates/integration-test';
import { TestTypes } from '../interfaces';

TestViewRegistry.register(Actions.Create, TestTypes.IT, makeIntegrationTest);

export async function makeIntegrationTest(test: UnitTest): Promise<string> {
  return integrationTestTemplate({
    integrationName: test.name,
  });
}
