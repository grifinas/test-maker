import { File } from "typescript-parser";
import { FileContext } from "../entities/file-context";
import { getImports } from "../get-imports";
import { getExports } from "../get-exports";

export function getFileContext(file: File, path: string): FileContext {
  return {
    file,
    imports: getImports(file),
    declarations: getExports(file),
    path,
  };
}
