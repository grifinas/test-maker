import { UnitTest } from '../../entities';
import * as imports from './imports';
import * as buildTestContext from './build-test-context';
import * as functionTests from './function-tests';

export const template = (test: UnitTest) => {
  return `${imports.template(test)}
  
  describe('${test.name}', () => {
    ${buildTestContext.template(test)}
    
    ${functionTests.template(test)}
  })`;
};
