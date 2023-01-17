import { TemplateService } from '../../services';
import { getParameterNames, getTestSubjectName } from '../../lib/unit-test';

export const TEMPLATE_DESTRUCTURE_BUILD_TEST_CONTEXT =
  'TEMPLATE_DESTRUCTURE_BUILD_TEST_CONTEXT';
TemplateService.register(
  TEMPLATE_DESTRUCTURE_BUILD_TEST_CONTEXT,
  ({ test }) => {
    return `const { ${[
      ...getParameterNames(test),
      getTestSubjectName(test),
    ].join(', ')} } = buildTestContext();`;
  },
);
