import { Function1 } from './file1';
import { FileService } from './file-service';

export function fileWithExistingTestFactory(
  fileService: FileService,
  file1: Function1,
) {
  return function fileWithExistingTest() {
    fileService.foo();
    return file1();
  };
}
