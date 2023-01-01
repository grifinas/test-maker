import { ParameterDeclaration } from 'typescript-parser';
import { Parameter } from '../entities/parameter';
import { isImportClassLike } from '../lib/is-import-class-like';
import { Imports } from '../actions/get-imports';

export async function transformParameters(
  parameters: ParameterDeclaration[],
  imports: Imports,
): Promise<Parameter[]> {
  return Promise.all(
    parameters.map(async (parameter) => {
      if (!parameter.type) {
        return {
          isClass: false,
          name: parameter.name,
          isGeneric: false,
        };
      }
      const parameterType = parameter.type.replace(/<.*/, '');
      const parameterImport = imports.get(parameterType);
      return {
        isClass: parameterImport
          ? await isImportClassLike(parameterImport)
          : false,
        name: parameter.name,
        type: parameterType,
        isGeneric: parameter.type.includes('<'),
        typeWithArguments: parameter.type,
      };
    }),
  );
}
