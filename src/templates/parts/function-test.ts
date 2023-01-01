interface Params {
  expectations: string;
  parametersAndSubject: string;
  testName: string;
  testSubjectName: string;
}

export function functionTestTemplate({
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
