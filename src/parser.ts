import { File, TypescriptParser } from 'typescript-parser';

const parser = new TypescriptParser();
const cache = new Map<string, File>();

export async function parseFile(path: string, rootPath: string): Promise<File> {
  const cachedFile = cache.get(path);
  if (cachedFile) {
    return Promise.resolve(cachedFile);
  }

  const file = await parser.parseFile(path, rootPath);
  cache.set(path, file);
  return file;
}
