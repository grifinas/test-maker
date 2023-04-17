import { Import } from '../actions';
import { AllExport, Declaration, NamedExport } from 'typescript-parser';
import { FilePathService } from '../services';
import { parseFile } from '../parser';
import { File } from 'typescript-parser/resources/File';
import { AssignedExport } from 'typescript-parser/exports/AssignedExport';
import { getTypeFile } from './get-type-file';

/*
 * Types:
 *  AllExport: export * from './foo';
 *  AssignedExport: export * as foo from './foo';
 *  NamedExport: export {Foo} from './foo';
 * */

export async function getDeclaration(subject: Import): Promise<Declaration> {
  const path = getTypeFile(subject);
  const parsed = await parseFile(path, '');
  const declaration = findAmongDeclarations(parsed, subject);

  if (declaration) {
    return declaration;
  }

  return findAmongExports(parsed, subject);
}

function findAmongDeclarations(
  parsed: File,
  subject: Import,
): Declaration | undefined {
  return parsed.declarations.find(
    (declaration) => declaration.name === subject.specifier,
  );
}

async function findAmongExports(
  parsed: File,
  subject: Import,
): Promise<Declaration> {
  const namedExports = parsed.exports.filter(
    (ex) => ex instanceof NamedExport,
  ) as NamedExport[];
  const otherExports = parsed.exports.filter(
    (ex) => !(ex instanceof NamedExport),
  ) as (AssignedExport | AllExport)[];

  const validNamedExport = namedExports.find(({ specifiers = [] }) =>
    specifiers.find(
      (specifier) =>
        (specifier.alias || specifier.specifier) === subject.specifier,
    ),
  );
  if (validNamedExport) {
    const path = `${FilePathService.getPathWithoutFile(
      parsed.filePath,
    )}/${dropDotSlashAddTS(validNamedExport.from)}`;
    const realDeclarationFile = await parseFile(path, '');
    const declaration = findAmongDeclarations(realDeclarationFile, subject);
    if (!declaration) {
      throw new Error(
        `Failed to find specifier: ${subject.specifier} in ${subject.path}`,
      );
    }

    return declaration;
  }

  // console.log('in other exports?', parsed);

  return findInOtherExports(
    FilePathService.getPathWithoutFile(parsed.filePath),
    otherExports,
    subject,
  );
}

async function findInOtherExports(
  root: string,
  otherExports: (AssignedExport | AllExport)[],
  subject: Import,
): Promise<Declaration> {
  const files = await Promise.all(
    otherExports.map((ex) => {
      const from =
        ex instanceof AssignedExport ? ex.declarationIdentifier : ex.from;

      if (from.endsWith('/')) {
        //TODO support directories
        return null;
      }

      const path = `${root}/${dropDotSlashAddTS(from)}`;
      console.log('looking for ', subject, ' in ', path);

      return parseFile(path, '');
    }),
  );
  for (const file of files) {
    const declaration = file && findAmongDeclarations(file, subject);
    if (declaration) {
      return declaration;
    }
  }

  throw new Error(
    `Failed to find specifier: ${subject.specifier} in ${subject.path}`,
  );
}

function dropDotSlashAddTS(path: string): string {
  //TODO not guaranteed to be .d.ts
  return `${path.replace('./', '')}.d.ts`;
}
