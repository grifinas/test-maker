import { Parameter } from '../entities/parameter';
import { Imports } from './get-imports';
import { FilePathService } from '../services/file-path-service';

export type GroupedImports = Map<string, string[]>;

export function getImportsFromParameters(
  parameters: Parameter[],
  allImports: Imports,
  testPath: string,
): GroupedImports {
  const imports = new Map<string, string[]>();

  parameters.forEach((parameter) => {
    const parameterImport = parameter.type && allImports.get(parameter.type);
    if (parameterImport) {
      const path = FilePathService.getImportString(
        testPath,
        parameterImport.path,
      );
      const existingImports = imports.get(path) || [];
      existingImports.push(parameter.type as string);
      imports.set(path, existingImports);
    }
    if (parameter.isGeneric && parameter.typeWithArguments) {
      const genericArguments = parameter.typeWithArguments
        .replace(/.*<(.*)>/, '$1')
        .split(',')
        .map((argument) => argument.trim());

      genericArguments.forEach((argument) => {
        const argumentImport = allImports.get(argument);
        if (!argumentImport) {
          throw new Error(
            `Failed to find argument ${argument} of type ${parameter.typeWithArguments}`,
          );
        }

        const path = FilePathService.getImportString(
          testPath,
          argumentImport.path,
        );
        const existingImports = imports.get(path) || [];
        existingImports.push(argument);
        imports.set(path, existingImports);
      });
    }
  });

  return imports;
}
