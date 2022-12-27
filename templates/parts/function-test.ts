interface Params {
  testName: string;
  parametersAndSubject: string;
  testSubjectName: string;
  expectations: string;
}

export function functionTestTemplate({ testName, parametersAndSubject, testSubjectName, expectations }: Params) {
  return `describe('${testName}', () => {
  it('should', async () => {
    const { ${parametersAndSubject} } = buildTestContext();
    const result = await ${testSubjectName}.${testName}();

    ${expectations}
  });
});
`;
}
