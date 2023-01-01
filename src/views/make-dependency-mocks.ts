import { capitalize, getStubFunctionName } from '../lib';
import { Parameter } from '../entities';

import { TemplateService } from '../services';
import { TEMPLATE_DEPENDENCY_MOCK } from '../templates';

export function makeDependencyMocks(
  templateService: TemplateService,
  parameters: Parameter[],
): string {
  return parameters
    .map((parameter) => {
      return templateService.use(TEMPLATE_DEPENDENCY_MOCK, {
        parameterName: capitalize(parameter.name),
        //TODO as string is bad here
        parameterTypeWithArguments: parameter.typeWithArguments as string,
        stubFunction: getStubFunctionName(parameter),
      });
    })
    .join('\n');
}
