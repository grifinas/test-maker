import { format, resolveConfig } from 'prettier';
import { saveFile } from './save-file';

export async function savePromisedContent(
  contentPromise: Promise<string>,
  path: string,
): Promise<void> {
  const [content, prettierConfig] = await Promise.all([
    contentPromise,
    resolveConfig(path),
  ]);

  content &&
    (await saveFile(
      path,
      format(content, { ...prettierConfig, filepath: path }),
    ));
}
