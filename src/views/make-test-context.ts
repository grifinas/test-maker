import { UnitTest } from '../entities/unit-test';
import { getTemplateService, TEMPLATES } from '../services/template-service';
import { capitalize, objectFormatting } from '../lib/string';
import { getTestSubjectName } from '../lib/unit-test';
import { makeDependencyMocks } from './make-dependency-mocks';

export function makeTestContext(unit: UnitTest, mocks?: string) {
  if (unit.isLibrary) {
    return '';
  }

  const parameters = unit.parameters.map((parameter) => parameter.name);
  const testSubject = getTestSubject(unit);

  return getTemplateService().use(TEMPLATES.BUILD_TEST_CONTEXT, {
    mockFunctionDI: objectFormatting(getMockFunctionInjections(unit)),
    parameters: parameters.join(',\n') + (parameters.length ? ',' : ''),
    mocks: mocks || makeDependencyMocks(unit.parameters),
    testSubject,
  });
}

function getTestSubject(unit: UnitTest): string {
  const newKeyword = unit.isClass ? 'new ' : '';
  const parameterNames = unit.parameters.map((parameter) => parameter.name);

  return `${getTestSubjectName(unit)}: ${newKeyword}${unit.name}(${parameterNames.join(', ')})`;
}

function getMockFunctionInjections(unit: UnitTest): string {
  return unit.parameters.map((parameter) => `${parameter.name} = get${capitalize(parameter.name)}()`).join(', ');
}