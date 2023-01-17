import { TemplateService } from '../../services';
import { capitalize, getStubFunctionName } from '../../lib';
import { Parameter } from '../../entities';

interface Params {
  parameters: Parameter[];
}

export const TEMPLATE_DEPENDENCY_MOCK = 'TEMPLATE_DEPENDENCY_MOCK';
TemplateService.register<Params>(
  TEMPLATE_DEPENDENCY_MOCK,
  ({ test, extra }) => {
    return (extra?.parameters || test.parameters)
      .map(
        (parameter) => `const get${capitalize(
          parameter.name,
        )} = () => ${getStubFunctionName(parameter)}<${
          parameter.typeWithArguments
        }>();
`,
      )
      .join('\n');
  },
);
