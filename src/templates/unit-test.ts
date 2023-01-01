interface Params {
  imports: string;
  unitName: string;
  buildTestContext: string;
  tests: string;
}

export function unitTestTemplate({
  imports,
  unitName,
  buildTestContext,
  tests,
}: Params): string {
  return `${imports}

describe('${unitName}', () => {
  ${buildTestContext}

  ${tests}
});
`;
}
