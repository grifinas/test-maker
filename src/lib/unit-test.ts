import { Parameter } from '../entities/parameter';
import { UnitTest } from '../entities/unit-test';
import { camelCase, difference, uniq } from 'lodash';
import { GroupedImports } from '../get-imports-from-parameters';
import { Imports } from '../entities/imports';

export function getStubFunctionName(parameter: Parameter): string {
  return parameter.isClass ? 'stubType' : 'stubFn';
}

export function getTestSubjectName(unit: UnitTest): string {
  return camelCase(
    unit.isClass
      ? unit.name
      : unit.name.replace('Action', '').replace('Factory', ''),
  );
}

export async function getTestSpecificImports(
  unit: UnitTest,
): Promise<GroupedImports> {
  const imports = new Imports();

  const stubFunctions = unit.parameters.map(getStubFunctionName);

  if (stubFunctions.length) {
    imports.add('@stub/functions', ...uniq(stubFunctions));
  }

  return imports.getGroupedImports();
}

export async function makeTestSpecificImports(unit: UnitTest): Promise<string> {
  return makeImportStrings(await getTestSpecificImports(unit)).join('\n');
}

export function getMissingImports(
  current: GroupedImports,
  required: GroupedImports,
): GroupedImports {
  const needToImport: GroupedImports = new Map();
  required.forEach((requiredImports, key) => {
    const currentImports = current.get(key) || [];
    const missingImports = difference(requiredImports, currentImports);
    missingImports.length && needToImport.set(key, missingImports);
  });

  return needToImport;
}

export function makeImportStrings(groupedImports: GroupedImports): string[] {
  const result: string[] = [];

  groupedImports.forEach((imports, path) => {
    result.push(`import { ${imports.join(', ')} } from '${path}';`);
  });

  return result;
}
