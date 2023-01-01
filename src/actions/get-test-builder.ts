import { FileContext, TestBuilder } from '../entities';

export function getTestBuilder(fileContext: FileContext): TestBuilder {
  const builder = new TestBuilder(fileContext);
  builder.importSelf(fileContext);

  return builder;
}
