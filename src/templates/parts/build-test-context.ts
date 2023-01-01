interface Params {
  mocks: string;
  mockFunctionDI: string;
  parameters: string;
  testSubject: string;
}

export function buildTestContextTemplate({
  mocks,
  mockFunctionDI,
  parameters,
  testSubject,
}: Params) {
  return `${mocks}

const buildTestContext = ({${mockFunctionDI}} = {}) => {
    return {
        ${parameters}
        ${testSubject},
    };
};
`;
}
