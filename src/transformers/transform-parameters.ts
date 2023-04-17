import { ParameterDeclaration } from 'typescript-parser';
import { Parameter } from '../entities';
import { Imports } from '../actions/get-imports';

export async function transformParameters(
  parameters: ParameterDeclaration[],
  imports: Imports,
): Promise<Parameter[]> {
  return Promise.all(parameters.map((p) => transformParameter(p, imports)));
}

async function transformParameter(
  parameter: ParameterDeclaration,
  imports: Imports,
): Promise<Parameter> {
  if (!parameter.type) {
    return {
      name: parameter.name,
      isGeneric: false,
    };
  }
  const parameterType = parameter.type.replace(/<.*/, '');
  const parameterImport = imports.get(parameterType);
  return {
    name: parameter.name,
    type: parameterType,
    isGeneric: parameter.type.includes('<'),
    typeWithArguments: parameter.type,
    import: parameterImport,
  };
}
