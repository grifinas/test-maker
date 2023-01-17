import { TemplateService } from '../../services';
import { TEMPLATE_EXPECTATIONS } from './expectations';
import { getTestSubjectName } from '../../lib';
import { TEMPLATE_DESTRUCTURE_BUILD_TEST_CONTEXT } from './destructure-build-test-context';

export const TEMPLATE_IT_SHOULD_UNIT = 'TEMPLATE_IT_SHOULD_UNIT';
TemplateService.register(TEMPLATE_IT_SHOULD_UNIT, ({ test, include }) => {
  return `it('should', async () => {
    ${include(TEMPLATE_DESTRUCTURE_BUILD_TEST_CONTEXT)}
    const result = await ${getTestSubjectName(test)}();

    ${include(TEMPLATE_EXPECTATIONS)}
});
`;
});
