import { Stub } from '../interfaces/stub';
import { Parameter } from '../entities';
import { isImportClassLike } from '../lib';

type StubResolverFunction = (p: Parameter) => Promise<Stub | null>;

export class StubService {
  private static readonly knownStubs = new Map<string, Stub>();
  private static readonly stubFunctions: StubResolverFunction[] = [];
  public static noDefaultStubs = false;
  static addStub(path: string, specifier: string, stub: Stub): StubService {
    this.knownStubs.set(`${path}///${specifier}`, stub);
    return this;
  }

  static addStubFunction(fn: StubResolverFunction): void {
    this.stubFunctions.push(fn);
  }

  static async getStub(parameter: Parameter): Promise<Stub> {
    let knownStub: Stub | null = null;

    if (parameter.import) {
      knownStub =
        this.knownStubs.get(
          `${parameter.import.path}///${parameter.import.specifier}`,
        ) || null;
    }

    if (knownStub) {
      return knownStub;
    }

    const stubFunctions = [
      ...this.stubFunctions,
      this.noDefaultStubs ? null : defaultStubFunction,
    ].filter(Boolean) as StubResolverFunction[];

    for (const fn of stubFunctions) {
      knownStub = await fn(parameter);
      if (knownStub) {
        return knownStub;
      }
    }

    throw new Error(`Don't know how to stub parameter: ${parameter.name}`);
  }
}

async function defaultStubFunction(parameter: Parameter): Promise<Stub | null> {
  if (!parameter.import) {
    console.error(
      'Failed to determine if parameter is class or function because no import data was tied',
      parameter,
    );
    return {
      path: '@stub/functions',
      specifier: 'stubType',
      format: `stubType<${parameter.type}>();`,
    };
  }
  const specifier = (await isImportClassLike(parameter.import))
    ? 'stubType'
    : 'stubFn';
  return {
    path: '@stub/functions',
    specifier,
    format: `${specifier}<${parameter.type}>();`,
  };
}
