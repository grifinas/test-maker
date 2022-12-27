import { TestBuilder } from "../entities/test-builder";
import { FileContext } from "../entities/file-context";

export type TestTransformer = (
  fileContext: FileContext,
  testBuilder: TestBuilder
) => Promise<TestBuilder>;
