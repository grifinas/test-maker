import { TemplateService } from '../services';

interface Params {
  unitName: string;
}

export const TEMPLATE_BACKUP_UNIT_TEST = 'TEMPLATE_BACKUP_UNIT_TEST';
TemplateService.register(TEMPLATE_BACKUP_UNIT_TEST, backupUnitTestTemplate);

function backupUnitTestTemplate({ unitName }: Params): string {
  return `describe('${unitName}', () => {
  it('should', async () => {
  });
});
`;
}
