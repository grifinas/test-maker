import { UnitTest } from '../../entities';
import { getParameterNames, getTestSubjectName } from '../../lib/unit-test';
import { capitalize } from '../../lib';

export const template = (test: UnitTest) => {
  if (test.isLibrary) {
    return '';
  }
  const parameterNames = getParameterNames(test).join(',\n');

  const injections = test.parameters
    .map(
      (parameter) => `${parameter.name} = get${capitalize(parameter.name)}()`,
    )
    .join(', ');

  return `${dependencyMocks(test)}

const buildTestContext = ({${injections} = {}) => {
    return {
        ${parameterNames ? `${parameterNames},` : ''}
        ${testSubject(test)},
    };
};
`;
};

function dependencyMocks(test: UnitTest) {
  return test.parameters
    .map(
      (parameter) =>
        `const get${capitalize(parameter.name)} = () => ${
          parameter.stub.format
        }`,
    )
    .join('\n');
}

function testSubject(test: UnitTest) {
  const newKeyword = test.isClass ? 'new ' : '';
  const parameterNames = getParameterNames(test);

  return `${getTestSubjectName(test)}: ${newKeyword}${
    test.name
  }(${parameterNames.join(', ')})`;
}
