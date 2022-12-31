import { File } from 'typescript-parser';
import { backupUnitTestTemplate } from '../../templates/backup-unit-test';

export function makeBackupUnitTest(file: File): string {
  const unitName = file.filePath
    .substring(file.filePath.lastIndexOf('/') + 1)
    .replace('.ts', '');

  return backupUnitTestTemplate({
    unitName,
  });
}
