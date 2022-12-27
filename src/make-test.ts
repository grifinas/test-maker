import { File } from 'typescript-parser';
import { makeUnitTest } from './views/make-unit-test';
import { makeIntegrationTest } from './views/make-integration-test';
import { saveFile } from './save-file';
import { FilePathService } from './services/file-path-service';
import { makeBackupUnitTest } from './views/make-backup-unit-test';
import { UnitTest } from './entities/unit-test';
import { makeUnitTestUpdate } from './views/make-unit-test-update';
import { existsSync } from 'fs';
import { getParser } from './parser';
import { format, resolveConfig } from 'prettier';

export async function makeTest(
  file: string,
  integrationTest?: boolean,
): Promise<void> {
  FilePathService.setRootFrom(file);
  const parsed = await getParser().parseFile(file, '');
  const isIntegrationTest = integrationTest
    ? integrationTest
    : FilePathService.isIntegrationTest(parsed);
  const unitTestPath = FilePathService.getFileTestPath(parsed, 'spec');
  const integrationTestPath = FilePathService.getFileTestPath(parsed, 'test');

  if (isIntegrationTest && !existsSync(integrationTestPath)) {
    return createIntegrationTest(parsed, integrationTestPath);
  }
  if (existsSync(unitTestPath)) {
    return updateUnitTest(parsed, unitTestPath);
  }

  return createUnitTest(parsed, unitTestPath);
}

async function save(contentPromise: string | null, path: string) {
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

async function updateUnitTest(file: File, testPath: string): Promise<void> {
  const test = await getTestOrNull(file);
  const toSave = test ? await makeUnitTestUpdate(test, testPath) : null;

  return save(toSave, testPath);
}

async function createIntegrationTest(
  file: File,
  testPath: string,
): Promise<void> {
  const test = await getTestOrNull(file);

  return save(
    test ? makeIntegrationTest(test) : makeBackupUnitTest(file),
    testPath,
  );
}

async function createUnitTest(file: File, testPath: string): Promise<void> {
  const test = await getTestOrNull(file);
  const toSave = test ? await makeUnitTest(test) : makeBackupUnitTest(file);

  return save(toSave, testPath);
}

async function getTestOrNull(_file: File): Promise<UnitTest | null> {
  try {
    // return await transformFileToTest(file);
    return null;
  } catch (e) {
    console.error(
      `Failed to transform file into test, falling back to simple test`,
      e,
    );
  }
  return null;
}
