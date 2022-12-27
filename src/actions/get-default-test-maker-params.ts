import { ConstructorInput } from "../test-maker";
import { getTestName } from "./get-test-name";
import { getTestType } from "./get-test-type";
import { savePromisedContent } from "./save-promised-content";
import { getTestBuilder } from "./get-test-builder";

export function getDefaultTestMakerParams(): ConstructorInput {
  return {
    getTestName,
    getTestType,
    savePromisedContent,
    getTestBuilder,
  };
}
