import { TestBuilder } from "../entities/test-builder";
import { FileContext } from "../entities/file-context";

export function getTestBuilder(fileContext: FileContext) {
  const builder = new TestBuilder(fileContext);
  builder.importSelf(fileContext);

  return builder;
}
