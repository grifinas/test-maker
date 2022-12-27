import { getTemplateService, TEMPLATES } from '../services/template-service';
import { capitalize } from '../lib/string';
import { getStubFunctionName } from '../lib/unit-test';
import { Parameter } from '../entities/parameter';

export function makeDependencyMocks(parameters: Parameter[]): string {
  return parameters
    .map((parameter) => {
      return getTemplateService().use(TEMPLATES.DEPENDENCY_MOCK, {
        parameterName: capitalize(parameter.name),
        //TODO as string is bad here
        parameterTypeWithArguments: parameter.typeWithArguments as string,
        stubFunction: getStubFunctionName(parameter),
      });
    })
    .join('\n');
}
