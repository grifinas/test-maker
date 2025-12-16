import { UnitTest } from '../../entities';

export const template = (test: UnitTest) => {
  const importStrings: string[] = [];

  test.imports.forEach((importGroup, path) => {
    importStrings.push(`import { ${importGroup.join(', ')} } from '${path}';`);
  });

  return importStrings.join('\n');
};
