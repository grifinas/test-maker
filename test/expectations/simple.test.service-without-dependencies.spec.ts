import { ServiceWithoutDependencies } from '../src/service-without-dependencies';

describe('ServiceWithoutDependencies', () => {
  const buildTestContext = ({} = {}) => {
    return {
      serviceWithoutDependencies: new ServiceWithoutDependencies(),
    };
  };

  describe('bar', () => {
    it('should', async () => {
      const { serviceWithoutDependencies } = buildTestContext();
      const result = await serviceWithoutDependencies.bar();

      expect(result).to.be.eql();
    });
  });
});
