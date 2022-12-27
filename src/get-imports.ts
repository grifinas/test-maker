import { File, NamedImport } from 'typescript-parser';
import { FilePathService } from './services/file-path-service';

export type Imports = Map<string, Import>;
export interface Import {
  path: string;
  specifier: string;
}

export function getImports(file: File): Imports {
  const imports = new Map<string, Import>();
  file.imports.forEach(imp => {
    if (imp instanceof NamedImport) {
      imp.specifiers.forEach(specifier => {
        imports.set(specifier.alias || specifier.specifier, {
          specifier: specifier.specifier,
          path: getPath(file, imp),
        });
      });
    }
  });
  return imports;
}

function getPath(file: File, namedImport: NamedImport): string {
  // If it's a library dont modify the path
  if (namedImport.libraryName.startsWith('@') || namedImport.libraryName.match(/^[a-z]/)) {
    return namedImport.libraryName;
  }

  return FilePathService.getImportAbsolutePath(file, namedImport);
}
