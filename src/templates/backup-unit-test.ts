import { TemplateService } from '../services';

export const TEMPLATE_BACKUP_UNIT_TEST = 'TEMPLATE_BACKUP_UNIT_TEST';
TemplateService.register<{ name: string }>(
  TEMPLATE_BACKUP_UNIT_TEST,
  ({ extra }) => {
    return `describe('${extra?.name}', () => {
  it('should', async () => {
  });
});
`;
  },
);
