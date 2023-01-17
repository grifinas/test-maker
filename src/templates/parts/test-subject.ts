import { TemplateService } from '../../services';
import { getTestSubjectName } from '../../lib';
import { getParameterNames } from '../../lib/unit-test';

export const TEMPLATE_TEST_SUBJECT = 'TEMPLATE_TEST_SUBJECT';
TemplateService.register(TEMPLATE_TEST_SUBJECT, ({ test }) => {
  const newKeyword = test.isClass ? 'new ' : '';
  const parameterNames = getParameterNames(test);

  return `${getTestSubjectName(test)}: ${newKeyword}${
    test.name
  }(${parameterNames.join(', ')})`;
});
