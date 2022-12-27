import { Import } from './get-imports';
import { ClassDeclaration, InterfaceDeclaration } from 'typescript-parser';
import { getParser } from './parser';
import { FilePathService } from './services/file-path-service';

export async function isImportClassLike(subject: Import): Promise<boolean> {
  const path = FilePathService.resolveAbsolutePath(subject.path);
  try {
    const parsed = await getParser().parseFile(path, '');

    const declaration = parsed.declarations.find((declaration) => declaration.name === subject.specifier);
    if (declaration === undefined) {
      throw new Error(`Failed to find specifier: ${subject.specifier} in ${subject.path}`);
    }

    return declaration instanceof ClassDeclaration || declaration instanceof InterfaceDeclaration;
  } catch (e) {
    console.error(
      `Failed to understand if ${subject.specifier} from ${subject.path} is a class, falling back to function`,
      e
    );

    return false;
  }
}
