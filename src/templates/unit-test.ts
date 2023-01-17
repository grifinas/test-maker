import { TemplateService } from '../services';
import { TEMPLATE_BUILD_TEST_CONTEXT } from './parts/build-test-context';
import { TEMPLATE_IMPORTS } from './parts/imports';
import { TEMPLATE_FUNCTION_TESTS } from './parts/function-tests';

interface Params {
  functions: string[];
  mocks: string;
}

export const TEMPLATE_UNIT_TEST = 'TEMPLATE_UNIT_TEST';
TemplateService.register<Params>(
  TEMPLATE_UNIT_TEST,
  ({ test, include, extra }) => {
    return `${include(TEMPLATE_IMPORTS)}
  
  describe('${test.name}', () => {
  ${include(TEMPLATE_BUILD_TEST_CONTEXT)}

  ${include(TEMPLATE_FUNCTION_TESTS, extra)}
});
`;
  },
);
