import { Imports } from "../get-imports";
import { ClassDeclaration, File, FunctionDeclaration } from "typescript-parser";

export interface FileContext {
  imports: Imports;
  declarations: (FunctionDeclaration | ClassDeclaration)[];
  file: File;
  path: string;
}
