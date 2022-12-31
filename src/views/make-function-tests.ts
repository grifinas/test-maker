import { UnitTest } from '../entities/unit-test';
import { getTestSubjectName } from '../lib/unit-test';
import { libraryFunctionTestTemplate } from '../../templates/parts/library-function-test';
import { functionTestTemplate } from '../../templates/parts/function-test';
import { itShouldUnitTemplate } from '../../templates/parts/it-should-unit';

export function makeFunctionTests(
  unit: UnitTest,
  functions?: string[],
): string {
  const template = unit.isLibrary
    ? libraryFunctionTestTemplate
    : unit.isClass
    ? functionTestTemplate
    : itShouldUnitTemplate;

  const parameters = unit.parameters.map((parameter) => parameter.name);
  const testSubjectName = getTestSubjectName(unit);

  const templateParameters = {
    parametersAndSubject: [...parameters, testSubjectName].join(', '),
    testSubjectName,
    expectations: getExpectations(unit).join('\n'),
  };

  const toMake = functions || unit.functions;

  return toMake
    .map((functionName) =>
      template({
        testName: functionName,
        ...templateParameters,
      }),
    )
    .join('\n');
}

function getExpectations(unit: UnitTest): string[] {
  const expectations = ['expect(result).to.be.eql();'];

  expectations.push(
    ...unit.parameters.map(
      (parameter) => `expect(${parameter.name}).to.be.calledOnceWithExactly();`,
    ),
  );

  return expectations;
}
