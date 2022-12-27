import { usefulActionFactory } from '../../../src/domain/actions/useful-action';

describe('usefulActionFactory', () => {
  const buildTestContext = ({} = {}) => {
    return {
      useful: usefulActionFactory(),
    };
  };

  it('should', async () => {
    const { useful } = buildTestContext();
    const result = await useful();
    expect(result).to.be.eql();
  });
});
