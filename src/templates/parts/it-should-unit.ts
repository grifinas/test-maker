interface Params {
  expectations: string;
  parametersAndSubject: string;
  testSubjectName: string;
}

export function itShouldUnitTemplate({
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
