import { Parameter } from './parameter';
import { GroupedImports } from '../actions';

export interface UnitTest {
  functions: string[];
  imports: GroupedImports;
  isClass: boolean;
  isLibrary: boolean;
  name: string;
  parameters: Parameter[];
  path: string;
}
