interface Params {
  parameterName: string;
  parameterTypeWithArguments: string;
  stubFunction: string;
}

export function dependencyMockTemplate({
  parameterName,
  stubFunction,
  parameterTypeWithArguments,
}: Params): string {
  return `const get${parameterName} = () => ${stubFunction}<${parameterTypeWithArguments}>();
`;
}
