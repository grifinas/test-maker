import { TemplateService } from '../../services';

interface Params {
  expectations: string;
  testName: string;
}

export const TEMPLATE_LIBRARY_FUNCTION = 'TEMPLATE_LIBRARY_FUNCTION';
TemplateService.register(
  TEMPLATE_LIBRARY_FUNCTION,
  libraryFunctionTestTemplate,
);

function libraryFunctionTestTemplate({
  testName,
  expectations,
}: Params): string {
  return `describe('${testName}', () => {
  it('should', async () => {
    const result = ${testName}();

    ${expectations}
  });
});
`;
}
