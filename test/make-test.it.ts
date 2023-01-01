import { readFileSync, rmdir, unlinkSync } from 'fs';
import { expect } from './expectations';
import { saveFile } from '../src';
import { TestMaker } from '../src';
import '../src/register-default';
import { TestTypes } from '../src';

describe('Test Maker', () => {
  function expectContentIsEqual(actual: string, expected: string) {
    const actualArray = actual
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const expectedArray = expected
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    expect(actualArray).to.be.eql(expectedArray);
  }

  async function expectFile(path: string) {
    const content = getExpectedFileContents(path);
    const fullPath = getTestPath(path);

    const actual = readFileSync(fullPath).toString();
    removeIfExists(path);
    expectContentIsEqual(actual, content);
  }

  async function expectFileUpdated(
    path: string,
    callback: () => Promise<void>,
  ) {
    const expected = getExpectedFileContents(path);
    const fullPath = getTestPath(path);

    const original = readFileSync(fullPath).toString();

    await callback();
    const updated = readFileSync(fullPath).toString();

    await saveFile(fullPath, original);
    expectContentIsEqual(updated, expected);
  }

  function getExpectedFileContents(path: string): string {
    const expectationFile = `${__dirname}/expectations/${path.replace(
      /\//g,
      '.',
    )}`;
    return readFileSync(expectationFile).toString();
  }

  function removeIfExists(path: string) {
    try {
      unlinkSync(getTestPath(path));
    } catch (e) {
      return;
    }
  }

  function getTestPath(path: string): string {
    return `${__dirname}/data/${path}`;
  }

  async function runMakeTest(path: string, integrationTest?: boolean) {
    const testMaker = new TestMaker();
    if (integrationTest === undefined) {
      return testMaker.makeTest(getTestPath(path));
    }

    const type = integrationTest ? TestTypes.IT : TestTypes.UNIT;
    return testMaker.makeTest(getTestPath(path), type);
  }

  after((done) => {
    rmdir(getTestPath('deep-structure/test'), { recursive: true }, () => {});
    done();
  });

  it('should be able to generate a test for a class without dependency injection', async () => {
    await runMakeTest('simple/src/service-without-dependencies.ts');
    await expectFile('simple/test/service-without-dependencies.spec.ts');
  });

  it('should be able to generate a test for a function without dependency injection', async () => {
    await runMakeTest('simple/src/file1.ts');
    await expectFile('simple/test/file1.spec.ts');
  });

  it('should mock class dependencies', async () => {
    await runMakeTest('simple/src/file-service.ts');
    await expectFile('simple/test/file-service.spec.ts');
  });

  it('should mock function dependencies', async () => {
    await runMakeTest('simple/src/file-with-dependencies.ts');
    await expectFile('simple/test/file-with-dependencies.spec.ts');
  });

  it('should respect file paths when creating tests', async () => {
    await runMakeTest('deep-structure/src/domain/actions/useful-action.ts');
    await expectFile(
      'deep-structure/test/domain/actions/useful-action.spec.ts',
    );
  });

  it('should create test for every exported function in file', async () => {
    await runMakeTest('deep-structure/src/lib/library-file.ts');
    await expectFile('deep-structure/test/lib/library-file.spec.ts');
  });

  context('when we fail to construct unit test', () => {
    it('should fallback to simple template', async () => {
      await runMakeTest('deep-structure/src/lib/not-constructable.ts');
      await expectFile('deep-structure/test/lib/not-constructable.spec.ts');
    });
  });

  context('when test file already exists', () => {
    context('and test is integration', () => {
      it('should create unit test', async () => {
        // first run for IT test
        await runMakeTest(
          'deep-structure/src/server/repositories/repository.ts',
        );
        // second run should make unit test
        await runMakeTest(
          'deep-structure/src/server/repositories/repository.ts',
          false,
        );
        await expectFile(
          'deep-structure/test/server/repositories/repository.spec.ts',
        );
      });
    });
    context('and test is unit', () => {
      it('should update it with new dependencies', async () => {
        await expectFileUpdated(
          'simple/test/file-with-existing-test.spec.ts',
          async () => {
            await runMakeTest('simple/src/file-with-existing-test.ts');
          },
        );
      });
    });
  });

  context('when both files already exist', () => {
    it('should update unit test', async () => {
      await expectFileUpdated(
        'simple/test/service-with-both-tests.spec.ts',
        async () => {
          await runMakeTest('simple/src/service-with-both-tests.ts', false);
        },
      );
    });
  });

  context('when dependency is a node module', () => {
    it('should try to resolve the correct place', async () => {
      await runMakeTest('deep-structure/src/domain/actions/module-wrapper.ts');
      await expectFile(
        'deep-structure/test/domain/actions/module-wrapper.spec.ts',
      );
    });
  });
});
