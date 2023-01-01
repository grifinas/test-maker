import { File } from 'typescript-parser';
import { FilePathService } from '../services';
import { TestTypes } from '../interfaces';

export function getTestName(file: File, type: string): string {
  switch (type) {
    case TestTypes.UNIT:
      return FilePathService.getFileTestPath(file, 'spec');
    case TestTypes.IT:
      return FilePathService.getFileTestPath(file, 'test');
    default:
      throw new Error(`Unknown test type: ${type}`);
  }
}
