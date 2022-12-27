interface Params {
  parameterName: string;
  stubFunction: string;
  parameterTypeWithArguments: string;
}

export function dependencyMockTemplate({ parameterName, stubFunction, parameterTypeWithArguments }: Params) {
  return `const get${parameterName} = () => ${stubFunction}<${parameterTypeWithArguments}>();
`;
}
