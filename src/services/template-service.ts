import { unitTestTemplate } from '../../templates/unit-test';
import { integrationTestTemplate } from '../../templates/integration-test';
import { backupUnitTestTemplate } from '../../templates/backup-unit-test';
import { dependencyMockTemplate } from '../../templates/parts/dependency-mock';
import { functionTestTemplate } from '../../templates/parts/function-test';
import { libraryFunctionTestTemplate } from '../../templates/parts/library-function-test';
import { buildTestContextTemplate } from '../../templates/parts/build-test-context';
import { itShouldUnitTemplate } from '../../templates/parts/it-should-unit';

export enum TEMPLATES {
  BACKUP_UNIT_TEST,
  INTEGRATION_TEST,
  UNIT_TEST,
  DEPENDENCY_MOCK,
  FUNCTION_TEST,
  LIBRARY_FUNCTION_TEST,
  IT_SHOULD_UNIT,
  BUILD_TEST_CONTEXT,
}

const map = {
  [TEMPLATES.BACKUP_UNIT_TEST]: backupUnitTestTemplate,
  [TEMPLATES.UNIT_TEST]: unitTestTemplate,
  [TEMPLATES.INTEGRATION_TEST]: integrationTestTemplate,
  [TEMPLATES.DEPENDENCY_MOCK]: dependencyMockTemplate,
  [TEMPLATES.FUNCTION_TEST]: functionTestTemplate,
  [TEMPLATES.LIBRARY_FUNCTION_TEST]: libraryFunctionTestTemplate,
  [TEMPLATES.IT_SHOULD_UNIT]: itShouldUnitTemplate,
  [TEMPLATES.BUILD_TEST_CONTEXT]: buildTestContextTemplate,
} as const;

export class TemplateService {
  use<T extends TEMPLATES>(template: T, parameters: Parameters<typeof map[T]>[0]): string {
    //@ts-ignore
    return map[template](parameters);
  }
}

const templateService = new TemplateService();

export function getTemplateService(): TemplateService {
  return templateService;
}
