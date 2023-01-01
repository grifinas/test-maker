import { Imports } from '../actions/get-imports';
import { ClassDeclaration, File, FunctionDeclaration } from 'typescript-parser';

export interface FileContext {
  declarations: (FunctionDeclaration | ClassDeclaration)[];
  file: File;
  imports: Imports;
  path: string;
}
