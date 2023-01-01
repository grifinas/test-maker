interface Params {
  mockFunctionDI: string;
  mocks: string;
  parameters: string;
  testSubject: string;
}

export function buildTestContextTemplate({
  mocks,
  mockFunctionDI,
  parameters,
  testSubject,
}: Params): string {
  return `${mocks}

const buildTestContext = ({${mockFunctionDI}} = {}) => {
    return {
        ${parameters}
        ${testSubject},
    };
};
`;
}
