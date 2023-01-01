import { File } from 'typescript-parser';
import { FilePathService } from '../services/file-path-service';
import { TestTypes } from '../interfaces/get-test-type';

export function getTestType(file: File): string {
  return FilePathService.isIntegrationTest(file)
    ? TestTypes.IT
    : TestTypes.UNIT;
}
