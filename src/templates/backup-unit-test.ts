interface Params {
  unitName: string;
}

export function backupUnitTestTemplate({ unitName }: Params): string {
  return `describe('${unitName}', () => {
  it('should', async () => {
  });
});
`;
}
