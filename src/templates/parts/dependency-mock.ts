import { TemplateService } from '../../services';

interface Params {
  parameterName: string;
  parameterTypeWithArguments: string;
  stubFunction: string;
}

export const TEMPLATE_DEPENDENCY_MOCK = 'TEMPLATE_DEPENDENCY_MOCK';
TemplateService.register(TEMPLATE_DEPENDENCY_MOCK, dependencyMockTemplate);

function dependencyMockTemplate({
  parameterName,
  stubFunction,
  parameterTypeWithArguments,
}: Params): string {
  return `const get${parameterName} = () => ${stubFunction}<${parameterTypeWithArguments}>();
`;
}
