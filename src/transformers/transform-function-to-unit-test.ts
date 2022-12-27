import { FunctionDeclaration } from "typescript-parser";
import { transformParameters } from "./transform-parameters";
import { TestBuilder } from "../entities/test-builder";
import { FileContext } from "../entities/file-context";

export async function transformFunctionToUnitTest(
  fileContext: FileContext,
  testBuilder: TestBuilder
): Promise<TestBuilder> {
  const declaration = fileContext.declarations[0] as FunctionDeclaration;
  const parameters = await transformParameters(
    declaration.parameters,
    fileContext.imports
  );

  testBuilder.name = declaration.name;
  testBuilder.addParameters(parameters);
  testBuilder.addFunction(declaration.name);

  return testBuilder;
}
