import { File } from 'typescript-parser';
import { getTemplateService, TEMPLATES } from '../services/template-service';

export function makeBackupUnitTest(file: File): string {
  const unitName = file.filePath.substring(file.filePath.lastIndexOf('/') + 1).replace('.ts', '');

  return getTemplateService().use(TEMPLATES.BACKUP_UNIT_TEST, {
    unitName,
  });
}
