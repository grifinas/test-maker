import { ServiceWithBothTests } from '../src/service-with-both-tests';
import { UsefulAction } from '../src/domain/actions/useful-action';
import { Random } from '../src/random';
import { stubFn } from '@stub/functions';

describe('ServiceWithBothTests', () => {
  const getAction = () => stubFn<UsefulAction>();

  const getRandom = () => stubFn<Random>();

  const buildTestContext = ({
    action = getAction(),
    random = getRandom(),
  } = {}) => {
    return {
      action,
      random,
      serviceWithBothTests: new ServiceWithBothTests(action, random),
    };
  };

  describe('bar', () => {
    it('should', async () => {
      const { action, random, serviceWithBothTests } = buildTestContext();
      const result = serviceWithBothTests.bar();

      expect(result).to.be.eql();
      expect(action).to.be.calledOnceWithExactly();
      expect(random).to.be.calledOnceWithExactly();
    });
  });
});
