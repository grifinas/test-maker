interface Params {
  parametersAndSubject: string;
  testSubjectName: string;
  expectations: string;
}

export function itShouldUnitTemplate({ parametersAndSubject, testSubjectName, expectations }: Params) {
  return `it('should', async () => {
    const { ${parametersAndSubject} } = buildTestContext();
    const result = await ${testSubjectName}();

    ${expectations}
});
`;
}
