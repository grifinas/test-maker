import { capitalize } from '../lib/string';
import { getStubFunctionName } from '../lib/unit-test';
import { Parameter } from '../entities/parameter';
import { dependencyMockTemplate } from '../../templates/parts/dependency-mock';

export function makeDependencyMocks(parameters: Parameter[]): string {
  return parameters
    .map((parameter) => {
      return dependencyMockTemplate({
        parameterName: capitalize(parameter.name),
        //TODO as string is bad here
        parameterTypeWithArguments: parameter.typeWithArguments as string,
        stubFunction: getStubFunctionName(parameter),
      });
    })
    .join('\n');
}
