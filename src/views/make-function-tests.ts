import { UnitTest } from '../entities';
import { getTestSubjectName } from '../lib';

import { TemplateService } from '../services';
import {
  TEMPLATE_FUNCTION_TEST,
  TEMPLATE_IT_SHOULD_UNIT,
  TEMPLATE_LIBRARY_FUNCTION,
} from '../templates';

export function makeFunctionTests(
  templateService: TemplateService,
  unit: UnitTest,
  functions?: string[],
): string {
  const template = unit.isLibrary
    ? TEMPLATE_LIBRARY_FUNCTION
    : unit.isClass
    ? TEMPLATE_FUNCTION_TEST
    : TEMPLATE_IT_SHOULD_UNIT;

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
      templateService.use(template, {
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
