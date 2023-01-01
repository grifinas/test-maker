import { TemplateService } from '../../services';

interface Params {
  expectations: string;
  parametersAndSubject: string;
  testSubjectName: string;
}

export const TEMPLATE_IT_SHOULD_UNIT = 'TEMPLATE_IT_SHOULD_UNIT';
TemplateService.register(TEMPLATE_IT_SHOULD_UNIT, itShouldUnitTemplate);

function itShouldUnitTemplate({
  parametersAndSubject,
  testSubjectName,
  expectations,
}: Params): string {
  return `it('should', async () => {
    const { ${parametersAndSubject} } = buildTestContext();
    const result = await ${testSubjectName}();

    ${expectations}
});
`;
}
