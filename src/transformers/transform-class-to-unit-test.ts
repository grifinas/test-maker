import { ClassDeclaration, DeclarationVisibility } from "typescript-parser";
import { transformParameters } from "./transform-parameters";
import { TestBuilder } from "../entities/test-builder";
import { FileContext } from "../entities/file-context";

export async function transformClassToUnitTest(
  fileContext: FileContext,
  testBuilder: TestBuilder
): Promise<TestBuilder> {
  const declaration = fileContext.declarations[0] as ClassDeclaration;

  const parameters = await transformParameters(
    declaration.ctor?.parameters || [],
    fileContext.imports
  );

  testBuilder.addParameters(parameters);
  testBuilder.isClass = true;
  declaration.methods
    .filter(
      (method) =>
        method.visibility === undefined ||
        method.visibility === DeclarationVisibility.Public
    )
    .forEach((method) => testBuilder.addFunction(method.name));
  testBuilder.name = declaration.name;

  return testBuilder;
}
