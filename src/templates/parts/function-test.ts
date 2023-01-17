import { TemplateService } from '../../services';
import { getTestSubjectName } from '../../lib';
import { TEMPLATE_EXPECTATIONS } from './expectations';
import { TEMPLATE_DESTRUCTURE_BUILD_TEST_CONTEXT } from './destructure-build-test-context';

interface Params {
  functionName: string;
}

export const TEMPLATE_FUNCTION_TEST = 'TEMPLATE_FUNCTION_TEST';
TemplateService.register<Params>(
  TEMPLATE_FUNCTION_TEST,
  ({ test, include, extra }) => {
    const { functionName } = extra || {};

    if (!functionName) {
      throw new Error('Function name not passed');
    }

    return `describe('${functionName}', () => {
  it('should', async () => {
    ${include(TEMPLATE_DESTRUCTURE_BUILD_TEST_CONTEXT)}
    const result = await ${getTestSubjectName(test)}.${functionName}();

    ${include(TEMPLATE_EXPECTATIONS)}
  });
});
`;
  },
);
