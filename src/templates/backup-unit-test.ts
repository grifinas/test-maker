interface Params {
  unitName: string;
}

export function backupUnitTestTemplate({ unitName }: Params) {
  return `describe('${unitName}', () => {
  it('should', async () => {
  });
});
`;
}
