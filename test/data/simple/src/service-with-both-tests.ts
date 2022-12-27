import { Function1 } from './file1';
import { Function2 } from './file2';
import { FileService } from './file-service';

export class ServiceWithBothTests {
  constructor(private readonly fn1: Function1, private readonly fn2: Function2, private readonly fileService: FileService) {}

  bar() {
    this.fn1();
    this.fn2();
    this.fileService.foo();
  }

  newFn() {
    console.log('new!');
  }
}
