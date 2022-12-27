import { Function1 } from '../src/file1';
import { Function2 } from '../src/file2';
import { FileService } from '../src/file-service';
import { ServiceWithBothTests } from '../src/service-with-both-tests';
import { UsefulAction } from '../src/domain/actions/useful-action';
import { Random } from '../src/random';
import { stubFn, stubType } from '@stub/functions';

describe('ServiceWithBothTests', () => {
  const getAction = () => stubFn<UsefulAction>();

  const getRandom = () => stubFn<Random>();

  const getFn1 = () => stubFn<Function1>();

  const getFn2 = () => stubFn<Function2>();

  const getFileService = () => stubType<FileService>();

  const buildTestContext = ({
    fn1 = getFn1(),
    fn2 = getFn2(),
    fileService = getFileService(),
  } = {}) => {
    return {
      fn1,
      fn2,
      fileService,
      serviceWithBothTests: new ServiceWithBothTests(fn1, fn2, fileService),
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

  describe('newFn', () => {
    it('should', async () => {
      const { fn1, fn2, fileService, serviceWithBothTests } =
        buildTestContext();
      const result = await serviceWithBothTests.newFn();

      expect(result).to.be.eql();
      expect(fn1).to.be.calledOnceWithExactly();
      expect(fn2).to.be.calledOnceWithExactly();
      expect(fileService).to.be.calledOnceWithExactly();
    });
  });
});
