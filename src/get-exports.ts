import { ClassDeclaration, File, FunctionDeclaration } from 'typescript-parser';

export function getExports(file: File): (FunctionDeclaration | ClassDeclaration)[] {
  const exports = file.declarations.filter(declaration => {
    return (
      (declaration instanceof FunctionDeclaration || declaration instanceof ClassDeclaration) && declaration.isExported
    );
  });

  return exports as (FunctionDeclaration | ClassDeclaration)[];
}
