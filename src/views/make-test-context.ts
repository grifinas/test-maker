import { UnitTest } from '../entities/unit-test';
import { capitalize, objectFormatting } from '../lib/string';
import { getTestSubjectName } from '../lib/unit-test';
import { makeDependencyMocks } from './make-dependency-mocks';
import { buildTestContextTemplate } from '../templates/parts/build-test-context';

export function makeTestContext(unit: UnitTest, mocks?: string) {
  if (unit.isLibrary) {
    return '';
  }

  const parameters = unit.parameters.map((parameter) => parameter.name);
  const testSubject = getTestSubject(unit);

  return buildTestContextTemplate({
    mockFunctionDI: objectFormatting(getMockFunctionInjections(unit)),
    parameters: parameters.join(',\n') + (parameters.length ? ',' : ''),
    mocks: mocks || makeDependencyMocks(unit.parameters),
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
