import { Import } from '../actions';
import { ClassDeclaration, InterfaceDeclaration } from 'typescript-parser';
import { getDeclaration } from './get-declaration';

export async function isImportClassLike(subject: Import): Promise<boolean> {
  try {
    const declaration = await getDeclaration(subject);

    return (
      declaration instanceof ClassDeclaration ||
      declaration instanceof InterfaceDeclaration
    );
  } catch (e) {
    console.log(subject, e);

    console.error(
      `Failed to understand if ${subject.specifier} from ${subject.path} is a class, falling back to function`,
      e,
    );

    return false;
  }
}
