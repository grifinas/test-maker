import { File } from 'typescript-parser';

import { TemplateService } from '../services';
import { TEMPLATE_BACKUP_UNIT_TEST } from '../templates';
import { UnitTest } from '../entities';

export function makeBackupUnitTest(
  templateService: TemplateService,
  file: File,
): string {
  const unitName = file.filePath
    .substring(file.filePath.lastIndexOf('/') + 1)
    .replace('.ts', '');

  return templateService.use(TEMPLATE_BACKUP_UNIT_TEST, {} as UnitTest, {
    name: unitName,
  });
}
