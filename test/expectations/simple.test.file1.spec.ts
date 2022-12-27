import { function1Factory } from '../src/file1';

describe('function1Factory', () => {
  const buildTestContext = ({} = {}) => {
    return {
      function1: function1Factory(),
    };
  };

  it('should', async () => {
    const { function1 } = buildTestContext();
    const result = await function1();
    expect(result).to.be.eql();
  });
});
