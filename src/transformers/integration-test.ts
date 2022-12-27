import { TestRegistry } from "../services/test-registry";
import { TestTypes } from "../actions/get-test-type";
import { TestBuilder } from "../entities/test-builder";
import { FileContext } from "../entities/file-context";

TestRegistry.register(TestTypes.IT, transformer);

async function transformer(
  fileContext: FileContext,
  testBuilder: TestBuilder
): Promise<TestBuilder> {
  return testBuilder;
}
