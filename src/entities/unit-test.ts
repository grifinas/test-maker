import { GroupedImports } from '../actions';
import { BuilderParameter } from './test-builder';

export interface UnitTest {
  functions: string[];
  imports: GroupedImports;
  isClass: boolean;
  isLibrary: boolean;
  name: string;
  parameters: BuilderParameter[];
  path: string;
}
