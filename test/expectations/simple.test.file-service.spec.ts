import { FileService } from '../src/file-service';
import { FunctionWithDependencies } from '../src/file-with-dependencies';
import { stubFn } from '@stub/functions';

describe('FileService', () => {
  const getDep = () => stubFn<FunctionWithDependencies>();

  const buildTestContext = ({ dep = getDep() } = {}) => {
    return {
      dep,
      fileService: new FileService(dep),
    };
  };

  describe('foo', () => {
    it('should', async () => {
      const { dep, fileService } = buildTestContext();
      const result = await fileService.foo();

      expect(result).to.be.eql();
      expect(dep).to.be.calledOnceWithExactly();
    });
  });
});
