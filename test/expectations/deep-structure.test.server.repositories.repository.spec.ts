import { Repository } from '../../../src/server/repositories/repository';
import { UsefulAction } from '../../../src/domain/actions/useful-action';
import { stubFn } from '@stub/functions';

describe('Repository', () => {
  const getAction = () => stubFn<UsefulAction>();
  const buildTestContext = ({ action = getAction() } = {}) => {
    return {
      action,
      repository: new Repository(action),
    };
  };
  describe('baz', () => {
    it('should', async () => {
      const { action, repository } = buildTestContext();
      const result = await repository.baz();
      expect(result).to.be.eql();
      expect(action).to.be.calledOnceWithExactly();
    });
  });
});
