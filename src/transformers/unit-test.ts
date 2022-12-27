import { TestRegistry } from "../services/test-registry";
import { TestTypes } from "../actions/get-test-type";
import { TestBuilder } from "../entities/test-builder";
import { FileContext } from "../entities/file-context";
import { ClassDeclaration, FunctionDeclaration } from "typescript-parser";
import { transformFunctionsToUnitTest } from "./transform-functions-to-unit-test";
import { transformClassToUnitTest } from "./transform-class-to-unit-test";
import { transformFunctionToUnitTest } from "./transform-function-to-unit-test";

TestRegistry.register(TestTypes.UNIT, transformer);

async function transformer(
  fileContext: FileContext,
  testBuilder: TestBuilder
): Promise<TestBuilder> {
  if (fileContext.declarations.length > 1) {
    if (!isFunctionArray(fileContext.declarations)) {
      throw new Error(
        "Multiple testable exports found, they are not all functions, cant make unit test"
      );
    }

    return transformFunctionsToUnitTest(fileContext, testBuilder);
  }

  return fileContext.declarations[0] instanceof ClassDeclaration
    ? await transformClassToUnitTest(fileContext, testBuilder)
    : await transformFunctionToUnitTest(fileContext, testBuilder);
}

function isFunctionArray(
  declarations: (ClassDeclaration | FunctionDeclaration)[]
): declarations is FunctionDeclaration[] {
  return declarations.every(
    (declaration) => declaration instanceof FunctionDeclaration
  );
}
