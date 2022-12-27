import { Parameter } from "./parameter";
import { GroupedImports } from "../get-imports-from-parameters";

export interface UnitTest {
  name: string;
  path: string;
  imports: GroupedImports;
  functions: string[];
  parameters: Parameter[];
  isClass: boolean;
  isLibrary: boolean;
}
