import { TemplateService } from '../../services';
import { capitalize } from '../../lib';
import { BuilderParameter } from '../../entities/test-builder';

interface Params {
  parameters: BuilderParameter[];
}

export const TEMPLATE_DEPENDENCY_MOCK = 'TEMPLATE_DEPENDENCY_MOCK';
TemplateService.register<Params>(
  TEMPLATE_DEPENDENCY_MOCK,
  ({ test, extra }) => {
    return (extra?.parameters || test.parameters)
      .map(
        (parameter) =>
          `const get${capitalize(parameter.name)} = () => ${
            parameter.stub.format
          }`,
      )
      .join('\n');
  },
);
