import { Import } from '../actions';

export interface Parameter {
  import?: Import;
  isGeneric: boolean;
  name: string;
  type?: string;
  typeWithArguments?: string;
}
