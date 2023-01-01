import { FilePathService, TestRegistry, TestViewRegistry } from './services';
import { getParser } from './parser';
import {
  GetTestBuilder,
  GetTestName,
  GetTestType,
  SavePromisedContent,
} from './interfaces';
import { existsSync } from 'fs';
import { getDefaultTestMakerParams, getFileContext } from './actions';
import { makeBackupUnitTest } from './views/make-backup-unit-test';

export interface ConstructorInput {
  getTestBuilder: GetTestBuilder;
  getTestName: GetTestName;
  getTestType: GetTestType;
  savePromisedContent: SavePromisedContent;
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

  public async makeTest(file: string, forcedTestType?: string): Promise<void> {
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
