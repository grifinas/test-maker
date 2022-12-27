import { ModuleWrapper } from '../../../src/domain/actions/module-wrapper';
import { stubFunction } from 'stubModule';
import { AliasModule } from '@alias/ourModule';
import { stubFn, stubType } from '@stub/functions';

describe('ModuleWrapper', () => {
  const getStub = () => stubFn<stubFunction>();
  const getAlias = () => stubType<AliasModule>();

  const buildTestContext = ({ stub = getStub(), alias = getAlias() } = {}) => {
    return {
      stub,
      alias,
      moduleWrapper: new ModuleWrapper(stub, alias),
    };
  };

  describe('a', () => {
    it('should', async () => {
      const { stub, alias, moduleWrapper } = buildTestContext();
      const result = await moduleWrapper.a();

      expect(result).to.be.eql();
      expect(stub).to.be.calledOnceWithExactly();
      expect(alias).to.be.calledOnceWithExactly();
    });
  });
});
