import { FunctionWithDependencies } from "./file-with-dependencies";

export class FileService {
  constructor(private readonly dep: FunctionWithDependencies) {}

  foo() {
    console.log('this is a program');
  }
}
