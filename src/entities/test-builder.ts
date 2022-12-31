import {
  getImportsFromParameters,
  GroupedImports,
} from '../get-imports-from-parameters';
import { Parameter } from './parameter';
import { FileContext } from './file-context';
import { FilePathService } from '../services/file-path-service';
import { UnitTest } from './unit-test';
import { getStubFunctionName } from '../lib/unit-test';

export class TestBuilder {
  private readonly imports = new Map<string, Set<string>>();
  private readonly functions: string[] = [];
  private readonly parameters: Parameter[] = [];
  private _isClass: boolean = false;
  private _isLibrary: boolean = false;

  private _name: string = '';

  constructor(private readonly fileContext: FileContext) {}

  addImport(path: string, components: string[]) {
    const existingImports = this.imports.get(path) || new Set<string>();
    components.forEach((specifier) => existingImports.add(specifier));
    if (!this.imports.has(path)) {
      this.imports.set(path, existingImports);
    }
  }

  addImports(imports: GroupedImports) {
    imports.forEach((components, path) => {
      this.addImport(path, components);
    });
  }

  importSelf(fileContext: FileContext) {
    this.addImport(
      FilePathService.getImportString(
        fileContext.path,
        fileContext.file.filePath,
      ),
      fileContext.declarations.map((declaration) => declaration.name),
    );
  }

  addParameters(parameters: Parameter[]) {
    this.addImports(
      getImportsFromParameters(
        parameters,
        this.fileContext.imports,
        this.fileContext.path,
      ),
    );
    parameters.map((param) => this.addParameter(param));
  }

  addFunction(fn: string) {
    this.functions.push(fn);
  }

  addParameter(parameter: Parameter) {
    this.parameters.push(parameter);
    this.addImport('@stub/functions', [getStubFunctionName(parameter)]);
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
