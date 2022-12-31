import { FilePathService } from './services/file-path-service';
import { getParser } from './parser';
import { GetTestType } from './interfaces/get-test-type';
import { GetTestName } from './interfaces/get-test-name';
import { existsSync } from 'fs';
import { TestViewRegistry } from './services/test-view-registry';
import { getFileContext } from './actions/get-file-context';
import { TestRegistry } from './services/test-registry';
import { SavePromisedContent } from './interfaces/save-promised-content';
import { getDefaultTestMakerParams } from './actions/get-default-test-maker-params';
import { GetTestBuilder } from './interfaces/get-test-builder';
import { makeBackupUnitTest } from './views/make-backup-unit-test';

export interface ConstructorInput {
  getTestType: GetTestType;
  getTestName: GetTestName;
  savePromisedContent: SavePromisedContent;
  getTestBuilder: GetTestBuilder;
}

export class TestMaker {
  private readonly getTestType: GetTestType;
  private readonly getTestName: GetTestName;
  private readonly savePromisedContent: SavePromisedContent;
  private readonly testViewRegistry: TestViewRegistry = new TestViewRegistry();
  private readonly testRegistry: TestRegistry = new TestRegistry();
  private readonly getTestBuilder: GetTestBuilder;

  constructor(di: Partial<ConstructorInput> = {}) {
    const { getTestType, getTestName, savePromisedContent, getTestBuilder } = {
      ...getDefaultTestMakerParams(),
      ...di,
    };
    this.getTestType = getTestType;
    this.getTestName = getTestName;
    this.getTestBuilder = getTestBuilder;
    this.savePromisedContent = savePromisedContent;
  }

  public async makeTest(file: string, forcedTestType?: string) {
    FilePathService.setRootFrom(file);
    const parsed = await getParser().parseFile(file, '');
    const type = forcedTestType ?? this.getTestType(parsed);
    const testName = this.getTestName(parsed, type);

    const toView = existsSync(testName)
      ? this.testViewRegistry.getUpdate(type)
      : this.testViewRegistry.getCreate(type);
    const context = getFileContext(parsed, testName);
    const toTest = this.testRegistry.get(type);

    if (!toTest) {
      throw new Error(`Could not find test transformer for type: ${type}`);
    }
    if (!toView) {
      throw new Error(`Could not find test view transformer for type: ${type}`);
    }

    const builder = this.getTestBuilder(context);

    const result = toTest(context, builder)
      .then((builder) => builder.build())
      .then(toView)
      .catch((e) => {
        console.error(
          'Error when making test data, falling back to simple test',
          e,
        );
        return makeBackupUnitTest(parsed);
      });

    return this.savePromisedContent(result, testName);
  }
}
