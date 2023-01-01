import { TemplateService } from '../../services';

interface Params {
  expectations: string;
  parametersAndSubject: string;
  testName: string;
  testSubjectName: string;
}

export const TEMPLATE_FUNCTION_TEST = 'TEMPLATE_FUNCTION_TEST';
TemplateService.register(TEMPLATE_FUNCTION_TEST, functionTestTemplate);

function functionTestTemplate({
  testName,
  parametersAndSubject,
  testSubjectName,
  expectations,
}: Params): string {
  return `describe('${testName}', () => {
  it('should', async () => {
    const { ${parametersAndSubject} } = buildTestContext();
    const result = await ${testSubjectName}.${testName}();

    ${expectations}
  });
});
`;
}
