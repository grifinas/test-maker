import { TemplateService } from '../../services';
import { Parameter } from '../../entities';
import { TEMPLATE_TEST_SUBJECT } from './test-subject';
import { TEMPLATE_MOCK_DEPENDENCY_INJECTIONS } from './mock-dependency-injections';
import { TEMPLATE_DEPENDENCY_MOCK } from './dependency-mock';
import { getParameterNames } from '../../lib/unit-test';

interface Params {
  parameters: Parameter[];
}

export const TEMPLATE_BUILD_TEST_CONTEXT = 'TEMPLATE_BUILD_TEST_CONTEXT';
TemplateService.register<Params>(
  TEMPLATE_BUILD_TEST_CONTEXT,
  ({ test, include, extra }) => {
    if (test.isLibrary) {
      return '';
    }
    const parameterNames = getParameterNames(test).join(',\n');

    return `${include(TEMPLATE_DEPENDENCY_MOCK, extra)}

const buildTestContext = ({${include(
      TEMPLATE_MOCK_DEPENDENCY_INJECTIONS,
    )}} = {}) => {
    return {
        ${parameterNames ? `${parameterNames},` : ''}
        ${include(TEMPLATE_TEST_SUBJECT)},
    };
};
`;
  },
);
