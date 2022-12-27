import { GroupedImports } from '../get-imports-from-parameters';

export function makeImportStringsFromGroupedImports(imports: GroupedImports): string[] {
  const importStrings: string[] = [];

  imports.forEach((importGroup, path) => {
    importStrings.push(`import { ${importGroup.join(', ')} } from '${path}';`);
  })

  return importStrings;
}
