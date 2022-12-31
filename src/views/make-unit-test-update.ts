import { UnitTest } from '../entities/unit-test';
import { capitalize } from '../lib/string';
import { File, NamedImport } from 'typescript-parser';
import { makeTestContext } from './make-test-context';
import { makeDependencyMocks } from './make-dependency-mocks';
import { getImports } from '../get-imports';
import { getMissingImports } from '../lib/unit-test';
import { getImportsFromParameters } from '../get-imports-from-parameters';
import { Location, SplicableString } from '../entities/splicable-string';
import { makeFunctionTests } from './make-function-tests';
import { readFileSync } from 'fs';
import { getParser } from '../parser';
import { Actions, TestViewRegistry } from '../services/test-view-registry';
import { TestTypes } from '../actions/get-test-type';

interface UpdateContext {
  testContent: string;
  testFile: File;
  unit: UnitTest;
}

TestViewRegistry.register(Actions.Update, TestTypes.UNIT, makeUnitTestUpdate);

export async function makeUnitTestUpdate(unit: UnitTest): Promise<string> {
  const testContent = readFileSync(unit.path).toString();
  const testFile = await getParser().parseFile(unit.path, '');

  const context: UpdateContext = {
    testContent,
    testFile,
    unit,
  };

  return await [updateMocks, addMissingFunctionTests].reduce(
    async (newContent, action) => {
      return await action({ ...context, testContent: await newContent });
    },
    Promise.resolve(testContent),
  );
}

async function addMissingFunctionTests(
  updateContext: UpdateContext,
): Promise<string> {
  const { unit, testContent } = updateContext;

  if (unit.functions.length === 1) {
    return testContent;
  }

  const missingFunctions = unit.functions.filter((fn) => {
    return testContent.indexOf(`describe('${fn}', ()`) === -1;
  });

  if (missingFunctions.length === 0) {
    return testContent;
  }
  const newCodeGoesHere = testContent.lastIndexOf('});');

  const forSplicing = new SplicableString(testContent);
  forSplicing.add(makeFunctionTests(unit, missingFunctions), newCodeGoesHere);

  return forSplicing.result();
}

async function updateMocks(updateContext: UpdateContext): Promise<string> {
  const { unit, testFile, testContent } = updateContext;
  const missingMocks = unit.parameters.filter(
    (parameter) =>
      !testFile.declarations.find(
        (declaration) =>
          declaration.name === `get${capitalize(parameter.name)}`,
      ),
  );

  if (missingMocks.length === 0) {
    return testContent;
  }

  const buildTestContext = testFile.declarations.find(
    (declaration) => declaration.name === 'buildTestContext',
  );

  if (!buildTestContext || !buildTestContext.start || !buildTestContext.end) {
    throw new Error(
      'Failed to add new mocks, because failed to find buildTestContext',
    );
  }

  const mocks = makeDependencyMocks(missingMocks);

  const context = makeTestContext(unit, mocks);

  const forSplicing = new SplicableString(testContent);
  await updateImports(forSplicing, unit, testFile);
  forSplicing.splice(buildTestContext as Location, context);

  return forSplicing.result();
}

async function updateImports(
  testContent: SplicableString,
  unit: UnitTest,
  testFile: File,
) {
  const testFileImports = getImportsFromParameters(
    unit.parameters,
    getImports(testFile),
    unit.path,
  );
  const missingParameterImports = getMissingImports(
    testFileImports,
    unit.imports,
  );

  const namedImports = testFile.imports.filter(
    (namedImport) => namedImport instanceof NamedImport,
  ) as NamedImport[];

  const addImports = (imports: string[], library: string) => {
    const namedImport = namedImports.find(
      (namedImport) => namedImport.libraryName === library,
    );
    const updatedImport = `import { ${imports.join(', ')} } from '${library}';`;
    if (
      namedImport &&
      namedImport.start !== undefined &&
      namedImport.end !== undefined
    ) {
      testContent.splice(namedImport as Location, updatedImport);
    } else {
      testContent.add(`${updatedImport}\n`);
    }
  };

  missingParameterImports.forEach(addImports);
}
