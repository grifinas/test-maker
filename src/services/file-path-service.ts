import { File, NamedImport } from 'typescript-parser';
import * as fs from 'fs';

export class FilePathService {
  static root = '';

  static getImportString(testPath: string, importString: string): string {
    if (this.isNodeModule(importString) || importString.startsWith('@')) {
      return importString;
    }

    const root = this.getRoot();

    if (!importString.startsWith(root)) {
      throw new Error(
        `Import ${importString} does not start with the resolved root directory: ${root} and it's not a library`,
      );
    }

    const importFromRoot = importString.substring(root.length + 1);
    const testFromRoot = testPath.substring(root.length + 1);

    const importParts = importFromRoot.split('/');
    const testParts = testFromRoot.split('/');
    // Pop the file name itself, since we only care about directory it is in
    testParts.pop();

    const { movesUp, skip } = testParts.reduce(
      (acc, pathSegment, i) => {
        const isSame = acc.movesUp === 0 && importParts[i] === pathSegment;
        acc.skip += Number(isSame);
        acc.movesUp += Number(!isSame);
        return acc;
      },
      { movesUp: 0, skip: 0 },
    );

    const dir = movesUp ? '../'.repeat(movesUp) : './';

    return dir + importParts.slice(skip).join('/').replace('.ts', '');
  }

  /**
   * Given file and namedImport in that file, returns full path of that import
   * TODO This is not fully correct path resolution, it does not work with FQN
   * */
  static getImportAbsolutePath(file: File, namedImport: NamedImport): string {
    const lastSlashIndex = file.filePath.lastIndexOf('/');
    const currentDirectory = file.filePath.substr(0, lastSlashIndex);
    const libraryParts = namedImport.libraryName.split('../');

    if (libraryParts.length < 2) {
      return `${currentDirectory}/${namedImport.libraryName.substr(2)}.ts`;
    }

    const currentPathParts = currentDirectory.split('/');
    const newPath = currentPathParts
      .slice(0, currentPathParts.length - libraryParts.length + 1)
      .join('/');

    return `${newPath}/${libraryParts.pop()}.ts`;
  }

  static resolveAbsolutePath(path: string): string {
    if (this.isNodeModule(path)) {
      return `${FilePathService.getRoot()}/node_modules/@types/${path}/index.d.ts`;
    }
    if (path.startsWith('@')) {
      //TODO Could also be an alias
      return `${FilePathService.getRoot()}/node_modules/${path}/index.d.ts`;
    }

    return path;
  }

  static isNodeModule(path: string): boolean {
    return Boolean(path.match(/^[a-z]/));
  }

  static isIntegrationTest(file: File): boolean {
    return [
      '/request-handlers/rpc/services/',
      '/request-handlers/rest/routes/',
      '/server/repositories/',
      '/kafka-event-handlers/consumers/',
    ].some((dir) => file.filePath.indexOf(dir) > -1);
  }

  static getFileTestPath(file: File, testExtension?: 'test' | 'spec'): string {
    const realTestExtension = testExtension
      ? testExtension
      : FilePathService.isIntegrationTest(file)
      ? 'test'
      : 'spec';

    if (!file.filePath.startsWith(this.root)) {
      throw new Error(
        `File ${file.filePath} is not in resolved root: ${this.root}`,
      );
    }

    const regex = new RegExp(`${this.root}\/[^\/]+\/(.*)\.ts`);

    return file.filePath.replace(
      regex,
      `${this.root}/test/$1.${realTestExtension}.ts`,
    );
  }

  static setRootFrom(file: string) {
    if (file.indexOf('/src/') > -1) {
      this.root = file.replace(/\/src\/(.*)/, ``);
    } else {
      const parts = file.split('/');
      while (parts.length) {
        parts.pop();
        const rootCandidate = parts.join('/');
        if (fs.existsSync(`${rootCandidate}/package.json`)) {
          this.root = rootCandidate;
          return;
        }
      }
    }
  }

  static getRoot(): string {
    return this.root;
  }
}
