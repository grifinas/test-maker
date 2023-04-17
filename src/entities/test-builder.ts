import { GroupedImports, getImportsFromParameters } from '../actions';
import { Parameter } from './parameter';
import { FileContext } from './file-context';
import { FilePathService, StubService } from '../services';
import { UnitTest } from './unit-test';
import { Stub } from '../interfaces/stub';

export interface BuilderParameter extends Parameter {
  stub: Stub;
}

export class TestBuilder {
  private readonly imports = new Map<string, Set<string>>();
  private readonly functions: string[] = [];
  private readonly parameters: BuilderParameter[] = [];
  private _isClass = false;
  private _isLibrary = false;

  private _name = '';

  constructor(private readonly fileContext: FileContext) {}

  addImport(path: string, components: string[]): void {
    const existingImports = this.imports.get(path) || new Set<string>();
    components.forEach((specifier) => existingImports.add(specifier));
    if (!this.imports.has(path)) {
      this.imports.set(path, existingImports);
    }
  }

  addImports(imports: GroupedImports): void {
    imports.forEach((components, path) => {
      this.addImport(path, components);
    });
  }

  importSelf(fileContext: FileContext): void {
    this.addImport(
      FilePathService.getImportString(
        fileContext.path,
        fileContext.file.filePath,
      ),
      fileContext.declarations.map((declaration) => declaration.name),
    );
  }

  async addParameters(parameters: Parameter[]): Promise<void> {
    this.addImports(
      getImportsFromParameters(
        parameters,
        this.fileContext.imports,
        this.fileContext.path,
      ),
    );
    await Promise.all(parameters.map((param) => this.addParameter(param)));
  }

  addFunction(fn: string): void {
    this.functions.push(fn);
  }

  async addParameter(parameter: Parameter): Promise<void> {
    const stub = await StubService.getStub(parameter);
    this.parameters.push({ ...parameter, stub });
    this.addImport(stub.path, [stub.specifier]);
  }

  set isClass(value: boolean) {
    this._isClass = value;
  }

  set isLibrary(value: boolean) {
    this._isLibrary = value;
  }

  set name(value: string) {
    this._name = value;
  }

  build(): UnitTest {
    const imports: GroupedImports = new Map<string, string[]>();
    this.imports.forEach((value, key) => {
      imports.set(key, Array.from(value));
    });

    return {
      isClass: this._isClass,
      name: this._name,
      path: this.fileContext.path,
      functions: this.functions,
      imports,
      isLibrary: this._isLibrary,
      parameters: this.parameters,
    };
  }
}
