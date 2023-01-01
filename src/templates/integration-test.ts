interface Params {
  integrationName: string;
}

export function integrationTestTemplate({ integrationName }: Params): string {
  return `describe('${integrationName}', () => {
  it('should', async () => {
  });
});
`;
}
