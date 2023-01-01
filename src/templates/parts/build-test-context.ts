import { TemplateService } from '../../services';

interface Params {
  mockFunctionDI: string;
  mocks: string;
  parameters: string;
  testSubject: string;
}

export const TEMPLATE_BUILD_TEST_CONTEXT = 'TEMPLATE_BUILD_TEST_CONTEXT';
TemplateService.register(TEMPLATE_BUILD_TEST_CONTEXT, buildTestContextTemplate);

function buildTestContextTemplate({
  mocks,
  mockFunctionDI,
  parameters,
  testSubject,
}: Params): string {
  return `${mocks}

const buildTestContext = ({${mockFunctionDI}} = {}) => {
    return {
        ${parameters}
        ${testSubject},
    };
};
`;
}
