interface Params {
  buildTestContext: string;
  imports: string;
  tests: string;
  unitName: string;
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
