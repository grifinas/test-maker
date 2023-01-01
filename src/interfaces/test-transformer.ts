import { FileContext, TestBuilder } from '../entities';

export type TestTransformer = (
  fileContext: FileContext,
  testBuilder: TestBuilder,
) => Promise<TestBuilder>;
