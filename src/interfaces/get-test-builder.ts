import { FileContext } from "../entities/file-context";
import { TestBuilder } from "../entities/test-builder";

export type GetTestBuilder = (fileContext: FileContext) => TestBuilder;
