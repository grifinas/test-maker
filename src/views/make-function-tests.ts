import { getTemplateService, TEMPLATES } from '../services/template-service';
import { UnitTest } from '../entities/unit-test';
import { getTestSubjectName } from '../lib/unit-test';

export function makeFunctionTests(unit: UnitTest, functions?: string[]): string {
  const template = unit.isLibrary
    ? TEMPLATES.LIBRARY_FUNCTION_TEST
    : unit.isClass
    ? TEMPLATES.FUNCTION_TEST
    : TEMPLATES.IT_SHOULD_UNIT;

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
      getTemplateService().use(template, {
        testName: functionName,
        ...templateParameters,
      })
    )
    .join('\n');
}

function getExpectations(unit: UnitTest): string[] {
  const expectations = ['expect(result).to.be.eql();'];

  expectations.push(...unit.parameters.map((parameter) => `expect(${parameter.name}).to.be.calledOnceWithExactly();`));

  return expectations;
}
