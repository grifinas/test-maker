import { TemplateService } from '../../services';
import { TEMPLATE_EXPECTATIONS } from './expectations';

interface Params {
  functionName: string;
}

export const TEMPLATE_LIBRARY_FUNCTION = 'TEMPLATE_LIBRARY_FUNCTION';
TemplateService.register<Params>(
  TEMPLATE_LIBRARY_FUNCTION,
  ({ include, extra }) => {
    const { functionName } = extra || {};

    return `describe('${functionName}', () => {
  it('should', async () => {
    const result = ${functionName}();

    ${include(TEMPLATE_EXPECTATIONS)}
  });
});
`;
  },
);
