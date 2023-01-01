import { UnitTest } from '../entities';
import { capitalize, getTestSubjectName, objectFormatting } from '../lib';
import { makeDependencyMocks } from './make-dependency-mocks';

import { TemplateService } from '../services';
import { TEMPLATE_BUILD_TEST_CONTEXT } from '../templates';

export function makeTestContext(
  templateService: TemplateService,
  unit: UnitTest,
  mocks?: string,
): string {
  if (unit.isLibrary) {
    return '';
  }

  const parameters = unit.parameters.map((parameter) => parameter.name);
  const testSubject = getTestSubject(unit);

  return templateService.use(TEMPLATE_BUILD_TEST_CONTEXT, {
    mockFunctionDI: objectFormatting(getMockFunctionInjections(unit)),
    parameters: parameters.join(',\n') + (parameters.length ? ',' : ''),
    mocks: mocks || makeDependencyMocks(templateService, unit.parameters),
    testSubject,
  });
}

function getTestSubject(unit: UnitTest): string {
  const newKeyword = unit.isClass ? 'new ' : '';
  const parameterNames = unit.parameters.map((parameter) => parameter.name);

  return `${getTestSubjectName(unit)}: ${newKeyword}${
    unit.name
  }(${parameterNames.join(', ')})`;
}

function getMockFunctionInjections(unit: UnitTest): string {
  return unit.parameters
    .map(
      (parameter) => `${parameter.name} = get${capitalize(parameter.name)}()`,
    )
    .join(', ');
}
