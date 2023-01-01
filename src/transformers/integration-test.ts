import { TestRegistry } from '../services';
import { FileContext, TestBuilder } from '../entities';
import { TestTypes } from '../interfaces';

TestRegistry.register(TestTypes.IT, transformer);

async function transformer(
  fileContext: FileContext,
  testBuilder: TestBuilder,
): Promise<TestBuilder> {
  return testBuilder;
}
