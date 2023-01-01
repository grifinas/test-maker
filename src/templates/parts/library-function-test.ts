interface Params {
  testName: string;
  expectations: string;
}

export function libraryFunctionTestTemplate({ testName, expectations }: Params) {
  return `describe('${testName}', () => {
  it('should', async () => {
    const result = ${testName}();

    ${expectations}
  });
});
`;
}
