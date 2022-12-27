import { File } from "typescript-parser";
import { TestBuilder } from "../entities/test-builder";
import { FileContext } from "../entities/file-context";

export function transformFunctionsToUnitTest(
  fileContext: FileContext,
  testBuilder: TestBuilder
): TestBuilder {
  testBuilder.name = getName(fileContext.file);
  testBuilder.isLibrary = true;
  fileContext.declarations.map((declaration) =>
    testBuilder.addFunction(declaration.name)
  );

  return testBuilder;
}

function getName(file: File): string {
  const pathParts = file.filePath.split("/");
  return pathParts[pathParts.length - 1].replace(".ts", "");
}
