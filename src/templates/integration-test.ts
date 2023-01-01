import { TemplateService } from '../services';

interface Params {
  integrationName: string;
}

export const TEMPLATE_INTEGRATION_TEST = 'TEMPLATE_INTEGRATION_TEST';
TemplateService.register(TEMPLATE_INTEGRATION_TEST, integrationTestTemplate);

function integrationTestTemplate({ integrationName }: Params): string {
  return `describe('${integrationName}', () => {
  it('should', async () => {
  });
});
`;
}
