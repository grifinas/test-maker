interface Params {
  expectations: string;
  testName: string;
}

export function libraryFunctionTestTemplate({
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
