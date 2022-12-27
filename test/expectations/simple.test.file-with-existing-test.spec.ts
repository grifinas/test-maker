import { FileService } from '../src/file-service';
import { fileWithExistingTestFactory } from '../src/file-with-existing-test';
import { Function1 } from '../src/file1';
import { stubType, stubFn } from '@stub/functions';

describe('fileWithExistingTestFactory', () => {
  const getFile1 = () => stubFn<Function1>();
  const getFileService = () => stubType<FileService>();

  const buildTestContext = ({
    fileService = getFileService(),
    file1 = getFile1(),
  } = {}) => {
    return {
      fileService,
      file1,
      fileWithExistingTest: fileWithExistingTestFactory(fileService, file1),
    };
  };

  it('should', async () => {
    const { file1, fileWithExistingTest } = buildTestContext();
    const result = fileWithExistingTest();

    expect(result).to.be.eql();
    expect(file1).to.be.calledOnceWithExactly();
  });
});
