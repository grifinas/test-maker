import { factoryWithDependencies } from '../src/file-with-dependencies';
import { Function1 } from '../src/file1';
import { Function2Aliased } from '../src/file2';
import { stubFn } from '@stub/functions';

describe('factoryWithDependencies', () => {
  const getFn1 = () => stubFn<Function1>();

  const getFn2 = () => stubFn<Function2Aliased>();

  const buildTestContext = ({ fn1 = getFn1(), fn2 = getFn2() } = {}) => {
    return {
      fn1,
      fn2,
      factoryWithDependencies: factoryWithDependencies(fn1, fn2),
    };
  };

  it('should', async () => {
    const { fn1, fn2, factoryWithDependencies } = buildTestContext();
    const result = await factoryWithDependencies();
    expect(result).to.be.eql();
    expect(fn1).to.be.calledOnceWithExactly();
    expect(fn2).to.be.calledOnceWithExactly();
  });
});
