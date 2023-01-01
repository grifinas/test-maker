import { TemplateService } from '../services';

interface Params {
  buildTestContext: string;
  imports: string;
  tests: string;
  unitName: string;
}

export const TEMPLATE_UNIT_TEST = 'TEMPLATE_UNIT_TEST';
TemplateService.register(TEMPLATE_UNIT_TEST, unitTestTemplate);

function unitTestTemplate({
  imports,
  unitName,
  buildTestContext,
  tests,
}: Params): string {
  return `${imports}

describe('${unitName}', () => {
  ${buildTestContext}

  ${tests}
});
`;
}
