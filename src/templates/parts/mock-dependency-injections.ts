import { TemplateService } from '../../services';
import { capitalize } from '../../lib';

export const TEMPLATE_MOCK_DEPENDENCY_INJECTIONS =
  'TEMPLATE_MOCK_DEPENDENCY_INJECTIONS';
TemplateService.register(TEMPLATE_MOCK_DEPENDENCY_INJECTIONS, ({ test }) => {
  return test.parameters
    .map(
      (parameter) => `${parameter.name} = get${capitalize(parameter.name)}()`,
    )
    .join(', ');
});
