import { TemplateService } from '../services';

export const TEMPLATE_INTEGRATION_TEST = 'TEMPLATE_INTEGRATION_TEST';
TemplateService.register(TEMPLATE_INTEGRATION_TEST, ({ test }) => {
  return `describe('${test.name}', () => {
  it('should', async () => {
  });
});
`;
});
