import { Import } from '../actions';
import { FilePathService } from '../services';
import { existsSync, readFileSync } from 'fs';

export function getTypeFile(subject: Import): string {
  const { path } = subject;
  if (!FilePathService.isNodeModule(path)) {
    if (path.startsWith('@')) {
      // const packageJson = readPackageJson(path);
      //TODO handle aliases
    }
    return path;
  }

  const packageRoot = `${FilePathService.getRoot()}/node_modules/${path}`;

  const libPackageJson = readPackageJson<{ types: string }>(packageRoot);
  const typesPath = libPackageJson['types'] || '';

  if (typesPath) {
    return `${packageRoot}/${typesPath}`;
  }

  const separateTypesFile = `${FilePathService.getRoot()}/node_modules/@types/${path}/index.d.ts`;

  if (existsSync(separateTypesFile)) {
    return separateTypesFile;
  }

  if (existsSync(`${packageRoot}/index.d.ts`)) {
    return `${packageRoot}/index.d.ts`;
  }

  throw new Error('could not find types file');
}

function readPackageJson<T extends object>(path: string): T {
  try {
    return JSON.parse(readFileSync(`${path}/package.json`).toString());
  } catch (e) {
    return {} as T;
  }
}
