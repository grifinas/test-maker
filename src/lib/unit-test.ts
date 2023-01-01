import { Parameter } from '../entities/parameter';
import { UnitTest } from '../entities/unit-test';
import { camelCase, difference } from 'lodash';
import { GroupedImports } from '../actions/get-imports-from-parameters';

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
